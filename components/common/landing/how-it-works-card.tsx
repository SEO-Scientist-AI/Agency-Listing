import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { HowItsWorksCards } from '@/components/homepage/how-it-works';
import Image from 'next/image';
import { IconArrowNarrowRight } from '@tabler/icons-react';
const HowItsWorksCard = ({card}:{card:HowItsWorksCards}) => {
  return (
    <Card className="w-[320px] h-96">
      
      <CardContent className="py-2">
        <div className="w-full flex flex-col gap-2">
            <div className="h-40">

            <Image src={card.image} alt={card.heading} width={100} height={100} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col gap-1 h-24">
                <h2 className="text-lg md:text-xl font-bold">{card.heading}</h2>
                <p className="text-sm">{card.description}</p>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-end font-semibold text-xl py-2 h-20 ">
        <div className="flex justify-center items-center">

        Step {card.step} <span className="md:hidden"><IconArrowNarrowRight/></span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default HowItsWorksCard;
