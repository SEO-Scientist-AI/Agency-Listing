import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { HowItWorksCard } from '@/components/homepage/how-it-works';
import { IconArrowNarrowRight } from '@tabler/icons-react';

const HowItsWorksCard = ({card}:{card:HowItWorksCard}) => {
  return (
    <Card className="w-[320px] h-96">
      <CardContent className="py-6">
        <div className="w-full flex flex-col gap-4">
          <div className="h-40 flex items-center justify-center">
            {React.createElement(card.icon, { size: 64 })}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg md:text-xl font-bold">{card.title}</h2>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HowItsWorksCard;
