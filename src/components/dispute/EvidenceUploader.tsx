'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface Evidence {
  type: string;
  description: string;
  url: string;
  content: string;
  uploadedAt: string;
}

interface EvidenceUploaderProps {
  disputeId: string;
  existingEvidence: Evidence[];
  onUploadComplete: () => void;
}

export function EvidenceUploader({
  disputeId,
  existingEvidence,
  onUploadComplete,
}: EvidenceUploaderProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [evidenceType, setEvidenceType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!evidenceType) {
      toast({
        title: 'Error',
        description: 'Please select evidence type',
        variant: 'destructive',
      });
      return;
    }

    if (!description) {
      toast({
        title: 'Error',
        description: 'Please provide a description',
        variant: 'destructive',
      });
      return;
    }

    if (evidenceType !== 'text' && !file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    if (evidenceType === 'text' && !textContent) {
      toast({
        title: 'Error',
        description: 'Please provide text content',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('type', evidenceType);
      formData.append('description', description);
      
      if (file) {
        formData.append('file', file);
      }
      
      if (textContent) {
        formData.append('content', textContent);
      }

      const res = await fetch(`/api/disputes/${disputeId}/evidence`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload evidence');

      toast({
        title: 'Success',
        description: 'Evidence uploaded successfully',
      });

      // Reset form
      setEvidenceType('');
      setDescription('');
      setFile(null);
      setTextContent('');
      onUploadComplete();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload evidence',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (evidenceId: string) => {
    try {
      const res = await fetch(
        `/api/disputes/${disputeId}/evidence/${evidenceId}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) throw new Error('Failed to remove evidence');

      toast({
        title: 'Success',
        description: 'Evidence removed successfully',
      });

      onUploadComplete();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove evidence',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Evidence */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Uploaded Evidence</h3>
        {existingEvidence.map((evidence, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">{evidence.type}</p>
              <p className="text-sm text-gray-500">{evidence.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(evidence.uploadedAt).toLocaleString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(evidence._id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Upload New Evidence */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Add New Evidence</h3>
        
        <Select value={evidenceType} onValueChange={setEvidenceType}>
          <SelectTrigger>
            <SelectValue placeholder="Select evidence type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="document">Document</SelectItem>
            <SelectItem value="text">Text</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {evidenceType === 'text' ? (
          <Textarea
            placeholder="Enter your text evidence here..."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="h-32"
          />
        ) : (
          <Input
            type="file"
            onChange={handleFileChange}
            accept={
              evidenceType === 'image'
                ? 'image/*'
                : '.pdf,.doc,.docx,.txt'
            }
          />
        )}

        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full"
        >
          {uploading ? (
            'Uploading...'
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Evidence
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
