import React, { useCallback, useState } from "react";

import AppDialog from "../../../common/AppDialog";

import { deselectSale, addNewSale, getSales } from "../../../../ducks/salesReducer";
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

type Props = {
	actions: {
		deselectSale: Function;
		addNewSale: Function;
		getSales: Function;
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

	const createSale = useCallback(() => {
		actions
			.addNewSale(
				accountId,
				productsSale.map(p => ({ productId: p.product.id, amount: p.amount }))
			)
			.then(() => {
				actions.getSales(accountId).then(() => {
					setOpen(false);
				});
			});
	}, [actions, setOpen, accountId, productsSale]);

	const handleOnDialogClose = useCallback(() => {
		setProductsSale([]);
		selectedSale && actions.deselectSale();
	}, [actions, selectedSale]);

	const addProductToNewSale = useCallback(
		(productSale: ProductSale) => setProductsSale(prev => [...prev, productSale]),
		[setProductsSale]
	);

	const addProductToExistingSale = useCallback(
		(productSale: ProductSale) => console.log(`addProductToExistingSale: ${productSale}`),
		[]
	);

	const handleUpdateExistingRowFromNewSale = useCallback((productSale: ProductSale) => {
		setProductsSale(prev =>
			prev.map(p => (p.product.id === productSale.product.id ? productSale : p))
		);
	}, []);

	const handleDeleteExistingRowFromNewSale = useCallback((product: Product) => {
		setProductsSale(prev => prev.filter(p => p.product.id !== product.id));
	}, []);

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
									onSave={handleUpdateExistingRowFromNewSale}
									onDelete={handleDeleteExistingRowFromNewSale}
								/>
							);
						})}
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
	actions: bindActionCreators({ deselectSale, addNewSale, getSales }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleDialog);
