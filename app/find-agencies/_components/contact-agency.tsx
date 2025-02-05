"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Video } from "lucide-react"
import { Skeleton } from '@/components/ui/skeleton';

interface ContactAgencyProps {
  agency: {
    name: string;
    services: string[];
  };
}

export function ContactAgency({ agency }: ContactAgencyProps) {
  const [selectedMainService, setSelectedMainService] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Handle form submission
  }

  return (
    <div className="w-full">
      <Button variant="secondary" className="w-full mb-4 border-[1px]">
        <Calendar className="mr-2 h-4 w-4" />
        Schedule a Call
      </Button>
      <p className="text-sm text-muted-foreground text-center mb-6">
        {loading ? <Skeleton className="w-[100px] h-[20px] rounded-full" /> : 
        <span>Or fill in this form, and the agency will contact you.</span>}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full name
          </Label>
          <Input id="name" required className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input id="email" type="email" required className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service" className="text-sm font-medium">
            Main service you&apos;re interested in
          </Label>
          <Select value={selectedMainService} onValueChange={setSelectedMainService}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {agency.services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Project details
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your project..."
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  )
}
