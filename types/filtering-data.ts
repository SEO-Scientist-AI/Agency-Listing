export interface Service {
    _id: string;
    serviceName: string;
    slug:string
}

export interface City {
    _id:string;
    cityName: string;
    citySlug:string;
    countryName:string;
    countrySlug:string;
}
export interface Industry {
    _id:string;
    industryName: string;
    slug:string
   
}