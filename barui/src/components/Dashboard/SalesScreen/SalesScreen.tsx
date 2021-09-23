import React, { useState, useCallback } from "react";

import DataTable, { ColumnDef } from "../../common/DataTable/DataTable";
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

// import ProductDialog from "./ProductDialog";
// import DeleteProductDialog from "./DeleteProductDialog";
import AddIcon from "@material-ui/icons/Add";

export type Sale = {
	id: string;
};

type Props = {
	actions: {};
	sales: Sale[];
};

const ProductsScreen = ({ actions, sales = [] }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const columnsDef: ColumnDef[] = [
		{
			title: "Venta Nro",
			propName: (row: Sale) => `Venta #${row.id}`,
		},
	];

	const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);

	const handleEditRow = useCallback(
		sale => {
			// actions.selectProduct(product);
			setOpen(true);
		},
		[actions, setOpen]
	);

	const handleDeleteRow = useCallback(
		sale => {
			// actions.selectProduct(product);
			setDeleteOpen(true);
		},
		[actions]
	);

	return (
		<Container maxWidth="md">
			{/* <ProductDialog open={open} setOpen={setOpen} />

			<DeleteProductDialog open={deleteOpen} setOpen={setDeleteOpen} /> */}

			<Grid container direction="column" spacing={3}>
				<Grid alignItems="center" container item>
					<Grid item xs>
						<Typography variant="h5" color="primary">
							Ventas
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
						data={sales}
						onEditRow={handleEditRow}
						onDeleteRow={handleDeleteRow}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

type State = {
	sales: {
		userSales: Sale[];
	};
};

const mapStateToProps = (state: State) => ({
	sales: state?.sales?.userSales,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
