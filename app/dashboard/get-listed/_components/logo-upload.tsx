"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LogoUploadProps {
  onUploadComplete: (url: string | null) => void;
  maxSizeInMB?: number;
}

export function LogoUpload({ onUploadComplete, maxSizeInMB = 2 }: LogoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      toast({
        title: "File too large",
        description: `File size should be less than ${maxSizeInMB}MB`,
        variant: "destructive",
      });
      e.target.value = ''; // Reset input
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      e.target.value = ''; // Reset input
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'agency_logos');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbmljn4kh/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        setPreview(data.secure_url);
        onUploadComplete(data.secure_url);
        toast({
          title: "Success",
          description: "Logo uploaded successfully",
        });
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload logo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset input to allow uploading the same file again if needed
      e.target.value = '';
    }
  };

  const handleDelete = () => {
    setPreview(null);
    onUploadComplete(null);
    // Reset the file input
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    toast({
      title: "Logo removed",
      description: "You can now upload a new logo",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={uploading || !!preview}
          onClick={() => document.getElementById('logo-upload')?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Upload Logo'
          )}
        </Button>
        <Input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading || !!preview}
        />
        {preview && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="ml-2"
          >
            <X className="h-4 w-4 mr-1" />
            Remove Logo
          </Button>
        )}
      </div>

      {preview && (
        <div className="relative w-32 h-32 border rounded-lg overflow-hidden group">
          <Image
            src={preview}
            alt="Agency logo preview"
            fill
            className="object-contain p-2"
          />
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Accepted formats: JPG, PNG, GIF. Max size: {maxSizeInMB}MB
      </p>
    </div>
  );
} 