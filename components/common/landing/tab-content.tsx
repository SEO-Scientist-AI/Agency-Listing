import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {Service,Industry,City} from "@/types/filtering-data";
import { getUniqueValuesFromArray } from "@/lib/utils";

type TabContentProp = Service[] | Industry[] | City[]


// ensuring services ,industries and cities are not empty and corret Data
const isServiceArray = (data: TabContentProp): data is Service[] => {
  return data.length > 0 && "serviceName" in data[0];
};

const isIndustryArray = (data: TabContentProp): data is Industry[] => {
  return data.length > 0 && "industryName" in data[0];
};

const isCityArray = (data: TabContentProp): data is City[] => {
  return data.length > 0 && "cityName" in data[0];
};

const TabContent = ({ tabData,value }: { tabData: TabContentProp, value:string }) => {
  const handleClick = (itemBasedOnTab: any) => {
    console.log(itemBasedOnTab);
  };


  if(isServiceArray(tabData)){
   return (
    <TabsContent value={value} className="mt-6 ">
      <div className="flex flex-wrap gap-3 justify-center">
        {tabData.slice(0, 20).map((tabItem) =>  (
            <motion.button
              key={tabItem.id}
              onClick={() => handleClick(tabItem.slug)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors hover:text-signature hover:border-signature`}
              whileTap={{ scale: 0.95 }}
            >
              {tabItem.serviceName}
            </motion.button>
          )
        )}
      </div>
    </TabsContent>
  );
    
  }
  else if(isIndustryArray(tabData)){
   return (
    <TabsContent value={value} className="mt-6 ">
      <div className="flex flex-wrap gap-3 justify-center">
        {tabData.slice(0, 20).map((tabItem) =>  (
            <motion.button
              key={tabItem.id}
              onClick={() => handleClick(tabItem.slug)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors hover:text-signature hover:border-signature`}
              whileTap={{ scale: 0.95 }}
            >
              {tabItem.industryName}
            </motion.button>
          )
        )}
      </div>
    </TabsContent>
  );
    
  }
  else if(isCityArray(tabData)){
    
    if(value === "country"){
      const uniqueCountry = getUniqueValuesFromArray(tabData, "countryName");
      return (
        <TabsContent value={value} className="mt-6 ">
          <div className="flex flex-wrap gap-3 justify-center">
            {uniqueCountry.slice(0, 20).map((tabItem) =>  (
                <motion.button
                  key={tabItem.id}
                  onClick={() => handleClick(tabItem.countrySlug)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors hover:text-signature hover:border-signature`}
                  whileTap={{ scale: 0.95 }}
                >
                  {tabItem.countryName}
                </motion.button>
              )
            )}
          </div>
        </TabsContent>
      );
    }
    else if (value === 'city'){

      const uniqueCity = getUniqueValuesFromArray(tabData, "cityName");
   return (
    <TabsContent value={value} className="mt-6 ">
      <div className="flex flex-wrap gap-3 justify-center">
        {uniqueCity.slice(0, 20).map((tabItem) =>  (
            <motion.button
              key={tabItem.id}
              onClick={() => handleClick(tabItem.citySlug)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors hover:text-signature hover:border-signature`}
              whileTap={{ scale: 0.95 }}
            >
              {tabItem.cityName}
            </motion.button>
          )
        )}
      </div>
    </TabsContent>
  );
}
  }
};

export default TabContent;
