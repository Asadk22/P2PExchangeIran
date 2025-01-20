'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Profile() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Username</label>
              <p className="text-lg">{session.user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-lg">{session.user?.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Member Since</label>
              <p className="text-lg">December 2024</p>
            </div>
          </div>
          <div className="mt-6">
            <Button>Edit Profile</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trading Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Total Trades</label>
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Success Rate</label>
              <p className="text-2xl font-semibold">0%</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Trading Volume</label>
              <p className="text-2xl font-semibold">0 IRR</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Reputation</label>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Two-Factor Authentication</label>
              <p className="text-lg">Not Enabled</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Last Login</label>
              <p className="text-lg">Just Now</p>
            </div>
          </div>
          <div className="mt-6">
            <Button variant="outline">Enable 2FA</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Verification</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <p className="text-lg">Unverified</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Documents</label>
              <p className="text-lg">No documents uploaded</p>
            </div>
          </div>
          <div className="mt-6">
            <Button>Start Verification</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
