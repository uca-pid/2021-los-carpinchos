import React, { useCallback, useState, useEffect } from "react";

import { ProductSale, Sale } from "../SalesScreen";
import { Product } from "../../ProductsScreen/ProductsScreen";

import { Grid, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";

import AppDialog from "../../../common/AppDialog";
import ProductSaleTableRow from "./ProductSaleTableRow";
import SaleInputForm from "./SaleInputForm";

import {
	deselectSale,
	addNewSale,
	getSales,
	updateSale,
	deleteSaleProduct,
} from "../../../../ducks/salesReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import styles from "./styles";

import moment from "moment";

type Props = {
	actions: {
		deselectSale: Function;
		addNewSale: Function;
		getSales: Function;
		updateSale: Function;
		deleteSaleProduct: Function;
	};
	open: boolean;
	setOpen: Function;
	selectedSale?: Sale;
	products: Product[];
	accountId: number;
};

const SaleDialog = ({ accountId, actions, open, setOpen, selectedSale, products }: Props) => {
	const [productsSale, setProductsSale] = useState<ProductSale[]>([]);
	const [date, setDate] = useState(new Date());

	const classes = styles();

	useEffect(() => {
		selectedSale && setDate(selectedSale.creationDate);
	}, [selectedSale]);

	const handleOnDialogClose = useCallback(() => {
		setProductsSale([]);
		selectedSale && actions.deselectSale();
	}, [actions, selectedSale]);

	const createSale = useCallback(() => {
		actions
			.addNewSale(
				accountId,
				productsSale.map(p => ({ productId: p.product.id, amount: p.amount })),
				date
			)
			.then(() => {
				actions.getSales(accountId).then(() => {
					setOpen(false);
					setProductsSale([]);
					setDate(new Date());
				});
			});
	}, [actions, setOpen, accountId, productsSale, date]);

	const calculateTotalSum = useCallback(() => {
		let ps = selectedSale ? selectedSale.productsSale : productsSale;

		let sum = 0;
		ps.forEach(element => {
			sum += element.product.price * element.amount;
		});
		return sum;
	}, [selectedSale, productsSale]);

	// NEW SALE
	const addProductToNewSale = useCallback(
		(productSale: ProductSale) => setProductsSale(prev => [...prev, productSale]),
		[setProductsSale]
	);

	const handleUpdateRowFromNewSale = useCallback((productSale: ProductSale) => {
		setProductsSale(prev =>
			prev.map(p => (p.product.id === productSale.product.id ? productSale : p))
		);
	}, []);

	const handleDeleteRowFromNewSale = useCallback((productSale: ProductSale) => {
		setProductsSale(prev => prev.filter(p => p.product.id !== productSale.product.id));
	}, []);

	// EXISTING SALE
	const addProductToExistingSale = useCallback(
		(productSale: ProductSale) => console.log(`addProductToExistingSale: ${productSale}`),
		[]
	);

	const handleUpdateRowFromExistingSale = useCallback(
		(productSale: ProductSale) =>
			actions
				.updateSale(selectedSale?.id, {
					amount: productSale.amount,
					productId: productSale.product.id,
				})
				.then(() => actions.getSales(accountId)),
		[actions, selectedSale, accountId]
	);

	const handleUpdateDate = useCallback(
		newDate => {
			if (selectedSale) {
				moment(newDate)
					.startOf("day")
					.diff(moment(selectedSale?.creationDate).startOf("day"), "days") !== 0 &&
					actions
						.updateSale(selectedSale?.id, {
							creation_date: moment(newDate).format("DD/MM/YY HH:mm:ss"),
						})
						.then(() => actions.getSales(accountId));
			} else {
				setDate(newDate);
			}
		},
		[actions, selectedSale, accountId]
	);

	const handleDateChange = useCallback(
		date => {
			setDate(date);
			handleUpdateDate(date);
		},
		[handleUpdateDate]
	);

	const handleDeleteRowFromExistingSale = useCallback(
		(productSale: ProductSale) => {
			actions.deleteSaleProduct(productSale.id).then(() => {
				actions.getSales(accountId);
			});
		},
		[actions, accountId]
	);

	return (
		<AppDialog
			open={open}
			onSubmit={createSale}
			onDialogClose={handleOnDialogClose}
			setOpen={setOpen}
			submitButtonDisabled={productsSale.length === 0}
			submitButtonLabel={"Crear"}
			title={selectedSale ? `Venta #${selectedSale.id}` : "Venta Nuevo"}
			hideActions={Boolean(selectedSale)}
		>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<DatePicker
						variant="dialog"
						label="Fecha"
						format="D [de] MMMM [de] yyyy"
						value={date}
						onChange={handleDateChange}
					/>
				</Grid>
				{!selectedSale && (
					<Grid item xs>
						<SaleInputForm
							products={products.filter(
								item => productsSale.findIndex(x => x.product.id === item.id) === -1
							)}
							onAdd={addProductToNewSale}
						/>
					</Grid>
				)}
				{(selectedSale ? selectedSale.productsSale : productsSale).length > 0 && (
					<Grid item xs>
						<TableContainer component={Paper} variant="outlined" className={classes.table}>
							<Table stickyHeader size="small">
								<TableHead>
									<TableRow>
										<TableCell>Producto</TableCell>
										<TableCell>Cantidad</TableCell>
										<TableCell align="center">Subtotal</TableCell>
										<TableCell align="right">Acciones</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{(selectedSale ? selectedSale.productsSale : productsSale).map((row: ProductSale) => {
										return (
											<ProductSaleTableRow
												key={row.id}
												row={row}
												products={products}
												onSave={selectedSale ? handleUpdateRowFromExistingSale : handleUpdateRowFromNewSale}
												onDelete={selectedSale ? handleDeleteRowFromExistingSale : handleDeleteRowFromNewSale}
											/>
										);
									})}
									<TableRow>
										<TableCell>
											<Typography variant="h6">TOTAL</Typography>
										</TableCell>
										<TableCell></TableCell>
										<TableCell align="center">
											<Typography variant="h6">{`$ ${calculateTotalSum()}`}</Typography>
										</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				)}
			</Grid>
		</AppDialog>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	sales: {
		selectedSale?: Sale;
	};
	products: {
		userProducts: Product[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedSale: state?.sales?.selectedSale,
	products: state?.products?.userProducts,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{ deselectSale, addNewSale, getSales, updateSale, deleteSaleProduct },
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleDialog);
