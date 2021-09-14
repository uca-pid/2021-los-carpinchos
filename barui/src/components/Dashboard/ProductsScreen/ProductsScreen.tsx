import React from "react";

import CreateProduct from "./CreateProduct";

import { connect } from "react-redux";
import DataView, { ColumnDef } from "../../common/DataView/DataView";

export type Product = {
	id: string;
	name: string;
	price: number;
};

type Props = {
	products: Product[];
};

const columnsDef: ColumnDef[] = [
	{
		title: "Nombre",
		propName: "name",
	},
	{
		title: "Precio ($)",
		propName: "price",
		align: "right",
	},
];

const ProductsScreen = ({ products }: Props) => {
	return (
		<DataView
			addButton={<CreateProduct />}
			columnsDef={columnsDef}
			data={products}
			title="Productos"
		/>
	);
};

type State = {
	products: {
		userProducts: Product[];
	};
};

const mapStateToProps = (state: State) => ({
	products: state?.products?.userProducts,
});

export default connect(mapStateToProps)(ProductsScreen);
