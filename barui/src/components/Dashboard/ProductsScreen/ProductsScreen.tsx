import React, { useState, useCallback } from "react";

import DataTable, { ColumnDef } from "../../common/DataTable/DataTable";
import { Button, Container, Grid, IconButton, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { selectProduct } from "../../../ducks/productsReducer";
import ProductDialog from "./ProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import AddIcon from "@material-ui/icons/Add";

export type Product = {
	id: string;
	name: string;
	price: number;
};

type Props = {
	actions: {
		selectProduct: Function;
	};
	products: Product[];
};

const ProductsScreen = ({ actions, products }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

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

	const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);

	const handleEditRow = useCallback(
		product => {
			actions.selectProduct(product);
			setOpen(true);
		},
		[actions, setOpen]
	);

	const handleDeleteRow = useCallback(
		product => {
			actions.selectProduct(product);
			setDeleteOpen(true);
		},
		[actions]
	);

	return (
		<Container maxWidth="md">
			<ProductDialog open={open} setOpen={setOpen} />

			<DeleteProductDialog open={deleteOpen} setOpen={setDeleteOpen} />

			<Grid container direction="column" spacing={3}>
				<Grid alignItems="center" container item>
					<Grid item xs>
						<Typography variant="h5" color="primary">
							Productos
						</Typography>
					</Grid>
					<Grid item>
						<Button
							color="secondary"
							onClick={handleOpenDialog}
							variant="contained"
							startIcon={<AddIcon />}
						>
							Crear
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<DataTable
						columnsDef={columnsDef}
						data={products}
						onEditRow={handleEditRow}
						onDeleteRow={handleDeleteRow}
					/>
				</Grid>
			</Grid>
		</Container>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ selectProduct }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
