import React, { useState, useCallback, useEffect } from "react";

import DataTable from "../../common/DataTable";
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { selectProduct, getAllProducts } from "../../../ducks/productsReducer";
import ProductDialog from "./ProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import AddIcon from "@material-ui/icons/Add";
import { Category } from "../../common/CategoryCombo/CategoryCombo";

import { GridColDef } from "@mui/x-data-grid";

export type Product = {
	id: number;
	name: string;
	price: number;
	category: Category;
};

type Props = {
	actions: {
		selectProduct: Function;
		getAllProducts: Function;
	};
	products: Product[];
	id: number;
};

const ProductsScreen = ({ actions, id, products = [] }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	useEffect(() => id && actions.getAllProducts(id), [actions, id]);

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Nombre", flex: 1 },
		{ field: "price", headerName: "Precio", flex: 1 },
		{ field: "category", headerName: "Categoría", flex: 1 },
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
						columns={columns}
						rows={products.map(p => ({
							id: p.id,
							name: p.name,
							price: `$ ${p.price}`,
							category: p.category.name ?? "S/C",
							actions: p,
						}))}
						onEditRow={handleEditRow}
						onDeleteRow={handleDeleteRow}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	products: {
		userProducts: Product[];
	};
};

const mapStateToProps = (state: State) => ({
	products: state?.products?.userProducts,
	id: state?.session?.accountData?.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ selectProduct, getAllProducts }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
