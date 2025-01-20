import Link from 'next/link';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const AgencyCard = ({ agency }: { agency: (typeof agencies)[0] }) => {
    return (
      <Link href={`/dashboard/find-agencies/${agency.id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center gap-4">
            <img 
              src={agency.logo} 
              alt={agency.name} 
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{agency.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{agency.rating} ★</span>
                <span className="text-sm text-muted-foreground">({agency.reviews} reviews)</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{agency.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {agency.services.map((service, index) => (
                <Badge 
                  key={index} 
                >
                  {service.name}
                </Badge>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{agency.location}</span>
              <span className="font-medium">{agency.budgetRange}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
};

export const agencies = [
      {
          id: 1,
          name: "Digital Marketing Pro Agency",
          logo: "https://images.unsplash.com/photo-1612810806546-ebbf22b53496?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "We help businesses grow their online presence through data-driven SEO strategies and comprehensive digital marketing solutions.",
          category: "Digital Marketing",
          rating: 4.8,
          reviews: 128,
          location: "New York City, NY",
          services: [
              { name: "SEO", color: "indigo" },
              { name: "Backlink Management", color: "purple" },
              { name: "Content Marketing", color: "blue" }
          ],
          budgetRange: "$1,000 - $5,000 /month"
      },
      {
          id: 2,
          name: "Creative Design Solutions",
          logo: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg",
          description: "Award-winning design agency specializing in brand identity, UI/UX design, and creative solutions for modern businesses.",
          category: "Design",
          rating: 4.9,
          reviews: 156,
          location: "San Francisco, CA",
          services: [
              { name: "UI/UX Design", color: "pink" },
              { name: "Brand Identity", color: "orange" },
              { name: "Web Design", color: "yellow" }
          ],
          budgetRange: "$2,000 - $7,500 /month"
      }
];