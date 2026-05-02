import HomePageClient from "@/components/HomePageClient";
import { client } from "@/sanity/lib/client";
import {
  getHeroQuery,
  getServicesQuery,
  getProjectsQuery,
  getTestimonialsQuery,
  getGlobalConfigQuery,
} from "@/sanity/lib/queries";

// Set revalidate to allow dynamic ISR updates from Sanity
export const revalidate = 60;

export default async function Home() {
  // Fetch all data from Sanity concurrently
  const [hero, services, projects, testimonials, globalConfig] = await Promise.all([
    client.fetch(getHeroQuery),
    client.fetch(getServicesQuery),
    client.fetch(getProjectsQuery),
    client.fetch(getTestimonialsQuery),
    client.fetch(getGlobalConfigQuery),
  ]);

  return (
    <HomePageClient
      hero={hero}
      services={services}
      projects={projects}
      testimonials={testimonials}
      globalConfig={globalConfig}
    />
  );
}
