import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TradeOffer } from './TradeOffer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TradeListingPageProps {
  initialTrades?: any[];
}

export function TradeListingPage({ initialTrades = [] }: TradeListingPageProps) {
  const [location, setLocation] = useState('Germany');
  const [traderLocation, setTraderLocation] = useState('Germany');
  const [recentlyActive, setRecentlyActive] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Left Sidebar Filters */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label>Offer Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Spain">Spain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Trader Location</Label>
              <Select value={traderLocation} onValueChange={setTraderLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trader location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Spain">Spain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="recently-active"
                  checked={recentlyActive}
                  onCheckedChange={setRecentlyActive}
                />
                <Label htmlFor="recently-active">Recently active traders</Label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="verified-offers"
                  checked={verifiedOnly}
                  onCheckedChange={setVerifiedOnly}
                />
                <Label htmlFor="verified-offers">Verified offers</Label>
              </div>
            </div>

            <Button className="w-full" variant="default">
              Find Offers
            </Button>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="buy" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Other offers</h2>
                      <Button variant="outline" size="sm">
                        Take Tour
                      </Button>
                    </div>
                    <ScrollArea className="h-[600px]">
                      {initialTrades.map((trade, index) => (
                        <TradeOffer key={index} trade={trade} />
                      ))}
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent value="sell">
                  <div className="text-center py-8">
                    Sell functionality coming soon
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
