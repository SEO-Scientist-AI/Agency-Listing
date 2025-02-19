import React from 'react';
import Image  from 'next/image';

const ServiceBanner = () => {
  return (
    <div>
      <div className=""></div>
      <div className="">
        <Image src="/images/bannerimages/servicebanner.png" width={450} height={430} alt="service_banner_images" className=""/>
        </div>
    </div>
  );
}

export default ServiceBanner;
