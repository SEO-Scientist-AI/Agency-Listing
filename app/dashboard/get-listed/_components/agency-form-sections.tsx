import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface SectionProps {
  title: string;
  value: string;
  isCompleted: boolean;
  children: React.ReactNode;
}

export function FormSection({ title, value, isCompleted, children }: SectionProps) {
  return (
    <AccordionItem value={value} className="px-1 border rounded-lg mb-4 overflow-hidden">
      <AccordionTrigger className="text-lg group hover:no-underline px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors
            ${isCompleted ? 'bg-primary' : 'bg-muted'}`}>
            {isCompleted && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-lg">{title}</span>
            {isCompleted && (
              <span className="text-xs text-muted-foreground">
                Section completed
              </span>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-6 space-y-6 bg-card">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export function InputField({ 
  label, 
  required, 
  description,
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { 
  label: string;
  description?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label className="font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Input {...props} className="focus-visible:ring-primary" />
    </div>
  );
}

export function TextareaField({ 
  label, 
  required, 
  ...props 
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea {...props} className="min-h-[100px] focus-visible:ring-primary" />
    </div>
  );
}

interface SubSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function SubSection({ title, description, children }: SubSectionProps) {
  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
      {title && (
        <div className="space-y-1">
          <h4 className="font-medium text-sm">{title}</h4>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
} 