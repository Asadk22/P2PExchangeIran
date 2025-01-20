'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Plus } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  details: string;
  icon: string;
}

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: 'shaparak',
    type: 'bank_transfer',
    name: 'Shaparak',
    details: 'Iranian Interbank Network',
    icon: '/icons/shaparak.svg',
  },
  {
    id: 'shetab',
    type: 'bank_card',
    name: 'Shetab',
    details: 'Iranian Banking Card Network',
    icon: '/icons/shetab.svg',
  },
  {
    id: 'paypal',
    type: 'digital_wallet',
    name: 'PayPal',
    details: 'International Digital Wallet',
    icon: '/icons/paypal.svg',
  },
];

interface PaymentMethodSelectorProps {
  selectedMethods: string[];
  onMethodsChange: (methods: string[]) => void;
  maxMethods?: number;
}

export function PaymentMethodSelector({
  selectedMethods,
  onMethodsChange,
  maxMethods = 3,
}: PaymentMethodSelectorProps) {
  const { toast } = useToast();
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customMethod, setCustomMethod] = useState({
    name: '',
    details: '',
  });

  const handleMethodToggle = (methodId: string) => {
    if (selectedMethods.includes(methodId)) {
      onMethodsChange(selectedMethods.filter((id) => id !== methodId));
    } else {
      if (selectedMethods.length >= maxMethods) {
        toast({
          title: 'Maximum methods reached',
          description: `You can only select up to ${maxMethods} payment methods`,
          variant: 'destructive',
        });
        return;
      }
      onMethodsChange([...selectedMethods, methodId]);
    }
  };

  const handleAddCustomMethod = () => {
    if (!customMethod.name || !customMethod.details) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const newMethod = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      ...customMethod,
      icon: '/icons/custom.svg',
    };

    // Add to local storage for persistence
    const storedMethods = JSON.parse(
      localStorage.getItem('customPaymentMethods') || '[]'
    );
    localStorage.setItem(
      'customPaymentMethods',
      JSON.stringify([...storedMethods, newMethod])
    );

    setCustomMethod({ name: '', details: '' });
    setIsAddingCustom(false);
    toast({
      title: 'Success',
      description: 'Custom payment method added',
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultPaymentMethods.map((method) => (
          <div
            key={method.id}
            className={cn(
              'relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors',
              selectedMethods.includes(method.id) && 'border-primary bg-primary/5'
            )}
            onClick={() => handleMethodToggle(method.id)}
          >
            <div className="flex-shrink-0">
              <Image
                src={method.icon}
                alt={method.name}
                width={40}
                height={40}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{method.name}</div>
              <p className="text-sm text-gray-500">{method.details}</p>
            </div>
            {selectedMethods.includes(method.id) && (
              <div className="absolute top-2 right-2">
                <Check className="h-4 w-4 text-primary" />
              </div>
            )}
          </div>
        ))}

        <Dialog open={isAddingCustom} onOpenChange={setIsAddingCustom}>
          <DialogTrigger asChild>
            <div className="relative flex items-center justify-center space-x-3 rounded-lg border p-4 cursor-pointer hover:border-primary transition-colors">
              <Plus className="h-6 w-6" />
              <span>Add Custom Method</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Payment Method</DialogTitle>
              <DialogDescription>
                Add your own payment method that isn't listed above.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Method Name</Label>
                <Input
                  id="name"
                  value={customMethod.name}
                  onChange={(e) =>
                    setCustomMethod({ ...customMethod, name: e.target.value })
                  }
                  placeholder="e.g., Bank Transfer"
                />
              </div>
              <div>
                <Label htmlFor="details">Details</Label>
                <Input
                  id="details"
                  value={customMethod.details}
                  onChange={(e) =>
                    setCustomMethod({ ...customMethod, details: e.target.value })
                  }
                  placeholder="e.g., Account details or instructions"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingCustom(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCustomMethod}>Add Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="text-sm text-gray-500">
        Selected: {selectedMethods.length} / {maxMethods} methods
      </div>
    </div>
  );
}
