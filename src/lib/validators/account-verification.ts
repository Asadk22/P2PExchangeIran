export interface VerificationStatus {
  status: 'unverified' | 'pending' | 'verified' | 'failed'
  method: 'micro-deposit' | 'document' | 'none'
  lastUpdated?: Date
  verificationId?: string
}

export interface BankAccountVerification {
  accountId: string
  iban: string
  accountHolder: string
  verificationStatus: VerificationStatus
  documentProof?: string // URL to uploaded document
  microDepositDetails?: {
    depositId: string
    amount1?: string
    amount2?: string
    attempts: number
    maxAttempts: number
  }
}

// Store verifications in memory (should be moved to a database in production)
const verifications = new Map<string, BankAccountVerification>()

export function initiateVerification(
  accountId: string,
  iban: string,
  accountHolder: string,
  method: 'micro-deposit' | 'document'
): BankAccountVerification {
  const verification: BankAccountVerification = {
    accountId,
    iban,
    accountHolder,
    verificationStatus: {
      status: 'pending',
      method,
      lastUpdated: new Date(),
      verificationId: Math.random().toString(36).substring(7)
    }
  }

  if (method === 'micro-deposit') {
    verification.microDepositDetails = {
      depositId: Math.random().toString(36).substring(7),
      attempts: 0,
      maxAttempts: 3
    }
    // Here you would integrate with your banking provider to initiate micro-deposits
  }

  verifications.set(accountId, verification)
  return verification
}

export function uploadVerificationDocument(
  accountId: string,
  documentUrl: string
): BankAccountVerification | null {
  const verification = verifications.get(accountId)
  if (!verification) return null

  verification.documentProof = documentUrl
  verification.verificationStatus = {
    ...verification.verificationStatus,
    status: 'pending',
    lastUpdated: new Date()
  }

  verifications.set(accountId, verification)
  return verification
}

export function verifyMicroDeposits(
  accountId: string,
  amount1: string,
  amount2: string
): BankAccountVerification | null {
  const verification = verifications.get(accountId)
  if (!verification || !verification.microDepositDetails) return null

  // In production, you would verify these amounts against the actual micro-deposits
  // For demo, we'll just check if they provided two different amounts
  if (amount1 !== amount2 && verification.microDepositDetails.attempts < verification.microDepositDetails.maxAttempts) {
    verification.microDepositDetails.amount1 = amount1
    verification.microDepositDetails.amount2 = amount2
    verification.microDepositDetails.attempts++

    // In production, verify these amounts with your banking provider
    const isValid = true // This should be the result of actual verification

    verification.verificationStatus = {
      ...verification.verificationStatus,
      status: isValid ? 'verified' : 'failed',
      lastUpdated: new Date()
    }

    verifications.set(accountId, verification)
    return verification
  }

  verification.verificationStatus.status = 'failed'
  verifications.set(accountId, verification)
  return verification
}

export function getVerificationStatus(accountId: string): VerificationStatus {
  const verification = verifications.get(accountId)
  if (!verification) {
    return {
      status: 'unverified',
      method: 'none'
    }
  }
  return verification.verificationStatus
}
