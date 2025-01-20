import { Types } from 'mongoose';
import Trade from '../models/Trade';
import Dispute from '../models/Dispute';
import User from '../models/User';

interface DisputeCase {
  _id: Types.ObjectId;
  trade: any;
  initiator: any;
  respondent: any;
  reason: string;
  evidence: any[];
  messages: any[];
}

export class AutoDisputeResolver {
  private static readonly PAYMENT_WINDOW_HOURS = 2;
  private static readonly MIN_REPUTATION_THRESHOLD = 50;
  private static readonly MIN_SUCCESSFUL_TRADES = 5;

  static async analyzeAndResolve(dispute: DisputeCase): Promise<{
    canAutoResolve: boolean;
    resolution?: string;
    confidence: number;
    reason: string;
  }> {
    const analyses = await Promise.all([
      this.analyzePaymentWindow(dispute),
      this.analyzeUserReputation(dispute),
      this.analyzeTradeHistory(dispute),
      this.analyzeEvidence(dispute),
      this.analyzeChatHistory(dispute),
    ]);

    const validAnalyses = analyses.filter(a => a.confidence > 0);
    if (validAnalyses.length === 0) {
      return {
        canAutoResolve: false,
        confidence: 0,
        reason: 'Insufficient data for automated resolution',
      };
    }

    const totalConfidence = validAnalyses.reduce((sum, a) => sum + a.confidence, 0);
    const weightedResolution = validAnalyses.reduce((acc, a) => {
      const weight = a.confidence / totalConfidence;
      return acc + (a.suggestedResolution === 'buyer_favor' ? weight : -weight);
    }, 0);

    // Require high confidence for auto-resolution
    const confidence = Math.abs(weightedResolution);
    if (confidence < 0.8) {
      return {
        canAutoResolve: false,
        confidence,
        reason: 'Confidence too low for automated resolution',
      };
    }

    return {
      canAutoResolve: true,
      resolution: weightedResolution > 0 ? 'buyer_favor' : 'seller_favor',
      confidence,
      reason: this.generateResolutionReason(validAnalyses),
    };
  }

  private static async analyzePaymentWindow(dispute: DisputeCase) {
    const trade = await Trade.findById(dispute.trade._id);
    if (!trade) {
      return { confidence: 0, suggestedResolution: null };
    }

    const paymentWindow = new Date(trade.createdAt);
    paymentWindow.setHours(paymentWindow.getHours() + this.PAYMENT_WINDOW_HOURS);

    if (trade.status === 'payment_pending' && new Date() > paymentWindow) {
      return {
        confidence: 0.9,
        suggestedResolution: 'seller_favor',
        reason: 'Payment window expired',
      };
    }

    return { confidence: 0, suggestedResolution: null };
  }

  private static async analyzeUserReputation(dispute: DisputeCase) {
    const [buyer, seller] = await Promise.all([
      User.findById(dispute.trade.buyer),
      User.findById(dispute.trade.seller),
    ]);

    if (!buyer || !seller) {
      return { confidence: 0, suggestedResolution: null };
    }

    const buyerScore = buyer.reputation;
    const sellerScore = seller.reputation;

    if (Math.abs(buyerScore - sellerScore) > 30) {
      const higherRepUser = buyerScore > sellerScore ? 'buyer' : 'seller';
      return {
        confidence: 0.7,
        suggestedResolution: `${higherRepUser}_favor`,
        reason: `${higherRepUser} has significantly higher reputation`,
      };
    }

    return { confidence: 0, suggestedResolution: null };
  }

  private static async analyzeTradeHistory(dispute: DisputeCase) {
    const [buyer, seller] = await Promise.all([
      User.findById(dispute.trade.buyer),
      User.findById(dispute.trade.seller),
    ]);

    if (!buyer || !seller) {
      return { confidence: 0, suggestedResolution: null };
    }

    const buyerSuccessRate = buyer.successfulTrades / buyer.totalTrades;
    const sellerSuccessRate = seller.successfulTrades / seller.totalTrades;

    if (buyer.totalTrades >= this.MIN_SUCCESSFUL_TRADES && 
        seller.totalTrades >= this.MIN_SUCCESSFUL_TRADES) {
      if (Math.abs(buyerSuccessRate - sellerSuccessRate) > 0.3) {
        const moreSuccessfulUser = buyerSuccessRate > sellerSuccessRate ? 'buyer' : 'seller';
        return {
          confidence: 0.6,
          suggestedResolution: `${moreSuccessfulUser}_favor`,
          reason: `${moreSuccessfulUser} has better trade history`,
        };
      }
    }

    return { confidence: 0, suggestedResolution: null };
  }

  private static async analyzeEvidence(dispute: DisputeCase) {
    const evidenceCount = {
      buyer: 0,
      seller: 0,
    };

    dispute.evidence.forEach(evidence => {
      const party = evidence.uploadedBy === dispute.trade.buyer ? 'buyer' : 'seller';
      evidenceCount[party]++;
    });

    if (Math.abs(evidenceCount.buyer - evidenceCount.seller) > 2) {
      const moreEvidence = evidenceCount.buyer > evidenceCount.seller ? 'buyer' : 'seller';
      return {
        confidence: 0.5,
        suggestedResolution: `${moreEvidence}_favor`,
        reason: `${moreEvidence} provided more evidence`,
      };
    }

    return { confidence: 0, suggestedResolution: null };
  }

  private static async analyzeChatHistory(dispute: DisputeCase) {
    const messages = dispute.messages;
    const responseTimes = {
      buyer: [] as number[],
      seller: [] as number[],
    };

    let prevMessage = null;
    messages.forEach(message => {
      if (prevMessage) {
        const timeDiff = new Date(message.timestamp).getTime() - 
                        new Date(prevMessage.timestamp).getTime();
        const party = message.sender._id === dispute.trade.buyer ? 'buyer' : 'seller';
        responseTimes[party].push(timeDiff);
      }
      prevMessage = message;
    });

    const avgResponseTime = {
      buyer: responseTimes.buyer.length ? 
        responseTimes.buyer.reduce((a, b) => a + b, 0) / responseTimes.buyer.length : 0,
      seller: responseTimes.seller.length ?
        responseTimes.seller.reduce((a, b) => a + b, 0) / responseTimes.seller.length : 0,
    };

    if (Math.abs(avgResponseTime.buyer - avgResponseTime.seller) > 3600000) { // 1 hour
      const moreResponsive = avgResponseTime.buyer < avgResponseTime.seller ? 'buyer' : 'seller';
      return {
        confidence: 0.4,
        suggestedResolution: `${moreResponsive}_favor`,
        reason: `${moreResponsive} was more responsive in communication`,
      };
    }

    return { confidence: 0, suggestedResolution: null };
  }

  private static generateResolutionReason(analyses: any[]): string {
    const validReasons = analyses
      .filter(a => a.reason)
      .map(a => a.reason);

    return validReasons.join('. ');
  }
}
