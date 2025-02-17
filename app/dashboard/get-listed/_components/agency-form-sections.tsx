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
    <AccordionItem value={value}>
      <AccordionTrigger className="text-lg group">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors
            ${isCompleted ? 'bg-primary' : 'bg-muted'}`}>
            {isCompleted && <Check className="w-4 h-4 text-white" />}
          </div>
          <span className="font-semibold">{title}</span>
          {isCompleted && (
            <Badge variant="outline" className="ml-2">
              Completed
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-4 space-y-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export function InputField({ 
  label, 
  required, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
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