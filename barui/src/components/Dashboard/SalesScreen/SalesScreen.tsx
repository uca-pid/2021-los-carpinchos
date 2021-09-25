import React, { useState, useCallback, useEffect } from "react";

import DataTable from "../../common/DataTable";
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getSales } from "../../../ducks/salesReducer";

// import ProductDialog from "./ProductDialog";
// import DeleteProductDialog from "./DeleteProductDialog";
import AddIcon from "@material-ui/icons/Add";
import { GridColDef } from "@mui/x-data-grid";

export type Sale = {
	id: string;
	date: Date;
};

type Props = {
	actions: {
		getSales: Function;
	};
	accountId: number;
	sales: Sale[];
};

const ProductsScreen = ({ actions, accountId, sales = [] }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Nombre", flex: 1 },
		{ field: "date", headerName: "Fecha", flex: 1 },
	];

	useEffect(() => {
		accountId && actions.getSales(accountId);
	}, [actions, accountId]);

	const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);

	const handleEditRow = useCallback(
		sale => {
			// actions.selectProduct(product);
			setOpen(true);
		},
		[setOpen]
	);

	const handleDeleteRow = useCallback(
		sale => {
			// actions.selectProduct(product);
			setDeleteOpen(true);
		},
		[setDeleteOpen]
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
						columns={columns}
						rows={sales.map(s => ({
							id: s.id,
							name: `Venta #${s.id}`,
							date: s.date,
							actions: s,
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
	sales: {
		userSales: Sale[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state.session.accountData.id,
	sales: state?.sales?.userSales,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getSales }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
