'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface RaiseDisputeButtonProps {
  tradeId: string;
  disabled?: boolean;
}

export function RaiseDisputeButton({
  tradeId,
  disabled,
}: RaiseDisputeButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a reason for the dispute',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/disputes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tradeId,
          reason,
        }),
      });

      if (!res.ok) throw new Error('Failed to raise dispute');

      toast({
        title: 'Success',
        description: 'Dispute raised successfully',
      });

      setOpen(false);
      router.push('/disputes');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to raise dispute',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          disabled={disabled}
          className="w-full sm:w-auto"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Raise Dispute
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raise a Dispute</DialogTitle>
          <DialogDescription>
            Please provide detailed information about why you are raising this
            dispute. This will help us resolve the issue faster.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain your reason for raising this dispute..."
            className="h-32"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
