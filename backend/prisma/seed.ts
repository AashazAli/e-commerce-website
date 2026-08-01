import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

  console.log("🌱 Seeding database...");

  const password = await bcrypt.hash("Admin@123", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@cemev.com",
    },
    update: {},
    create: {
      firstName: "System",
      lastName: "Administrator",
      email: "admin@cemev.com",
      password,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  console.log("✅ Admin Created");

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });