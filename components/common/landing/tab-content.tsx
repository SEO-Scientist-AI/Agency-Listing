import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
const TabContent = ({ tabData,value }: { tabData: any,value:string }) => {
  const handleClick = (itemBasedOnTab: any) => {
    console.log(itemBasedOnTab);
  };
  return (
    <TabsContent value={value} className="mt-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {tabData.map((tabItem: { name: string } | string) => {
          let name = "";
          if (typeof tabItem === "object") {
            name = tabItem.name;
          } else {
            name = tabItem;
          }
          return (
            <motion.button
              key={name}
              onClick={() => handleClick(name)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors hover:text-signature hover:border-signature`}
              whileTap={{ scale: 0.95 }}
            >
              {name}
            </motion.button>
          );
        })}
      </div>
    </TabsContent>
  );
};

export default TabContent;
