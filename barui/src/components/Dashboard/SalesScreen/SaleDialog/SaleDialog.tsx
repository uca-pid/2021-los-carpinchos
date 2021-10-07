import React, { useCallback, useState } from "react";

import AppDialog from "../../../common/AppDialog";

import { deselectSale, addNewSale, getSales, updateSale } from "../../../../ducks/salesReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { ProductSale, Sale } from "../SalesScreen";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProductSaleTableRow from "./ProductSaleTableRow";

import styles from "./styles";
import { Product } from "../../ProductsScreen/ProductsScreen";
import moment from "moment";

type Props = {
	actions: {
		deselectSale: Function;
		addNewSale: Function;
		getSales: Function;
		updateSale: Function;
	};
	open: boolean;
	setOpen: Function;
	selectedSale?: Sale;
	products: Product[];
	accountId: number;
};

const SaleDialog = ({ accountId, actions, open, setOpen, selectedSale, products }: Props) => {
	const [productsSale, setProductsSale] = useState<ProductSale[]>([]);

	const classes = styles();

	const handleOnDialogClose = useCallback(() => {
		setProductsSale([]);
		selectedSale && actions.deselectSale();
	}, [actions, selectedSale]);

	const createSale = useCallback(() => {
		actions
			.addNewSale(
				accountId,
				productsSale.map(p => ({ productId: p.product.id, amount: p.amount }))
			)
			.then(() => {
				actions.getSales(accountId).then(() => {
					setOpen(false);
					setProductsSale([]);
				});
			});
	}, [actions, setOpen, accountId, productsSale]);

	const total = useCallback(() => {
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

	const handleDeleteRowFromNewSale = useCallback((product: Product) => {
		setProductsSale(prev => prev.filter(p => p.product.id !== product.id));
	}, []);

	// EXISTING SALE
	const addProductToExistingSale = useCallback(
		(productSale: ProductSale) => console.log(`addProductToExistingSale: ${productSale}`),
		[]
	);

	const handleUpdateRowFromExistingSale = useCallback(
		(productSale: ProductSale) =>
			actions.updateSale(selectedSale?.id, {
				creation_date: moment().format("DD/MM/YY HH:mm:ss"),
				amount: productSale.amount,
				productId: productSale.product.id,
			}),
		[actions, selectedSale]
	);

	const handleDeleteRowFromExistingSale = useCallback(
		(productSale: ProductSale) => console.log(`handleDeleteRowFromExistingSale: ${productSale}`),
		[]
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
			<TableContainer component={Paper} variant="outlined" className={classes.table}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Producto</TableCell>
							<TableCell>Cantidad</TableCell>
							<TableCell align="center">Subtotal</TableCell>
							<TableCell align="right">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<ProductSaleTableRow
							onSave={selectedSale ? addProductToExistingSale : addProductToNewSale}
							products={products.filter(
								item => productsSale.findIndex(x => x.product.id === item.id) === -1
							)}
						/>
						{(selectedSale ? selectedSale.productsSale : productsSale).map((row: ProductSale) => {
							return (
								<ProductSaleTableRow
									key={row.product.id}
									row={row}
									products={products}
									onSave={selectedSale ? handleUpdateRowFromExistingSale : handleUpdateRowFromNewSale}
									onDelete={selectedSale ? handleDeleteRowFromExistingSale : handleDeleteRowFromNewSale}
								/>
							);
						})}
						<TableRow>
							<TableCell>TOTAL</TableCell>
							<TableCell></TableCell>
							<TableCell align="center">{`$ ${total()}`}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
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
	actions: bindActionCreators({ deselectSale, addNewSale, getSales, updateSale }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleDialog);
