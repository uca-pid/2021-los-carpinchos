import React, { useState, useCallback, useEffect } from "react";

import { Grid, InputAdornment } from "@material-ui/core";
import AppDialog from "../../../common/AppDialog";

import TextFieldWithValidation from "../../../common/TextFieldWithValidation";

import styles from "./styles";
import { numericSetting, settings } from "../../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
	getAllProducts,
	addNewProduct,
	updateProduct,
	deselectProduct,
} from "../../../../ducks/productsReducer";
import { Product } from "../ProductsScreen";
import CategoryCombo, { Category } from "../../../common/CategoryCombo/CategoryCombo";

type Props = {
	actions: {
		getAllProducts: Function;
		addNewProduct: Function;
		updateProduct: Function;
		deselectProduct: Function;
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
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

	const classes = styles();

	useEffect(() => {
		setInput({
			name: { invalid: true, value: "" },
			price: { invalid: true, value: "" },
		});
		setSelectedCategory(null);
	}, [open, accountId, setInput]);

	useEffect(() => {
		if (selectedProduct) {
			setInput({
				name: { invalid: false, value: selectedProduct.name },
				price: { invalid: false, value: String(selectedProduct.price) },
			});
			setSelectedCategory(selectedProduct.category);
		}
	}, [selectedProduct, setInput, setSelectedCategory]);

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, name: { value, invalid } })),
		[setInput]
	);

	const handleChangePrice = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, price: { value, invalid } })),
		[setInput]
	);

	const addProduct = useCallback(() => {
		actions
			.addNewProduct(input.name.value, parseFloat(input.price.value), selectedCategory?.id, accountId)
			.then(() => {
				actions.getAllProducts(accountId).then(() => {
					setOpen(false);
				});
			});
	}, [actions, setOpen, input, accountId, selectedCategory]);

	const updateProduct = useCallback(() => {
		if (selectedProduct) {
			const data = {
				name: input.name.value !== selectedProduct.name ? input.name.value : undefined,
				price: parseFloat(input.price.value) !== selectedProduct.price ? input.price.value : undefined,
				categoryId:
					selectedCategory?.id != selectedProduct.category.id ? selectedCategory?.id : undefined,
			};
			console.log(selectedProduct);
			actions
				.updateProduct(selectedProduct.id, data)
				.then(() => actions.getAllProducts(accountId).then(() => setOpen(false)));
		}
	}, [actions, selectedProduct, input, accountId, setOpen, selectedCategory]);

	const handleOnDialogClose = useCallback(
		() => selectedProduct && actions.deselectProduct(),
		[actions, selectedProduct]
	);

	return (
		<AppDialog
			open={open}
			onSubmit={selectedProduct ? updateProduct : addProduct}
			onDialogClose={handleOnDialogClose}
			setOpen={setOpen}
			submitButtonDisabled={
				input.price.invalid ||
				input.name.invalid ||
				Boolean(
					selectedProduct &&
						selectedProduct.name === input.name.value &&
						String(selectedProduct.price) === input.price.value &&
						selectedProduct.category.id === selectedCategory?.id
				)
			}
			submitButtonLabel={selectedProduct ? "Actualizar" : "Crear"}
			title={selectedProduct ? "Producto" : "Producto Nuevo"}
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
					<CategoryCombo selectedValue={selectedCategory} setSelectedValue={setSelectedCategory} />
				</Grid>
				<Grid item xs>
					<TextFieldWithValidation
						className={classes.textField}
						label="Precio"
						placeholder="Ingresar precio del producto"
						value={input.price.value}
						onChange={handleChangePrice}
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
	actions: bindActionCreators(
		{ addNewProduct, getAllProducts, updateProduct, deselectProduct },
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDialog);
