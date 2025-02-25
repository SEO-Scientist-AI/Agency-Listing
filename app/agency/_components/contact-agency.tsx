"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Loader2, ArrowRight } from "lucide-react"
import { Skeleton } from '@/components/ui/skeleton'
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { PhoneInput } from "@/components/ui/phone-input"
import { AgencyButton } from "@/components/ui/agency-button"

type E164Number = string;

interface ContactAgencyProps {
  agency: {
    name: string;
    services: string[];
  };
}

export function ContactAgency({ agency }: ContactAgencyProps) {
  const [selectedMainService, setSelectedMainService] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "" as E164Number | undefined,
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhoneChange = (value: E164Number | undefined) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone || !formData.message || !selectedMainService) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: selectedMainService,
          message: formData.message,
          agencyName: agency.name
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message')
      }

      // Show success toast
      toast({
        variant: "default",
        title: "✅ Message Sent!",
        description: (
          <div className="flex flex-col gap-2">
            <p className="font-medium text-green-600">
              Thanks for reaching out to {agency.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Check your inbox at {formData.email} for confirmation
            </p>
          </div>
        ),
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: undefined,
        message: ""
      })
      setSelectedMainService("")

    } catch (error) {
      toast({
        variant: "destructive",
        title: "❌ Error",
        description: "Failed to send message. Please try again.",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <Link 
        href="/schedule-demo"
        className="block w-full"
      >
        <Button variant="secondary" className="w-full mb-4 border-[1px]">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule a Demo
        </Button>
      </Link>
      
      <div className="text-sm text-muted-foreground text-center mb-6">
        {loading ? (
          <Skeleton className="w-[100px] h-[20px] rounded-full mx-auto" />
        ) : (
          "Or fill in this form, and the agency will contact you."
        )}
      </div>

      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full name <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="name"
              name="name"
              required 
              className="w-full"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="email"
              name="email"
              type="email" 
              required 
              className="w-full"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <PhoneInput
              value={formData.phone}
              onChange={handlePhoneChange}
              defaultCountry="IN"
              placeholder="Enter phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service" className="text-sm font-medium">
              Main service you&apos;re interested in <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={selectedMainService} 
              onValueChange={setSelectedMainService}
              required
            >
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
              Project details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project..."
              className="min-h-[100px]"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          {loading ? (
            <Button 
              disabled 
              className="w-full"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </Button>
          ) : (
            <div className="w-full">
              <button 
                type="submit"
                className="group cursor-pointer rounded-xl bg-transparent p-1 transition-all duration-500 w-full"
              >
                <div className="relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#ff642d] px-4 py-2 text-sm font-medium text-white w-full">
                  Get Quote
                  <ArrowRight className="transition-all group-hover:translate-x-2" strokeWidth={1.5} size={21} />
                  <div
                    className="absolute -left-16 top-0 h-full w-12 rotate-[30deg] scale-y-150 bg-white/10 transition-all duration-700 group-hover:left-[calc(100%+1rem)]"
                  />
                </div>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
