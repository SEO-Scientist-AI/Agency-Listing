"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactModalProps {
  agency: {
    name: string;
    services: string[];
  };
  trigger?: React.ReactNode;
}

export function ContactModal({ agency, trigger }: ContactModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedMainService, setSelectedMainService] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Ensure agency data is valid
  if (!agency?.name || !Array.isArray(agency?.services)) {
    console.error('Invalid agency data provided to ContactModal')
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {
      name: "",
      email: "",
      message: "",
    }

    if (!name) {
      newErrors.name = "Name is required"
    }

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address"
    }

    if (!message) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)

    if (Object.values(newErrors).every((error) => !error)) {
      // Handle form submission
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg">
            Contact Agency
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Contact {agency.name}</DialogTitle>
          <DialogDescription className="text-base">
            Fill in this form, and the agency will contact you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project..."
              required
              className="min-h-[100px]"
            />
            {errors.message && <div className="text-red-500">{errors.message}</div>}
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
