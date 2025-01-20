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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

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
  createdAt: string;
}

export default function AdminDisputesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [resolution, setResolution] = useState('');
  const [filter, setFilter] = useState('open');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (!session?.user?.isAdmin) {
      router.push('/dashboard');
      return;
    }

    fetchDisputes();
  }, [session, status, router, filter]);

  const fetchDisputes = async () => {
    try {
      const res = await fetch(`/api/admin/disputes?status=${filter}`);
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

  const handleDisputeClick = async (dispute: Dispute) => {
    try {
      const res = await fetch(`/api/admin/disputes/${dispute._id}`);
      if (!res.ok) throw new Error('Failed to fetch dispute details');
      const data = await res.json();
      setSelectedDispute(data);
      setResolution(data.resolution);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch dispute details',
        variant: 'destructive',
      });
    }
  };

  const handleResolution = async () => {
    if (!selectedDispute || !resolution) return;

    try {
      const res = await fetch(`/api/admin/disputes/${selectedDispute._id}/resolve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resolution,
          adminNote,
        }),
      });

      if (!res.ok) throw new Error('Failed to resolve dispute');

      toast({
        title: 'Success',
        description: 'Dispute resolved successfully',
      });

      fetchDisputes();
      setSelectedDispute(null);
      setAdminNote('');
      setResolution('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resolve dispute',
        variant: 'destructive',
      });
    }
  };

  const statusColors: Record<string, string> = {
    open: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Disputes List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Disputes</CardTitle>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Manage and resolve user disputes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead>Initiator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disputes.map((dispute) => (
                    <TableRow key={dispute._id}>
                      <TableCell className="font-medium">
                        {dispute._id.slice(-6)}
                      </TableCell>
                      <TableCell>
                        {dispute.trade.amount} {dispute.trade.assetType}
                      </TableCell>
                      <TableCell>{dispute.initiator.username}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={statusColors[dispute.status]}
                        >
                          {dispute.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(dispute.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisputeClick(dispute)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Dispute Resolution Panel */}
        {selectedDispute && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resolve Dispute</CardTitle>
                <CardDescription>
                  Review and resolve the selected dispute
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Reason</h4>
                  <p className="text-sm">{selectedDispute.reason}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Resolution</h4>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer_favor">In Buyer's Favor</SelectItem>
                      <SelectItem value="seller_favor">In Seller's Favor</SelectItem>
                      <SelectItem value="split">Split Decision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Admin Note</h4>
                  <Textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add your resolution notes..."
                    className="h-32"
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleResolution}
                  disabled={!resolution || !adminNote}
                >
                  Resolve Dispute
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
