"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, PenLine } from "lucide-react";

interface FormMethodSelectorProps {
  onSelect: (method: 'google' | 'manual') => void;
}

export function FormMethodSelector({ onSelect }: FormMethodSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card 
        className="p-6 cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect('google')}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Import from Google</h3>
            <p className="text-sm text-muted-foreground">
              Auto-fill form using your Google Business Profile
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Import from Google
          </Button>
        </div>
      </Card>

      <Card 
        className="p-6 cursor-pointer hover:border-primary transition-colors"
        onClick={() => onSelect('manual')}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 rounded-full bg-primary/10">
            <PenLine className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold">Manual Entry</h3>
            <p className="text-sm text-muted-foreground">
              Fill out the form manually with your agency details
            </p>
          </div>
          <Button variant="outline" className="w-full">
            Enter Manually
          </Button>
        </div>
      </Card>
    </div>
  );
} 