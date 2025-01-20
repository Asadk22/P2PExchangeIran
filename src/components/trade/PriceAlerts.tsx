'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface PriceAlert {
  id: string;
  assetType: string;
  condition: 'above' | 'below';
  price: number;
  active: boolean;
}

export function PriceAlerts() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [newAlert, setNewAlert] = useState({
    assetType: '',
    condition: 'above' as const,
    price: 0,
  });

  const handleAddAlert = async () => {
    try {
      const response = await fetch('/api/alerts/price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlert),
      });

      if (response.ok) {
        const alert = await response.json();
        setAlerts([...alerts, alert]);
        toast({
          title: 'Alert Created',
          description: 'Price alert has been set successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create price alert.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/alerts/price/${alertId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAlerts(alerts.filter(alert => alert.id !== alertId));
        toast({
          title: 'Alert Deleted',
          description: 'Price alert has been removed.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete price alert.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          value={newAlert.assetType}
          onValueChange={(value) => setNewAlert({ ...newAlert, assetType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select asset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BTC">Bitcoin</SelectItem>
            <SelectItem value="ETH">Ethereum</SelectItem>
            <SelectItem value="USDT">USDT</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={newAlert.condition}
          onValueChange={(value: 'above' | 'below') => 
            setNewAlert({ ...newAlert, condition: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="above">Above</SelectItem>
            <SelectItem value="below">Below</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Price"
          value={newAlert.price || ''}
          onChange={(e) => 
            setNewAlert({ ...newAlert, price: parseFloat(e.target.value) || 0 })
          }
        />

        <Button onClick={handleAddAlert}>
          <Plus className="w-4 h-4 mr-2" />
          Add Alert
        </Button>
      </div>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>
                {alert.assetType} {alert.condition} {alert.price}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteAlert(alert.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
