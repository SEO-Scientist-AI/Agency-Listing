import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQProps {
    service?: string;
    location?: string;
}

export function FAQ({ service = "Digital Marketing", location = "Worldwide" }: FAQProps) {
    const faqItems = [
        {
            question: `What is ${service} in ${location}?`,
            answer: `${service} in ${location} refers to professional solutions that help businesses improve their online presence, rank higher on search engines, and attract local and global customers.`
        },
        {
            question: `What Does a ${service} Consultant in ${location} Do?`,
            answer: `A ${service} consultant in ${location} analyzes your business needs, identifies opportunities, and implements strategies to achieve your marketing goals through specialized ${service.toLowerCase()} solutions.`
        },
        {
            question: `How Much Do ${service} Services Cost in ${location}?`,
            answer: `The cost of ${service} in ${location} varies. Basic packages start at $500/month, while advanced strategies for highly competitive markets can cost $5,000+ per month.`
        },
        {
            question: `What Are the Benefits of Hiring a ${service} Agency in ${location}?`,
            answer: `Hiring a ${service} agency in ${location} helps businesses increase visibility, improve market presence, drive targeted traffic, and generate high-quality leads through specialized expertise.`
        },
        {
            question: `How Do I Choose the Best ${service} Company in ${location}?`,
            answer: `When choosing the best ${service} company in ${location}, consider client reviews, past results, pricing, experience, and industry specialization.`
        },
        {
            question: `What Is the Difference Between a ${service} Agency and a ${service} Consultant in ${location}?`,
            answer: `A ${service} agency in ${location} offers a full range of services with a team of specialists, while a consultant provides expert advice and tailored strategies for specific business goals.`
        },
        {
            question: `How Long Does It Take to See ${service} Results in ${location}?`,
            answer: `${service} results in ${location} typically take 3-6 months for noticeable improvements and 6-12 months for significant business impact.`
        },
        {
            question: `What Are the Latest ${service} Trends in ${location} for 2025?`,
            answer: `Top ${service} trends in ${location} for 2025 include AI-driven solutions, automation, data-driven strategies, and enhanced customer experience optimization.`
        },
        {
            question: `Can a ${service} Firm in ${location} Guarantee Results?`,
            answer: `No reputable ${service} firm in ${location} can guarantee specific results due to market dynamics and competitive factors, but they can demonstrate proven strategies for success.`
        },
        {
            question: `How Can I Get Started with the Best ${service} Agency in ${location}?`,
            answer: `Looking for the best ${service} agency in ${location}? Browse our curated list of trusted agencies, compare reviews, and request a consultation today!`
        }
    ];

    return (
        <div className="w-full p-8">
            <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions (FAQs) - Best {service} in {location}
            </h2>
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
