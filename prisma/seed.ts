import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const regions = ["West", "Central", "East", "South"];
const orderDate = new Date();

const products = [
	{ category: "Whole bean", productName: "Ethiopia Guji 340g", amount: 19 },
	{ category: "Whole bean", productName: "Colombia Huila 340g", amount: 17 },
	{ category: "Whole bean", productName: "Kenya AA 340g", amount: 21 },
	{ category: "Espresso", productName: "House Espresso 1kg", amount: 38 },
	{ category: "Espresso", productName: "Decaf Espresso 1kg", amount: 42 },
	{ category: "Equipment", productName: "Gooseneck kettle", amount: 59 },
	{ category: "Equipment", productName: "Burr grinder", amount: 129 },
	{ category: "Equipment", productName: "V60 dripper set", amount: 34 },
	{ category: "Subscription", productName: "Monthly box", amount: 24 },
	{ category: "Subscription", productName: "Office plan", amount: 96 },
];

async function main() {
	await prisma.order.createMany({
		data: products.map((product, index) => ({
			...product,
			orderDate,
			quantity: 1,
			region: regions[index % regions.length],
		})),
	});
}

main()
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
