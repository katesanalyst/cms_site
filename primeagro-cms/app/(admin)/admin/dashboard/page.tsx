import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [products, lands, testimonials, team, gallery, blog, services, faqs] = await Promise.all([
    prisma.farmProduct.count(),
    prisma.farmLand.count(),
    prisma.testimonial.count(),
    prisma.teamMember.count(),
    prisma.galleryItem.count(),
    prisma.blogPost.count(),
    prisma.service.count(),
    prisma.faq.count(),
  ]);

  const cards = [
    { label: "Farm Products", count: products, color: "bg-blue-500" },
    { label: "Farm Lands", count: lands, color: "bg-green-500" },
    { label: "Testimonials", count: testimonials, color: "bg-yellow-500" },
    { label: "Team Members", count: team, color: "bg-purple-500" },
    { label: "Gallery Items", count: gallery, color: "bg-pink-500" },
    { label: "Blog Posts", count: blog, color: "bg-indigo-500" },
    { label: "Services", count: services, color: "bg-teal-500" },
    { label: "FAQs", count: faqs, color: "bg-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow p-5">
            <div className={`w-10 h-10 ${card.color} rounded-full mb-3`} />
            <p className="text-3xl font-bold">{card.count}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
