import React from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Cards = [
  {
    title: "Introduction",
    description:
      "Welcome to SEO Scientist. By accessing our website, you agree to these terms and conditions in full.",
  },
  {
    title: "Services",
    description:
      "Our services include SEO optimization, content strategy, and digital marketing solutions.",
  },
  {
    title: "Privacy Policy",
    description:
      "We respect your privacy and are committed to protecting your personal data.",
  },
];
const TermsAndConditions = () => {
  return (
    <div className="mt-8 max-w-[1200px] w-9/12 flex flex-col gap-6 md:gap-16 min-h-[70vh] mx-auto  ">
      <div className="flex flex-col  gap-4">
        <div className="">
          <h1 className="text-3xl font-bold mb-1">Terms and Conditions</h1>
          <p className="">Last Updated Feb'25</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex gap-1 items-center border px-2 rounded-lg">
            <Image
              src="/images/svgs/download.svg"
              width={20}
              height={20}
              alt="download_image"
            />{" "}
            <span className="text-sm font-semibold"> Download PDF</span>
          </button>
          <button className="flex gap-1 items-center border px-2 rounded-lg">
            <Image
              src="/images/svgs/print.svg"
              width={20}
              height={20}
              alt="download_image"
            />{" "}
            <span> Print</span>
          </button>
          <button className="flex gap-1 items-center border px-2 rounded-lg py-1">
            <Image
              src="/images/svgs/share.svg"
              width={20}
              height={20}
              alt="download_image"
            />{" "}
            <span> Share</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                {index + 1}. {card.title}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;
