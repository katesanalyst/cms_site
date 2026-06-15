const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const hero = await prisma.hero.findFirst({ where: { page: { slug: "homepage" } }, include: { page: true } });
  console.log("Homepage hero:");
  console.log("  bgType:", hero?.bgType);
  console.log("  videoUrl:", hero?.videoUrl);
  console.log("  videoType:", hero?.videoType);
  console.log("  bgImage:", hero?.bgImage);
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
