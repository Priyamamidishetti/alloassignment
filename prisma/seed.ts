import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Warehouse A",
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Warehouse B",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Nike Shoes",
    },
  });

  await prisma.inventory.createMany({
    data: [
      {
        productId: product1.id,
        warehouseId: warehouse1.id,
        totalStock: 10,
      },
      {
        productId: product1.id,
        warehouseId: warehouse2.id,
        totalStock: 5,
      },
      {
        productId: product2.id,
        warehouseId: warehouse1.id,
        totalStock: 20,
      },
    ],
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });