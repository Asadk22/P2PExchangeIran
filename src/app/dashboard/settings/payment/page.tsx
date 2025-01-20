'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Edit, Plus, Trash2, AlertCircle } from "lucide-react"
import { CurrencySelect } from "@/components/currency-select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { validateBankAccount, validateCardNumber } from "@/lib/validators/bank-validation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { initiateVerification, verifyMicroDeposits, uploadVerificationDocument, getVerificationStatus } from "@/lib/validators/account-verification"

interface BankAccount {
  id: string
  type: 'personal' | 'business'
  bankName: string
  accountHolder: string
  accountNumber: string
  cardNumber?: string
  branchDetails?: string
  country: string
  currency: string
  verificationStatus?: {
    status: 'unverified' | 'pending' | 'verified' | 'failed'
    method: 'micro-deposit' | 'document' | 'none'
  }
}

interface BankAccountFormData {
  type: 'personal' | 'business'
  bankName: string
  accountHolder: string
  accountNumber: string
  cardNumber?: string
  branchDetails?: string
  country: string
  currency: string
}

export default function PaymentMethodsPage() {
  const { toast } = useToast()
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [formStep, setFormStep] = useState<1 | 2>(1)
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [formData, setFormData] = useState<BankAccountFormData>({
    type: 'personal',
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    cardNumber: '',
    branchDetails: '',
    country: '',
    currency: ''
  })
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      type: 'personal',
      bankName: 'SPARKASSE',
      accountHolder: 'John Doe',
      accountNumber: '123456789',
      branchDetails: 'Berlin Branch',
      country: 'DE',
      currency: 'EUR'
    }
  ])

  const [verificationMethod, setVerificationMethod] = useState<'micro-deposit' | 'document'>('micro-deposit')
  const [microDepositAmounts, setMicroDepositAmounts] = useState({ amount1: '', amount2: '' })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleNext = () => {
    if (formStep === 1) {
      if (!formData.country || !formData.currency) {
        toast({
          title: "Required Fields",
          description: "Please select both country and currency",
          variant: "destructive"
        })
        return
      }
      setFormStep(2)
    }
  }

  const validateForm = () => {
    // Reset errors
    setFormErrors([])

    // Validate required fields
    if (!formData.bankName) {
      setFormErrors(prev => [...prev, "Bank name is required"])
      return false
    }
    if (!formData.accountHolder) {
      setFormErrors(prev => [...prev, "Account holder name is required"])
      return false
    }
    if (!formData.accountNumber) {
      setFormErrors(prev => [...prev, "Account number is required"])
      return false
    }

    // Validate bank account details
    const validation = validateBankAccount(formData)
    if (!validation.isValid) {
      setFormErrors(validation.errors)
      return false
    }

    // If card number is provided, validate it
    if (formData.cardNumber) {
      const cardValidation = validateCardNumber(formData.cardNumber)
      if (!cardValidation.isValid) {
        setFormErrors(prev => [...prev, ...cardValidation.errors])
        return false
      }
    }

    return true
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors before submitting",
        variant: "destructive"
      })
      return
    }

    const newAccount: BankAccount = {
      id: Date.now().toString(),
      ...formData
    }

    setBankAccounts([...bankAccounts, newAccount])
    setShowBankDetails(false)
    setFormStep(1)
    setFormData({
      type: 'personal',
      bankName: '',
      accountHolder: '',
      accountNumber: '',
      cardNumber: '',
      branchDetails: '',
      country: '',
      currency: ''
    })
    setFormErrors([])

    toast({
      title: "Success",
      description: "Bank account added successfully",
    })
  }

  const handleDelete = (id: string) => {
    setBankAccounts(bankAccounts.filter(account => account.id !== id))
    toast({
      title: "Success",
      description: "Bank account deleted successfully",
    })
  }

  const handleVerification = async () => {
    const verification = initiateVerification(
      formData.id || Date.now().toString(),
      formData.accountNumber,
      formData.accountHolder,
      verificationMethod
    )

    if (verificationMethod === 'micro-deposit') {
      toast({
        title: "Verification Initiated",
        description: "Two small deposits will be made to your account within 1-2 business days. Please check your account and enter the amounts to verify ownership.",
      })
    } else {
      toast({
        title: "Document Upload Required",
        description: "Please upload a bank statement or official document showing your name and IBAN.",
      })
    }
  }

  const handleMicroDepositVerification = () => {
    if (!microDepositAmounts.amount1 || !microDepositAmounts.amount2) {
      toast({
        title: "Error",
        description: "Please enter both deposit amounts",
        variant: "destructive"
      })
      return
    }

    const result = verifyMicroDeposits(
      formData.id || Date.now().toString(),
      microDepositAmounts.amount1,
      microDepositAmounts.amount2
    )

    if (result?.verificationStatus.status === 'verified') {
      toast({
        title: "Success",
        description: "Your account has been verified successfully!",
      })
    } else {
      toast({
        title: "Verification Failed",
        description: "The amounts entered do not match our records. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // In production, implement secure file upload to your backend
      const documentUrl = URL.createObjectURL(file) // This is just for demo
      const result = uploadVerificationDocument(
        formData.id || Date.now().toString(),
        documentUrl
      )

      if (result) {
        toast({
          title: "Document Uploaded",
          description: "Your document has been uploaded and is pending review.",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Payment Methods</h2>
          <p className="text-sm text-muted-foreground">Manage your payment methods for trading</p>
        </div>
      </div>

      {/* Bank Accounts Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Bank Accounts</h3>
            <p className="text-sm text-muted-foreground">
              Add your bank account details below. You can share these details with your trade partner via trade chat, for bank transfer trades.
            </p>
          </div>

          {!showBankDetails ? (
            <div className="space-y-6">
              {bankAccounts.length > 0 ? (
                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-purple-600 text-white text-sm rounded">
                              {account.bankName}
                            </span>
                            <span className="px-2 py-1 bg-emerald-500 text-white text-sm rounded">
                              {account.currency}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <div className="uppercase">{account.type}</div>
                            <div>{account.accountHolder}</div>
                            <div className="font-mono">{account.accountNumber}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              setFormData(account)
                              setShowBankDetails(true)
                              setFormStep(2)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(account.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
              
              <Button
                onClick={() => setShowBankDetails(true)}
                className="bg-[#C5F82A] hover:bg-[#C5F82A]/90 text-black flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add account
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Add your bank account</h4>
                
                {formStep === 1 ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label>Account type</Label>
                      <RadioGroup 
                        defaultValue={formData.type}
                        className="flex gap-4"
                        onValueChange={(value: 'personal' | 'business') => 
                          setFormData({...formData, type: value})
                        }
                      >
                        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                          <RadioGroupItem value="personal" id="personal" />
                          <Label htmlFor="personal" className="font-normal cursor-pointer">Personal</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-accent">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business" className="font-normal cursor-pointer">Business</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Bank account country</Label>
                      <CurrencySelect 
                        type="country" 
                        value={formData.country}
                        onSelect={(value) => setFormData({...formData, country: value})}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Currency</Label>
                      <CurrencySelect 
                        type="currency" 
                        value={formData.currency}
                        onSelect={(value) => setFormData({...formData, currency: value})}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setShowBankDetails(false)
                          setFormStep(1)
                          setFormData({
                            type: 'personal',
                            bankName: '',
                            accountHolder: '',
                            accountNumber: '',
                            cardNumber: '',
                            branchDetails: '',
                            country: '',
                            currency: ''
                          })
                          setFormErrors([])
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-[#00C853] hover:bg-[#00C853]/90"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {formErrors.length > 0 && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <ul className="list-disc pl-4">
                            {formErrors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <Label>Bank Name</Label>
                      <CurrencySelect 
                        type="bank"
                        countryCode={formData.country}
                        value={formData.bankName}
                        onSelect={(value) => setFormData({...formData, bankName: value})}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Account Holder Name</Label>
                      <Input 
                        placeholder={formData.country === 'IR' ? "نام صاحب حساب" : "Enter account holder name"}
                        value={formData.accountHolder}
                        onChange={(e) => {
                          setFormData({...formData, accountHolder: e.target.value})
                          setFormErrors([])
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Account Number / IBAN</Label>
                      <Input 
                        placeholder="Enter account number or IBAN"
                        value={formData.accountNumber}
                        onChange={(e) => {
                          setFormData({...formData, accountNumber: e.target.value.toUpperCase()})
                          setFormErrors([])
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Card Number (Optional)</Label>
                      <Input 
                        placeholder="Enter card number"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          setFormData({...formData, cardNumber: e.target.value})
                          setFormErrors([])
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <Label>Branch Details (Optional)</Label>
                      <Input 
                        placeholder="Enter branch details"
                        value={formData.branchDetails}
                        onChange={(e) => setFormData({...formData, branchDetails: e.target.value})}
                      />
                    </div>

                    <div className="space-y-4 mt-6">
                      <Label>Account Verification</Label>
                      <RadioGroup 
                        value={verificationMethod} 
                        onValueChange={(value) => setVerificationMethod(value as 'micro-deposit' | 'document')}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="micro-deposit" id="micro-deposit" />
                          <Label htmlFor="micro-deposit">Verify with Micro-deposits</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="document" id="document" />
                          <Label htmlFor="document">Upload Bank Statement</Label>
                        </div>
                      </RadioGroup>

                      {verificationMethod === 'micro-deposit' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>First Deposit Amount</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={microDepositAmounts.amount1}
                                onChange={(e) => setMicroDepositAmounts(prev => ({...prev, amount1: e.target.value}))}
                              />
                            </div>
                            <div>
                              <Label>Second Deposit Amount</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={microDepositAmounts.amount2}
                                onChange={(e) => setMicroDepositAmounts(prev => ({...prev, amount2: e.target.value}))}
                              />
                            </div>
                          </div>
                          <Button onClick={handleMicroDepositVerification}>
                            Verify Deposits
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                          />
                          <p className="text-sm text-gray-500">
                            Please upload a recent bank statement or official document that shows your name and IBAN.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setFormStep(1)
                          setFormErrors([])
                        }}
                      >
                        Back
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setShowBankDetails(false)
                          setFormStep(1)
                          setFormData({
                            type: 'personal',
                            bankName: '',
                            accountHolder: '',
                            accountNumber: '',
                            cardNumber: '',
                            branchDetails: '',
                            country: '',
                            currency: ''
                          })
                          setFormErrors([])
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-[#00C853] hover:bg-[#00C853]/90"
                        onClick={handleSubmit}
                      >
                        Save Account
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Online Wallets Section */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Online Wallets</h3>
            <p className="text-sm text-muted-foreground">
              Add your online wallets below.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" rx="40" fill="#F4F4F5"/>
                <path d="M40 20C28.954 20 20 28.954 20 40C20 51.046 28.954 60 40 60C51.046 60 60 51.046 60 40C60 28.954 51.046 20 40 20ZM40 24C48.837 24 56 31.163 56 40C56 48.837 48.837 56 40 56C31.163 56 24 48.837 24 40C24 31.163 31.163 24 40 24Z" fill="#A1A1AA"/>
              </svg>
            </div>
            <div className="text-muted-foreground">No Online Wallets</div>
            <Button
              className="mt-4 bg-[#C5F82A] hover:bg-[#C5F82A]/90 text-black flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
