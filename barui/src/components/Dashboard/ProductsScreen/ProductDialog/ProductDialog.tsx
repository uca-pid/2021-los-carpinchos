import React, { useState, useCallback, useEffect } from "react";

import { Grid, InputAdornment } from "@material-ui/core";
import AppDialog from "../../../common/AppDialog";

import TextFieldWithValidation from "../../../common/TextFieldWithValidation";

import styles from "./styles";
import { numericSetting, settings } from "../../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllProducts, addNewProduct, updateProduct } from "../../../../ducks/productsReducer";
import { Product } from "../ProductsScreen";
import CategoryCombo from "../../../common/CategoryCombo";

type Props = {
	actions: {
		getAllProducts: Function;
		addNewProduct: Function;
		updateProduct: Function;
	};
	open: boolean;
	setOpen: Function;
	accountId: number;
	selectedProduct?: Product;
};

const ProductDialog = ({ actions, accountId, open, setOpen, selectedProduct }: Props) => {
	const [input, setInput] = useState({
		name: { invalid: true, value: "" },
		price: { invalid: true, value: "" },
	});
	const classes = styles();

	useEffect(() => {
		setInput({
			name: { invalid: true, value: "" },
			price: { invalid: true, value: "" },
		});
	}, [open, accountId, setInput]);

	useEffect(() => {
		selectedProduct &&
			setInput({
				name: { invalid: false, value: selectedProduct.name },
				price: { invalid: false, value: String(selectedProduct.price) },
			});
	}, [selectedProduct]);

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, name: { value, invalid } })),
		[setInput]
	);

	const handleChangePrice = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, price: { value, invalid } })),
		[setInput]
	);

	const addProduct = useCallback(() => {
		actions.addNewProduct(input.name.value, parseFloat(input.price.value), accountId).then(() => {
			actions.getAllProducts(accountId).then(() => {
				setOpen(false);
			});
		});
	}, [actions, setOpen, input, accountId]);

	const updateProduct = useCallback(() => {
		if (selectedProduct) {
			const data = {
				name: input.name.value !== selectedProduct.name ? input.name.value : undefined,
				price: parseFloat(input.price.value) !== selectedProduct.price ? input.price.value : undefined,
			};
			actions.updateProduct(selectedProduct.id, data);
		}
	}, [actions, selectedProduct, input]);

	const handleEnterPress = useCallback(
		() => !input.price.invalid && !input.name.invalid && addProduct(),
		[addProduct, input]
	);

	return (
		<AppDialog
			open={open}
			onSubmit={selectedProduct ? updateProduct : addProduct}
			setOpen={setOpen}
			submitButtonDisabled={
				input.price.invalid ||
				input.name.invalid ||
				Boolean(
					selectedProduct &&
						selectedProduct.name === input.name.value &&
						String(selectedProduct.price) === input.price.value
				)
			}
			submitButtonLabel="Agregar"
			title="Producto Nuevo"
		>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<TextFieldWithValidation
						className={classes.textField}
						label="Nombre del producto"
						placeholder="Ingresar nombre del producto"
						value={input.name.value}
						onChange={handleChangeName}
						required
						settings={settings}
					/>
				</Grid>
				<Grid item xs>
					<CategoryCombo />
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
		</AppDialog>
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
	actions: bindActionCreators({ addNewProduct, getAllProducts, updateProduct }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDialog);
