"use client";

import { type FC } from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ThemeToggle } from "@/components/theme-toggle";
import ReactCountryFlag from "react-country-flag";
import { Phone, Mail } from "lucide-react";
import Image from "next/image";

const sections = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Our Blog", href: "https://seoscientist.agency/blog/" },
      { name: "Our Tools", href: "https://www.seoscientist.ai/" },
      { name: "Get Quote", href: "https://seoscientist.agency/get-quote/" },
      { name: "Contact Us", href: "https://seoscientist.agency/contact/" },
      { name: "Case Studies", href: "https://seoscientist.agency/case-studies/" },
    ]
  },
  {
    title: "Our Locations",
    links: [
      { 
        name: "UAE",
        countryCode: "AE",
        details: [
          "164, A1 Jaddaf Walk",
          "A1 Jaddaf Dubai 500001"
        ]
      },
      {
        name: "India",
        countryCode: "IN",
        details: [
          "404, 4th Floor Govindpuri",
          "New Delhi-11003"
        ]
      }
    ]
  },
  {
    title: "Contact Us",
    links: [
      { 
        name: "+917428430119",
        icon: Phone,
        href: "tel:+917428430119",
        label: "Phone"
      },
      { 
        name: "info@seoscientist.agency",
        icon: Mail,
        href: "mailto:info@seoscientist.agency",
        label: "Email"
      },
    ]
  }
];

const Footer: FC = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto">
                <footer>
                    <div className="flex flex-col items-center justify-between gap-16 text-center lg:flex-row lg:text-left">
                        <div className="flex w-full max-w-96 shrink flex-col items-center gap-8 lg:items-start">
                            <div>
                                <span className="flex items-center justify-center gap-3 lg:justify-start">
                                    <Image
                                        src="/images/favicon.svg"
                                        alt="SEO Scientist Logo"
                                        className="h-10"
                                        width={40}
                                        height={40}
                                    />
                                    <p className="text-2xl font-semibold text-foreground">SEO Scientist</p>
                                </span>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Global Marketing Agency Marketplace connecting brands with top agencies for branding, digital marketing, SEO, and advertising.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-6 lg:items-start">
                                <ul className="flex items-center gap-5 text-muted-foreground">
                                    <li className="font-medium hover:text-primary transition-colors">
                                        <Link href="https://www.instagram.com/seoscientistuae/" target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src="/images/social/instagram.svg"
                                                alt="Instagram"
                                                width={24}
                                                height={24}
                                                className="h-6 w-6"
                                            />
                                        </Link>
                                    </li>
                                    <li className="font-medium hover:text-primary">
                                        <Link href="https://www.facebook.com/seoscientistagency/" target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src="/images/social/facebook.svg"
                                                alt="Facebook"
                                                width={24}
                                                height={24}
                                                className="h-6 w-6"
                                            />
                                        </Link>
                                    </li>
                                    <li className="font-medium hover:text-primary">
                                        <Link href="https://twitter.com/iamseoscientist" target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src="/images/social/twitter.svg"
                                                alt="Twitter"
                                                width={24}
                                                height={24}
                                                className="h-6 w-6"
                                            />
                                        </Link>
                                    </li>
                                    <li className="font-medium hover:text-primary">
                                        <Link href="https://www.linkedin.com/company/seoscientistusa" target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src="/images/social/linkedin.svg"
                                                alt="LinkedIn"
                                                width={24}
                                                height={24}
                                                className="h-6 w-6"
                                            />
                                        </Link>
                                    </li>
                                </ul>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">Theme:</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
                            {sections.map((section, sectionIdx) => (
                                <div key={sectionIdx}>
                                    <h3 className="mb-4 font-bold text-foreground">{section.title}</h3>
                                    <ul className={`space-y-${section.title === "Quick Links" ? "3" : "6"} text-sm text-muted-foreground`}>
                                        {section.links.map((link, linkIdx) => (
                                            <li key={linkIdx} className="font-medium">
                                                {'details' in link ? (
                                                    <div className="space-y-2">
                                                        <p className="text-base font-semibold flex items-center gap-2">
                                                            {'countryCode' in link && (
                                                                <ReactCountryFlag
                                                                    countryCode={link.countryCode}
                                                                    svg
                                                                    style={{
                                                                        width: '1.5em',
                                                                        height: '1.5em',
                                                                    }}
                                                                    title={link.name}
                                                                />
                                                            )}
                                                            {link.name}
                                                        </p>
                                                        {link.details?.map((detail, detailIdx) => (
                                                            <p key={detailIdx} className="text-sm">{detail}</p>
                                                        ))}
                                                    </div>
                                                ) : 
                                                'icon' in link ? (
                                                    <div className="group">
                                                        <Link 
                                                            href={link.href} 
                                                            className="flex items-center gap-3 hover:text-primary transition-colors"
                                                        >
                                                            <div className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                                                                <link.icon className="size-5" />
                                                            </div>
                                                            <div className="flex flex-col items-start">
                                                                <span className="text-xs text-muted-foreground">{link.label}</span>
                                                                <span className="text-sm font-medium">{link.name}</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    <Link 
                                                        href={link.href || '#'} 
                                                        className="hover:text-primary transition-colors"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border pt-6 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
                        <p>© 2024 SEO Scientist. All rights reserved.</p>
                        <ul className="flex justify-center gap-6 lg:justify-start">
                            <li className="hover:text-primary transition-colors">
                                <Link href="/terms-and-conditions">Terms and Conditions</Link>
                            </li>
                            <li className="hover:text-primary transition-colors">
                                <Link href="/privacy-policy">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export default Footer;
