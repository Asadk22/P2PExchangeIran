'use client'

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Calculator,
  Clock,
  CreditCard,
  DollarSign,
  Shield,
  Timer,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  type: z.enum(["buy", "sell"], {
    required_error: "Please select an offer type.",
  }),
  cryptocurrency: z.string({
    required_error: "Please select a cryptocurrency.",
  }),
  paymentMethod: z.string({
    required_error: "Please select a payment method.",
  }),
  price: z.string().min(1, "Please enter a price."),
  amount: z.string().min(1, "Please enter an amount."),
  minLimit: z.string().min(1, "Please enter a minimum limit."),
  maxLimit: z.string().min(1, "Please enter a maximum limit."),
  terms: z.string().min(10, "Terms must be at least 10 characters."),
  autoReply: z.boolean().default(false),
  timeLimit: z.string().default("15"),
  margin: z.string().default("0"),
  requireVerification: z.boolean().default(true),
  autoReplyMessage: z.string().optional(),
  paymentDetails: z.string().optional(),
  availableFrom: z.string().default("09:00"),
  availableTo: z.string().default("17:00"),
  timezone: z.string().default("UTC"),
  tradeInstructions: z.string().optional(),
})

const cryptoOptions = [
  { value: "btc", label: "Bitcoin (BTC)", icon: "₿" },
  { value: "eth", label: "Ethereum (ETH)", icon: "Ξ" },
  { value: "usdt", label: "Tether (USDT)", icon: "₮" },
  { value: "usdc", label: "USD Coin (USDC)", icon: "$" },
]

const paymentMethods = [
  { value: "bank", label: "Bank Transfer", icon: CreditCard },
  { value: "card", label: "Credit/Debit Card", icon: CreditCard },
  { value: "paypal", label: "PayPal", icon: DollarSign },
]

export default function CreateOfferPage() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [marketPrice, setMarketPrice] = useState<number | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "buy",
      terms: "",
      autoReply: false,
      timeLimit: "15",
      margin: "0",
      requireVerification: true,
      availableFrom: "09:00",
      availableTo: "17:00",
      timezone: "UTC",
    },
  })

  const watchPrice = form.watch("price")
  const watchAmount = form.watch("amount")
  const watchMargin = form.watch("margin")
  const watchType = form.watch("type")
  const watchCrypto = form.watch("cryptocurrency")

  // Simulated market price fetch
  useEffect(() => {
    if (watchCrypto) {
      setIsCalculating(true)
      // Simulate API call
      setTimeout(() => {
        const mockPrices: Record<string, number> = {
          btc: 42000,
          eth: 2200,
          usdt: 1,
          usdc: 1,
        }
        setMarketPrice(mockPrices[watchCrypto] || null)
        setIsCalculating(false)
      }, 500)
    }
  }, [watchCrypto])

  const calculateTotal = () => {
    setIsCalculating(true)
    setTimeout(() => {
      const total = parseFloat(watchPrice) * parseFloat(watchAmount)
      toast({
        title: "Estimated Total",
        description: `${total.toLocaleString()} USD`,
      })
      setIsCalculating(false)
    }, 500)
  }

  const calculatePriceWithMargin = () => {
    if (marketPrice && watchMargin) {
      const marginPercent = parseFloat(watchMargin) / 100
      const adjustedPrice = watchType === "sell" 
        ? marketPrice * (1 + marginPercent)
        : marketPrice * (1 - marginPercent)
      form.setValue("price", adjustedPrice.toFixed(2))
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Offer Created",
      description: "Your offer has been created successfully!",
    })
    console.log(values)
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create a New Offer</h1>
        <p className="text-muted-foreground">Set up your trading preferences and terms.</p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="basic">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offer Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select offer type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buy">Buy Cryptocurrency</SelectItem>
                            <SelectItem value="sell">Sell Cryptocurrency</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="cryptocurrency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cryptocurrency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select cryptocurrency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {cryptoOptions.map((crypto) => (
                                <SelectItem key={crypto.value} value={crypto.value}>
                                  <div className="flex items-center">
                                    <span className="mr-2">{crypto.icon}</span>
                                    {crypto.label}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {marketPrice && (
                            <FormDescription>
                              Current market price: ${marketPrice.toLocaleString()}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="margin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Margin (%)</FormLabel>
                            <FormControl>
                              <div className="flex space-x-2">
                                <Input {...field} type="number" step="0.01" />
                                <Button 
                                  type="button" 
                                  variant="outline"
                                  onClick={calculatePriceWithMargin}
                                  disabled={!marketPrice}
                                >
                                  <Calculator className="h-4 w-4" />
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              {watchType === "sell" ? "Above" : "Below"} market price
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (USD)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Limit (USD)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Limit (USD)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" step="0.01" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced">
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availableFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available From</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availableTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available To</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="GMT">GMT</SelectItem>
                            <SelectItem value="EST">EST</SelectItem>
                            <SelectItem value="PST">PST</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {paymentMethods.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                <div className="flex items-center">
                                  <method.icon className="mr-2 h-4 w-4" />
                                  {method.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter payment details and instructions..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide specific payment details and requirements
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trade Terms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your trade terms and conditions..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="autoReply"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Auto Reply</FormLabel>
                            <FormDescription>
                              Automatically respond to trade requests
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requireVerification"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Require Verification</FormLabel>
                            <FormDescription>
                              Only accept trades from verified users
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Offer Preview</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{form.getValues("availableFrom")} - {form.getValues("availableTo")} {form.getValues("timezone")}</span>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Type</p>
                          <p className="text-sm text-muted-foreground">
                            {form.getValues("type") === "buy" ? "Buying" : "Selling"} {
                              cryptoOptions.find(c => c.value === form.getValues("cryptocurrency"))?.label
                            }
                          </p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-sm font-medium">Price</p>
                          <p className="text-sm text-muted-foreground">
                            ${parseFloat(form.getValues("price") || "0").toLocaleString()} USD
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Limits</p>
                          <p className="text-sm text-muted-foreground">
                            ${parseFloat(form.getValues("minLimit") || "0").toLocaleString()} - 
                            ${parseFloat(form.getValues("maxLimit") || "0").toLocaleString()} USD
                          </p>
                        </div>
                        <div className="space-y-1 text-right">
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">
                            {paymentMethods.find(m => m.value === form.getValues("paymentMethod"))?.label}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Terms</p>
                        <p className="text-sm text-muted-foreground">
                          {form.getValues("terms")}
                        </p>
                      </div>

                      {form.getValues("paymentDetails") && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Payment Details</p>
                          <p className="text-sm text-muted-foreground">
                            {form.getValues("paymentDetails")}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm">
                        {form.getValues("requireVerification") && (
                          <div className="flex items-center text-muted-foreground">
                            <Shield className="mr-1 h-4 w-4" />
                            Verified Users Only
                          </div>
                        )}
                        <div className="flex items-center text-muted-foreground">
                          <Timer className="mr-1 h-4 w-4" />
                          {form.getValues("timeLimit")} minutes to complete
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={calculateTotal}
                  disabled={!watchPrice || !watchAmount || isCalculating}
                >
                  {isCalculating ? (
                    "Calculating..."
                  ) : (
                    "Calculate Total"
                  )}
                </Button>
                <Button type="submit">Create Offer</Button>
              </div>
            </form>
          </Form>
        </Card>
      </Tabs>
    </div>
  )
}
