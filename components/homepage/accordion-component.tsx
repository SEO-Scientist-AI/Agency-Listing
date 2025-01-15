import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TITLE_TAILWIND_CLASS } from "@/utils/constants"

export function AccordionComponent() {
    return (
        <div id="faq" className="flex flex-col w-[70%] lg:w-[50%]">
            <h2 className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold text-center tracking-tight dark:text-white text-gray-900`}>
                Frequently Asked Questions (FAQs)
            </h2>
            <Accordion type="single" collapsible className="w-full mt-2">
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className="font-medium">Is searching for an agency free?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Yes. Semrush does not charge marketers looking to hire an agency.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger><span className="font-medium">How can I list my agency on the platform?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Access to the platform is offered as one of the lead generation solutions included in the Agency Growth Kit. Learn how Agency Growth Kit can help scale your agency business.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger><span className="font-medium">Do I need to get certified?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>We strongly recommend all agencies get certified via Semrush Academy after they publish their profile; however, this is not mandatory. Certified agencies get a higher Agency Score. This helps agencies get more visibility and build rapport with the users of the platform. While taking our courses and passing the exams, you&#39;ll also get a chance to brush up on your Semrush knowledge and learn how to make the most of our tools.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger><span className="font-medium">What are the benefits of being listed?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>The Agency Partners platform connects the users looking for support with their digital projects with trusted marketing agencies. Once you&#39;re trained and certified via Semrush Academy, you&#39;ll get Semrush Agency Partner Status. You&#39;ll be able to create your dedicated page on semrush.com and get exposed to our global community of marketers.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger><span className="font-medium">What is Agency Score?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Agency Score is our proprietary metric created to help you choose the right Agency Partner. It ranges from 1 to 5; the closer the score is to 5, the better. Each agency listed on the platform is evaluated based on their own website&#39;s health as well as their Semrush Academy certification status. Most successful agencies do everything for their business that they would do for their clients. We also encourage agencies to keep learning and getting better at what they do. We don&#39;t prioritize agencies based on the number of clients they have, since we would like to give equal opportunities to agencies of any scale and size.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}