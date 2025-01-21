import React from 'react';
import HowItsWorksCard from '../common/landing/how-it-works-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface HowItsWorksCards {
    image: string;
    heading: string;
    description: string;
    step: number;
    url: string;
}

const HowItsWorks = () => {
    const CardsData: HowItsWorksCards[] = [{
        heading:"Define Your Needs",
        description: "Tell us about your needs, so we can find the right partner for the job,The most suitable agencies will get your brief.",
        url:"some",
        step: 1,
        image:"/images/step1.jpg"
    },
    {
        heading:"Receive Agency Proposals",
        description:"The most suitable agencies will get your brief. The agencies will message you on the Agency Partners platform within 2 days and suggest how they can help.",
        url:"some",
        step: 2,
         image:"/images/step2.jpg"
    },{
        heading:"Find the Right Partners",
        description:"Importantly, you are under no obligation to hire any of the agencies presented to you. You have the freedom to explore your options and choose the best fit.",
        url:"some",
        step: 3,
         image:"/images/step3.jpg"
    }]
  return (
    <div>
        <div className="hidden md:flex flex-wrap justify-center items-center gap-4">

        {CardsData.map(card=>
            <HowItsWorksCard card={card} key={card.step}/>
        )}
        </div>
        <div className="md:hidden">
        <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {CardsData.map((card, index) => (
          <CarouselItem key={card.step}>
            <HowItsWorksCard card={card} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
        </div>
    </div>
  );
}

export default HowItsWorks;
