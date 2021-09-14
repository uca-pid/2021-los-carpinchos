import React, { useState, useCallback, useEffect } from "react";

import { Grid, InputAdornment } from "@material-ui/core";
import DataDialog from "../../../common/DataDialog";

import TextFieldWithValidation from "../../../common/TextFieldWithValidation";

import styles from "./styles";
import { numericSetting, settings } from "../../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllProducts, addNewProduct, selectProduct } from "../../../../ducks/productsReducer";
import { Product } from "../ProductsScreen";

type Props = {
	actions: {
		getAllProducts: Function;
		addNewProduct: Function;
	};
	open: boolean;
	setOpen: Function;
	accountId: number;
	selectedProduct?: Product;
};

const ProductDialog = ({ actions, accountId, open, setOpen, selectedProduct }: Props) => {
	const [input, setInput] = useState({
		productName: { invalid: true, value: "" },
		price: { invalid: true, value: "" },
	});
	const classes = styles();

	useEffect(() => {
		setInput({
			productName: { invalid: true, value: "" },
			price: { invalid: true, value: "" },
		});
	}, [open, accountId, setInput]);

	useEffect(() => {
		setInput({
			productName: { invalid: true, value: selectedProduct?.name ?? "" },
			price: { invalid: true, value: String(selectedProduct?.price) ?? "" },
		});
	}, [selectedProduct]);

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, productName: { value, invalid } })),
		[setInput]
	);

	const handleChangePrice = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, price: { value, invalid } })),
		[setInput]
	);

	const addProduct = useCallback(() => {
		actions
			.addNewProduct(input.productName.value, parseFloat(input.price.value), accountId)
			.then(() => {
				actions.getAllProducts(accountId).then(() => {
					setOpen(false);
				});
			});
	}, [actions, setOpen, input, accountId]);

	const handleEnterPress = useCallback(
		() => !input.price.invalid && !input.productName.invalid && addProduct(),
		[addProduct, input]
	);

	return (
		<DataDialog
			open={open}
			onSubmit={addProduct}
			setOpen={setOpen}
			submitButtonDisabled={input.price.invalid || input.productName.invalid}
			submitButtonLabel="Agregar"
			title="Producto Nuevo"
		>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<TextFieldWithValidation
						className={classes.textField}
						label="Nombre del producto"
						placeholder="Ingresar nombre del producto"
						value={input.productName.value}
						onChange={handleChangeName}
						required
						settings={settings}
					/>
				</Grid>
				<Grid item xs>
					<TextFieldWithValidation
						className={classes.textField}
						label="Precio"
						placeholder="Ingresar precio del producto"
						value={input.price.value}
						onChange={handleChangePrice}
						onEnterPress={handleEnterPress}
						required
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						settings={[...settings, numericSetting]}
					/>
				</Grid>
			</Grid>
		</DataDialog>
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
		selectedProduct?: Product;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedProduct: state?.products?.selectedProduct,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ addNewProduct, getAllProducts }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDialog);
