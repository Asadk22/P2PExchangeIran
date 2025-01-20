import mongoose from 'mongoose';

const disputeSchema = new mongoose.Schema({
  trade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade',
    required: true,
  },
  initiator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  evidence: [{
    type: {
      type: String,
      enum: ['image', 'document', 'text'],
      required: true,
    },
    description: String,
    url: String,
    content: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  status: {
    type: String,
    enum: ['open', 'under_review', 'resolved', 'closed'],
    default: 'open',
  },
  resolution: {
    type: String,
    enum: ['pending', 'buyer_favor', 'seller_favor', 'split'],
    default: 'pending',
  },
  adminNotes: [{
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    note: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isAdminMessage: {
      type: Boolean,
      default: false,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: Date,
});

disputeSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Dispute || mongoose.model('Dispute', disputeSchema);
