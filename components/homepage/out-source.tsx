import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";
  import Image from "next/image";
  import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";   
  
  const features = [
    {
      Icon: FileTextIcon,
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/placeholder.jpg" alt="" width={200} height={200} />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
      Icon: InputIcon,
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/placeholder.jpg" alt="" width={200} height={200} />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: GlobeIcon,
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/placeholder.jpg" alt="" width={200} height={200} />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: CalendarIcon,
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/placeholder.jpg" alt="" width={200} height={200} />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: BellIcon,
      name: "Notifications",
      description:
        "Get notified when someone shares a file or mentions you in a comment.",
      href: "/",
      cta: "Learn more",
      background: <Image className="absolute -right-20 -top-20 opacity-60" src="/placeholder.jpg" alt="" width={200} height={200} />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
  ];
  
  export function OutSource() {
    return (
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center lg:w-[75%] px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight mb-4">
                Outsource with confidence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our Agency Partners are skilled marketers who have excelled at helping their clients grow.
            </p>
          </div>
          <BentoGrid className="lg:grid-rows-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>
    );
  }