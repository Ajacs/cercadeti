
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "./business-card";
import type { Business } from "@/types";

interface BusinessListProps {
  title: string;
  icon: React.ReactNode;
  businesses: Business[];
  viewAllHref: string;
  showOfferBadge?: boolean;
}

export function BusinessList({ title, icon, businesses, viewAllHref, showOfferBadge = false }: BusinessListProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
              {icon}
              {title}
          </h2>
          <Button variant="link" asChild>
              <Link href={viewAllHref}>Ver todos</Link>
          </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {businesses.map(business => (
          <BusinessCard key={business.id} business={business} showOfferBadge={showOfferBadge} />
        ))}
      </div>
    </section>
  );
}
