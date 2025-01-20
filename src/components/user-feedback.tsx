'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  reviewer: {
    username: string;
  };
}

export default function UserFeedback({ userId }: { userId: string }) {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/feedback`);
        if (res.ok) {
          const data = await res.json();
          setFeedback(data);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">Loading feedback...</div>;
  }

  if (!feedback.length) {
    return <div className="text-center py-4 text-muted-foreground">No feedback available</div>;
  }

  return (
    <div className="space-y-4">
      {feedback.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={`https://avatar.vercel.sh/${item.reviewer.username}`} />
                <AvatarFallback>{item.reviewer.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.reviewer.username}</p>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          {i < item.rating ? (
                            <StarFilledIcon className="h-4 w-4 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-4 w-4 text-gray-300" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm">{item.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
