import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FormMethodHeaderProps {
  method: 'google' | 'manual';
  onChangeMethod: () => void;
  onSwitchMethod: () => void;
}

export function FormMethodHeader({ method, onChangeMethod, onSwitchMethod }: FormMethodHeaderProps) {
  return (
    <div className="mb-6 bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between">
        {method === 'google' ? (
          <>
            <div>
              <h3 className="font-medium mb-1">Google Import Method</h3>
              <p className="text-sm text-muted-foreground">
                Enter your Google Business URL below to auto-fill the form
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onChangeMethod}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to options
            </Button>
          </>
        ) : (
          <>
            <div>
              <h3 className="font-medium mb-1">Manual Entry Method</h3>
              <p className="text-sm text-muted-foreground">
                Fill out each section with your agency details
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onChangeMethod}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to options
            </Button>
          </>
        )}
      </div>
    </div>
  );
} 