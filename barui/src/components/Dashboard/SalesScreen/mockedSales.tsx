import { Sale } from "./SalesScreen";

export const mockedSales: Sale[] = [
	{
		id: 1,
		creationDate: new Date(),
		modificationDate: new Date(),
		productSale: [
			{
				amount: 2,
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
			{
				amount: 5,
				product: {
					id: 2,
					name: "Product 2",
					price: 200,
					category: {
						id: 1,
						name: "Category 2",
						static: true,
					},
				},
			},
		],
	},
	{
		id: 2,
		creationDate: new Date(2021, 8, 24),
		modificationDate: new Date(),
		productSale: [
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
