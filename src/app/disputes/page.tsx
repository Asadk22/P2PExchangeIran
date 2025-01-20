'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { DisputeChat } from '@/components/dispute/DisputeChat';
import { EvidenceUploader } from '@/components/dispute/EvidenceUploader';

interface Dispute {
  _id: string;
  trade: {
    _id: string;
    amount: number;
    assetType: string;
    status: string;
  };
  initiator: {
    _id: string;
    username: string;
  };
  respondent: {
    _id: string;
    username: string;
  };
  reason: string;
  status: string;
  resolution: string;
  evidence: Array<{
    type: string;
    description: string;
    url: string;
    content: string;
    uploadedAt: string;
  }>;
  messages: Array<{
    sender: {
      _id: string;
      username: string;
    };
    content: string;
    timestamp: string;
    isAdminMessage: boolean;
  }>;
  createdAt: string;
}

export default function DisputesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [activeDispute, setActiveDispute] = useState<Dispute | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    fetchDisputes();
  }, [session, router]);

  const fetchDisputes = async () => {
    try {
      const res = await fetch('/api/disputes');
      if (!res.ok) throw new Error('Failed to fetch disputes');
      const data = await res.json();
      setDisputes(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch disputes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptResolution = async () => {
    if (!activeDispute) return;

    try {
      const res = await fetch(`/api/disputes/${activeDispute._id}/accept`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to accept resolution');

      toast({
        title: 'Success',
        description: 'Resolution accepted successfully',
      });
      fetchDisputes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept resolution',
        variant: 'destructive',
      });
    }
  };

  const handleAppeal = async (reason: string) => {
    if (!activeDispute) return;

    try {
      const res = await fetch(`/api/disputes/${activeDispute._id}/appeal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      if (!res.ok) throw new Error('Failed to submit appeal');

      toast({
        title: 'Success',
        description: 'Appeal submitted successfully',
      });
      fetchDisputes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit appeal',
        variant: 'destructive',
      });
    }
  };

  const statusColors: Record<string, string> = {
    open: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    appealed: 'bg-purple-100 text-purple-800',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Disputes List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>My Disputes</CardTitle>
              <CardDescription>
                View and manage your trade disputes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <Card
                    key={dispute._id}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      activeDispute?._id === dispute._id ? 'border-primary' : ''
                    }`}
                    onClick={() => setActiveDispute(dispute)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            Trade #{dispute.trade._id.slice(-6)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {dispute.trade.amount} {dispute.trade.assetType}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={statusColors[dispute.status]}
                        >
                          {dispute.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dispute Details */}
        {activeDispute && (
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Dispute Details</CardTitle>
                <CardDescription>
                  Trade #{activeDispute.trade._id.slice(-6)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="evidence">Evidence</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Reason</h4>
                        <p className="mt-1">{activeDispute.reason}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium">Status</h4>
                        <Badge
                          variant="secondary"
                          className={`mt-1 ${
                            statusColors[activeDispute.status]
                          }`}
                        >
                          {activeDispute.status.replace('_', ' ')}
                        </Badge>
                      </div>

                      {activeDispute.resolution && (
                        <div>
                          <h4 className="text-sm font-medium">Resolution</h4>
                          <p className="mt-1">
                            {activeDispute.resolution.replace('_', ' ')}
                          </p>
                          
                          <div className="mt-4 space-x-4">
                            <Button
                              onClick={handleAcceptResolution}
                              disabled={activeDispute.status === 'closed'}
                            >
                              Accept Resolution
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleAppeal('Disagree with resolution')}
                              disabled={activeDispute.status === 'closed'}
                            >
                              Appeal
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="evidence">
                    <EvidenceUploader
                      disputeId={activeDispute._id}
                      existingEvidence={activeDispute.evidence}
                      onUploadComplete={fetchDisputes}
                    />
                  </TabsContent>

                  <TabsContent value="chat">
                    <DisputeChat
                      disputeId={activeDispute._id}
                      messages={activeDispute.messages}
                      onMessageSent={fetchDisputes}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
