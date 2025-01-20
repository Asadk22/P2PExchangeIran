'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { validateIBAN } from "@/lib/validators/bank-validation"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface VerificationStatus {
  status: 'unverified' | 'pending' | 'verified' | 'failed'
  depositId?: string
  depositDate?: Date
  attempts: number
  maxAttempts: number
}

export function BankVerification() {
  const { toast } = useToast()
  const [bankDetails, setBankDetails] = useState({
    iban: '',
    accountHolder: '',
  })
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    status: 'unverified',
    attempts: 0,
    maxAttempts: 3
  })
  const [microDeposits, setMicroDeposits] = useState({
    amount1: '',
    amount2: ''
  })
  const [isInitiatingDeposits, setIsInitiatingDeposits] = useState(false)

  const handleInitiateMicroDeposits = async () => {
    // Validate IBAN
    if (!validateIBAN(bankDetails.iban, 'DE')) {
      toast({
        title: "Invalid IBAN",
        description: "Please enter a valid German IBAN",
        variant: "destructive"
      })
      return
    }

    // Validate account holder name
    if (!bankDetails.accountHolder.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter the account holder name",
        variant: "destructive"
      })
      return
    }

    setIsInitiatingDeposits(true)

    // Simulate initiating micro-deposits
    setTimeout(() => {
      // In production, this would make real micro-deposits
      // For testing, we'll use fixed amounts
      const testAmount1 = (Math.random() * 0.98 + 0.01).toFixed(2) // Random amount between 0.01 and 0.99
      const testAmount2 = (Math.random() * 0.98 + 0.01).toFixed(2)
      
      console.log('Test micro-deposit amounts:', testAmount1, testAmount2) // For testing only
      
      setVerificationStatus({
        status: 'pending',
        depositId: Math.random().toString(36).substring(7),
        depositDate: new Date(),
        attempts: 0,
        maxAttempts: 3
      })
      
      setIsInitiatingDeposits(false)
      
      toast({
        title: "Micro-deposits Initiated",
        description: "Two small deposits will be made to your account within 1-2 business days. Please check your account and verify the amounts once received.",
      })
    }, 2000)
  }

  const handleVerifyDeposits = () => {
    if (!microDeposits.amount1 || !microDeposits.amount2) {
      toast({
        title: "Missing Amounts",
        description: "Please enter both deposit amounts",
        variant: "destructive"
      })
      return
    }

    // In production, verify against actual sent amounts
    // For testing, we'll simulate verification
    const isValid = verificationStatus.attempts < verificationStatus.maxAttempts
    
    if (isValid) {
      setVerificationStatus(prev => ({
        ...prev,
        status: 'verified'
      }))
      
      toast({
        title: "Verification Successful",
        description: "Your bank account has been successfully verified!",
      })
    } else {
      setVerificationStatus(prev => ({
        ...prev,
        status: 'failed',
        attempts: prev.attempts + 1
      }))
      
      toast({
        title: "Verification Failed",
        description: `Incorrect amounts. ${verificationStatus.maxAttempts - verificationStatus.attempts - 1} attempts remaining.`,
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Bank Account Verification</h2>
        
        {verificationStatus.status === 'unverified' && (
          <div className="space-y-4">
            <div>
              <Label>IBAN</Label>
              <Input
                value={bankDetails.iban}
                onChange={(e) => setBankDetails({ ...bankDetails, iban: e.target.value.toUpperCase() })}
                placeholder="DE..."
              />
            </div>
            
            <div>
              <Label>Account Holder Name</Label>
              <Input
                value={bankDetails.accountHolder}
                onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                placeholder="Enter account holder name"
              />
            </div>

            <Button 
              onClick={handleInitiateMicroDeposits}
              disabled={isInitiatingDeposits}
              className="w-full"
            >
              {isInitiatingDeposits ? 'Initiating...' : 'Start Verification'}
            </Button>
          </div>
        )}

        {verificationStatus.status === 'pending' && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                For testing: Check the browser console for the deposit amounts
              </AlertDescription>
            </Alert>

            <div>
              <Label>First Deposit Amount (€)</Label>
              <Input
                type="number"
                step="0.01"
                value={microDeposits.amount1}
                onChange={(e) => setMicroDeposits({ ...microDeposits, amount1: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label>Second Deposit Amount (€)</Label>
              <Input
                type="number"
                step="0.01"
                value={microDeposits.amount2}
                onChange={(e) => setMicroDeposits({ ...microDeposits, amount2: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <Button 
              onClick={handleVerifyDeposits}
              className="w-full"
            >
              Verify Amounts
            </Button>

            <p className="text-sm text-gray-500 text-center">
              Attempts remaining: {verificationStatus.maxAttempts - verificationStatus.attempts}
            </p>
          </div>
        )}

        {verificationStatus.status === 'verified' && (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Account verified successfully!
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p><strong>IBAN:</strong> {bankDetails.iban}</p>
              <p><strong>Account Holder:</strong> {bankDetails.accountHolder}</p>
              <p><strong>Verification Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            <Button 
              onClick={() => {
                setBankDetails({ iban: '', accountHolder: '' })
                setMicroDeposits({ amount1: '', amount2: '' })
                setVerificationStatus({
                  status: 'unverified',
                  attempts: 0,
                  maxAttempts: 3
                })
              }}
              variant="outline"
              className="w-full"
            >
              Verify Another Account
            </Button>
          </div>
        )}

        {verificationStatus.status === 'failed' && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Verification failed. Maximum attempts reached.
              </AlertDescription>
            </Alert>

            <Button 
              onClick={() => {
                setBankDetails({ iban: '', accountHolder: '' })
                setMicroDeposits({ amount1: '', amount2: '' })
                setVerificationStatus({
                  status: 'unverified',
                  attempts: 0,
                  maxAttempts: 3
                })
              }}
              className="w-full"
            >
              Try Again with New Account
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
