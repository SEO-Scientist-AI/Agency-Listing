/* eslint-disable react/no-unescaped-entities */
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React from "react";
  import Image from "next/image";
  // import { CreateJobForm } from "@/components/forms/CreateJobForm";
  import Layout from './Layout';
  // import  ListAgencyForm from "./_components/listAgencyForm";

  const companies = [
    { id: 0, name: "ArcJet", logo: "images/placeholder.svg" },
    { id: 1, name: "Inngest", logo: "images/placeholder.svg" },
    { id: 2, name: "ArcJet", logo: "images/placeholder.svg" },
    { id: 3, name: "Inngest", logo: "images/placeholder.svg" },
    { id: 4, name: "ArcJet", logo: "images/placeholder.svg" },
    { id: 5, name: "Inngest", logo: "images/placeholder.svg" },
  ];
  
  const testimonials = [
    {
      quote:
        "We listed our agency and got our first lead within a week. The quality of leads is exceptional!",
      author: "Sarah Chen",
      company: "AgencyCorp",
    },
    {
      quote:
        "The platform made listing our agency incredibly simple. Highly recommended!",
      author: "Mark Johnson",
      company: "AgencyX",
    },
    {
      quote:
        "We've consistently found high-quality leads here. It's our go-to platform for all our agency listing needs.",
      author: "Emily Rodriguez",
      company: "AgencyNow",
    },
  ];
  
  const stats = [
    { value: "500+", label: "Agenies already listed" },
    { value: "10k+", label: "Searching monthly" },
    { value: "1w", label: "Average time to first lead" },
    { value: "95%", label: "Employer satisfaction rate" },
    
  ];
  
  const companyAbout = "ArcJet is a leading company in aerospace technology.";
  const companyLocation = "California, USA";
  const companyLogo = "placeholder.svg";
  const companyName = "ArcJet";
  const companyXAccount = "@arcjet";
  const companyWebsite = "https://www.arcjet.com";

  const PostJobPage = () => {
    return (
        <Layout>
            <main>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <h1>Add New Agency</h1>
                    {/* <ListAgencyForm /> */}
                </div>
                    <div className="col-span-1">
                        <Card className="lg:sticky lg:top-4">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Join Top Agencies
                                </CardTitle>
                                <CardDescription>
                                    List your agency and get discovered by companies
                                    looking for top talent
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Company Logos */}
                                <div className="grid grid-cols-3 gap-4">
                                    {companies.map((company) => (
                                        <div
                                            key={company.id}
                                            className="flex items-center justify-center"
                                        >
                                            <Image
                                                src={company.logo}
                                                alt={company.name}
                                                height={80}
                                                width={80}
                                                className="opacity-75 transition-opacity hover:opacity-100 rounded-lg"
                                            />{" "}
                                        </div>
                                    ))}
                                </div>

                                {/* Testimonials */}
                                <div className="space-y-4">
                                    {testimonials.map((testimonial, index) => (
                                        <blockquote
                                            key={index}
                                            className="border-l-2 border-primary pl-4"
                                        >
                                            <p className="text-sm italic text-muted-foreground">
                                                "{testimonial.quote}"
                                            </p>
                                            <footer className="mt-2 text-sm font-medium">
                                                - {testimonial.author}, {testimonial.company}
                                            </footer>
                                        </blockquote>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="rounded-lg bg-muted p-4">
                                            <div className="text-2xl font-bold">{stat.value}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </Layout>
    );
  };
  
  export default PostJobPage;