"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";

interface GoogleReviewsProps {
  onFetchComplete: (data: { 
    rating: number; 
    reviewCount: number;
    name?: string;
    address?: string;
    website?: string;
    phone?: string;
  }) => void;
}

export function GoogleReviewsFetch({ onFetchComplete }: GoogleReviewsProps) {
  const [loading, setLoading] = useState(false);
  const [googleUrl, setGoogleUrl] = useState("");
  const [fetchedData, setFetchedData] = useState<{
    rating: number;
    reviewCount: number;
  } | null>(null);
  const { toast } = useToast();

  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  const extractPlaceId = (url: string) => {
    try {
      // Handle direct place ID format
      if (url.startsWith('ChI') || url.length > 25) {
        return url.trim();
      }

      const urlObj = new URL(url);
      
      // Extract from Google Maps URL
      if (url.includes('maps/place')) {
        // Get the CID from the URL
        const cidMatch = url.match(/!1s0x[0-9a-fA-F]+/);
        if (cidMatch) {
          return cidMatch[0].replace('!1s', '');
        }
        
        // Try getting from pathname
        const pathParts = urlObj.pathname.split('/');
        const placeIndex = pathParts.indexOf('place');
        if (placeIndex !== -1 && pathParts[placeIndex + 1]) {
          const placeId = pathParts[placeIndex + 1].split('/')[0];
          if (placeId.length > 25) return placeId;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  };

  const fetchGoogleReviews = async () => {
    if (!googleUrl) {
      toast({
        title: "Error",
        description: "Please enter a Google Business URL",
        variant: "destructive",
      });
      return;
    }

    const placeId = extractPlaceId(googleUrl);
    if (!placeId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Google Maps business URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setFetchedData({
        rating: data.rating,
        reviewCount: data.reviewCount,
      });

      onFetchComplete({
        rating: data.rating,
        reviewCount: data.reviewCount,
        name: data.name,
        address: data.address,
        website: data.website,
        phone: data.phone,
      });

      setShowUpdatePrompt(true);

      toast({
        title: "Success",
        description: `Successfully fetched details for ${data.name || 'business'}`,
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Google Business URL or Place ID</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Paste Google Maps URL or Place ID"
            value={googleUrl}
            onChange={(e) => setGoogleUrl(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={fetchGoogleReviews}
            disabled={loading || !googleUrl}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mt-2">
          <p className="font-medium mb-1">How to get your Google Place ID:</p>
          <ol className="list-decimal ml-4 space-y-1">
            <li>Go to <a 
              href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google's Place ID Finder
            </a></li>
            <li>Search for your business name</li>
            <li>Copy the Place ID shown</li>
          </ol>
          <p className="mt-2">Example Place ID: ChIJN1t_tDeuEmsRUsoyG83frY4</p>
        </div>
      </div>

      {fetchedData && (
        <>
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rating</span>
              <span className="font-medium">{fetchedData.rating} ⭐</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Reviews</span>
              <span className="font-medium">{fetchedData.reviewCount}</span>
            </div>
          </div>

          {showUpdatePrompt && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">
                Would you like to update your form with the fetched details?
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setShowUpdatePrompt(false);
                    toast({
                      title: "Updated",
                      description: "Form details have been updated with Google data",
                    });
                  }}
                >
                  Yes, Update Form
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpdatePrompt(false)}
                >
                  No, Keep Current Details
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 