import { Sale } from "./SalesScreen";

export const mockedSales: Sale[] = [
	{
		id: 1,
		creationDate: new Date(),
		modificationDate: new Date(),
		productsSale: [
			{
				amount: 2,
				productId: 1,
			},
			{
				amount: 5,
				productId: 2,
			},
		],
	},
	{
		id: 2,
		creationDate: new Date(2021, 8, 24),
		modificationDate: new Date(),
		productsSale: [
			{
				amount: 10,
				product: {
					id: 1,
					name: "Product 1",
					price: 100,
					category: {
						id: 1,
						name: "Category 1",
						static: true,
					},
				},
			},
		],
	},
];
