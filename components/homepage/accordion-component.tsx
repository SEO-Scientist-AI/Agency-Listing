import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TITLE_TAILWIND_CLASS } from "@/utils/constants"

export function AccordionComponent() {
    const faqItems = [
        {
            question: "What is Digital Marketing Worldwide?",
            answer: "Digital Marketing worldwide refers to professional solutions that help businesses improve their online presence, reach global audiences, and drive measurable results through various digital channels and strategies."
        },
        {
            question: "What Does a Digital Marketing Consultant Do?",
            answer: "A Digital Marketing consultant analyzes your business needs, develops comprehensive marketing strategies, and implements solutions across channels like SEO, social media, PPC, content marketing, and email marketing to achieve your business goals."
        },
        {
            question: "How Much Do Digital Marketing Services Cost?",
            answer: "The cost of Digital Marketing varies. Basic packages start at $500/month, while advanced strategies for highly competitive markets can cost $5,000+ per month, depending on your goals and requirements."
        },
        {
            question: "What Are the Benefits of Hiring a Digital Marketing Agency?",
            answer: "Hiring a Digital Marketing agency helps businesses increase online visibility, improve brand presence, drive targeted traffic, generate quality leads, and achieve better ROI through expert strategies and proven methodologies."
        },
        {
            question: "How Do I Choose the Best Digital Marketing Company?",
            answer: "When choosing the best Digital Marketing company, consider their client reviews, past campaign results, pricing structure, industry experience, and expertise across different digital marketing channels."
        },
        {
            question: "What Is the Difference Between a Digital Marketing Agency and a Consultant?",
            answer: "A Digital Marketing agency offers a full range of services with a team of specialists across different areas, while a consultant provides expert advice and tailored strategies for specific marketing goals."
        },
        {
            question: "How Long Does It Take to See Digital Marketing Results?",
            answer: "Digital Marketing results typically take 3-6 months for noticeable improvements and 6-12 months for significant business impact, depending on the strategies implemented and market conditions."
        },
        {
            question: "What Are the Latest Digital Marketing Trends for 2025?",
            answer: "Top Digital Marketing trends for 2025 include AI-driven marketing automation, personalized customer experiences, video marketing, voice search optimization, and enhanced data analytics for better decision-making."
        },
        {
            question: "Can a Digital Marketing Firm Guarantee Results?",
            answer: "No reputable Digital Marketing firm can guarantee specific results due to market dynamics and competitive factors, but they can demonstrate proven strategies and track records of success."
        },
        {
            question: "How Can I Get Started with the Best Digital Marketing Agency?",
            answer: "Looking for the best Digital Marketing agency? Browse our curated list of trusted agencies, compare reviews, and request a consultation today to find your perfect marketing partner!"
        }
    ];

    return (
        <div id="faq" className="flex flex-col w-[70%] lg:w-[50%]">
            <h2 className={`${TITLE_TAILWIND_CLASS} mt-2 mb-8 font-semibold text-center tracking-tight dark:text-white text-gray-900`}>
                Frequently Asked Questions (FAQs) - Best Digital Marketing Worldwide
            </h2>
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger>
                            <span className="font-medium">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p>{item.answer}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}