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

interface TestTradeProps {
  defaultIBAN?: string
  defaultName?: string
}

export function TestTrade({ defaultIBAN, defaultName }: TestTradeProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [tradeDetails, setTradeDetails] = useState({
    iban: defaultIBAN || '',
    accountHolder: defaultName || '',
    amount: '',
    currency: 'EUR',
    targetCurrency: 'IRR',
    rate: '45000', // Mock exchange rate EUR to IRR
  })
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isTradeComplete, setIsTradeComplete] = useState(false)

  const handleVerifyIBAN = async () => {
    if (!validateIBAN(tradeDetails.iban, 'DE')) {
      toast({
        title: "Invalid IBAN",
        description: "Please enter a valid German IBAN",
        variant: "destructive"
      })
      return
    }

    setIsVerifying(true)
    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false)
      setStep(2)
      toast({
        title: "IBAN Verified",
        description: "Your IBAN has been verified successfully.",
      })
    }, 1500)
  }

  const handleInitiateTrade = () => {
    if (!tradeDetails.amount || parseFloat(tradeDetails.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      })
      return
    }

    // Generate mock verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    console.log('Verification code:', code) // In production, this would be sent via SMS/email
    setVerificationCode(code)
    setStep(3)
  }

  const handleConfirmTrade = () => {
    setIsTradeComplete(true)
    setStep(4)
    toast({
      title: "Trade Successful",
      description: "Your test trade has been completed successfully!",
    })
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Test Trade</h2>
        
        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-1/4 h-2 rounded ${
                s <= step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>IBAN</Label>
              <Input
                value={tradeDetails.iban}
                onChange={(e) => setTradeDetails({ ...tradeDetails, iban: e.target.value })}
                placeholder="DE..."
              />
            </div>
            <div>
              <Label>Account Holder Name</Label>
              <Input
                value={tradeDetails.accountHolder}
                onChange={(e) => setTradeDetails({ ...tradeDetails, accountHolder: e.target.value })}
                placeholder="Enter account holder name"
              />
            </div>
            <Button 
              onClick={handleVerifyIBAN}
              disabled={isVerifying}
              className="w-full"
            >
              {isVerifying ? 'Verifying...' : 'Verify IBAN'}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                IBAN Verified: {tradeDetails.iban}
              </AlertDescription>
            </Alert>
            
            <div>
              <Label>Amount to Send ({tradeDetails.currency})</Label>
              <Input
                type="number"
                value={tradeDetails.amount}
                onChange={(e) => setTradeDetails({ ...tradeDetails, amount: e.target.value })}
                placeholder="Enter amount"
              />
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Exchange Rate:</p>
              <p className="text-lg font-semibold">
                1 {tradeDetails.currency} = {tradeDetails.rate} {tradeDetails.targetCurrency}
              </p>
              {tradeDetails.amount && (
                <p className="mt-2 text-sm text-gray-600">
                  You will receive: {(parseFloat(tradeDetails.amount) * parseFloat(tradeDetails.rate)).toLocaleString()} {tradeDetails.targetCurrency}
                </p>
              )}
            </div>

            <Button 
              onClick={handleInitiateTrade}
              className="w-full"
            >
              Initiate Trade
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                For this test, the verification code is shown in the browser console
              </AlertDescription>
            </Alert>

            <div>
              <Label>Enter Verification Code</Label>
              <Input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
              />
            </div>

            <Button 
              onClick={handleConfirmTrade}
              className="w-full"
            >
              Confirm Trade
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>
                Test trade completed successfully!
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <h3 className="font-semibold">Trade Details:</h3>
              <p>IBAN: {tradeDetails.iban}</p>
              <p>Amount Sent: {tradeDetails.amount} {tradeDetails.currency}</p>
              <p>Amount to Receive: {(parseFloat(tradeDetails.amount) * parseFloat(tradeDetails.rate)).toLocaleString()} {tradeDetails.targetCurrency}</p>
              <p>Exchange Rate: 1 {tradeDetails.currency} = {tradeDetails.rate} {tradeDetails.targetCurrency}</p>
            </div>

            <Button 
              onClick={() => {
                setStep(1)
                setTradeDetails({
                  ...tradeDetails,
                  amount: '',
                })
                setVerificationCode('')
                setIsTradeComplete(false)
              }}
              className="w-full"
            >
              Start New Test Trade
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
