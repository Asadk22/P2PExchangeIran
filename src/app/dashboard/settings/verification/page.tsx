'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, ChevronRight, MapPin, Phone, Shield, User2 } from 'lucide-react';

export default function VerificationPage() {
  return (
    <div className="w-full max-w-[800px] mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Verification</h1>

      {/* Phone Verification */}
      <Card className="mb-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-lime-500" />
            </div>
            <div>
              <h3 className="font-medium">Phone Verification</h3>
              <p className="text-sm text-muted-foreground">We'll need your phone.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </Card>

      {/* Email Verification */}
      <Card className="mb-4 hover:bg-accent/50 transition-colors">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-lime-500" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Email Verification</h3>
              <Badge variant="success" className="text-xs">Verified</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* ID Verification */}
      <Card className="mb-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <User2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">ID Verification</h3>
              <p className="text-sm text-muted-foreground">Will be available after Phone and Email Verification.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </Card>

      {/* Proof of Address */}
      <Card className="mb-8 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium">Proof of Address Verification</h3>
              <p className="text-sm text-muted-foreground">Will be available after ID Verification.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </Card>

      {/* Verification Levels */}
      <div className="space-y-6">
        {/* Level 1 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-lime-500" />
            <h2 className="font-semibold">Level 1</h2>
          </div>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline" className="bg-lime-500/10 text-lime-500">Phone Verification</Badge>
            <Badge variant="outline" className="bg-lime-500/10 text-lime-500">Email Verified</Badge>
            <Badge variant="outline" className="bg-lime-500/10 text-lime-500">ID Verification</Badge>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Generate Wallet Address to receive Crypto externally</li>
            <li>• Buy and Sell up to 10,000 USD</li>
            <li>• Convert one crypto into another</li>
            <li>• Trade and send any crypto</li>
          </ul>
        </div>

        {/* Level 2 */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5" />
            <h2 className="font-semibold">Level 2</h2>
            <Badge variant="outline" className="text-xs">Optional</Badge>
          </div>
          <div className="flex gap-2 mb-3">
            <Badge variant="outline">Address Verification</Badge>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Set up to 50,000 USD per trade</li>
            <li>• Unlimited total trades and send outs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
