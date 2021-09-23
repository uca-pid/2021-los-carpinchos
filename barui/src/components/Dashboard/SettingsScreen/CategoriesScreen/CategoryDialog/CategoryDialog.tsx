import React, { useState, useCallback, useEffect } from "react";

import { Grid, InputAdornment } from "@material-ui/core";
import AppDialog from "../../../../common/AppDialog";

import TextFieldWithValidation from "../../../../common/TextFieldWithValidation";

// import styles from "./styles";
import { numericSetting, settings } from "../../../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
	addNewCategory,
	getUserCategories,
	updateCategory,
	deselectCategory,
} from "../../../../../ducks/categoriesReducer";
import { Category } from "../../../../common/CategoryCombo/CategoryCombo";

type Props = {
	actions: {
		addNewCategory: Function;
		getUserCategories: Function;
		updateCategory: Function;
		deselectCategory: Function;
	};
	open: boolean;
	setOpen: Function;
	accountId: number;
	selectedCategory?: Category;
};

const CategoryDialog = ({ actions, accountId, open, setOpen, selectedCategory }: Props) => {
	const [input, setInput] = useState({
		name: { invalid: true, value: "" },
	});

	// const classes = styles();

	useEffect(() => {
		setInput({
			name: { invalid: true, value: "" },
		});
	}, [open, accountId, setInput]);

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, name: { value, invalid } })),
		[setInput]
	);

	const addProduct = useCallback(() => {
		// selectedCategory &&
		// 	actions
		// 		.addNewProduct(
		// 			input.name.value,
		// 			parseFloat(input.price.value),
		// 			selectedCategory.category_id,
		// 			accountId
		// 		)
		// 		.then(() => {
		// 			actions.getAllProducts(accountId).then(() => {
		// 				setOpen(false);
		// 			});
		// 		});
	}, []);

	const updateProduct = useCallback(() => {
		// if (selectedProduct) {
		// 	const data = {
		// 		name: input.name.value !== selectedProduct.name ? input.name.value : undefined,
		// 		price: parseFloat(input.price.value) !== selectedProduct.price ? input.price.value : undefined,
		// 		category:
		// 			selectedCategory?.category_id != selectedProduct.category_id
		// 				? selectedCategory?.category_id
		// 				: undefined,
		// 	};
		// 	console.log(selectedProduct);
		// 	actions
		// 		.updateProduct(selectedProduct.product_id, data)
		// 		.then(() => actions.getAllProducts(accountId).then(() => setOpen(false)));
		// }
	}, []);

	const handleOnDialogClose = useCallback(
		() => selectedCategory && actions.deselectCategory(),
		[actions, selectedCategory]
	);

	return (
		<AppDialog
			open={open}
			onSubmit={selectedCategory ? updateProduct : addProduct}
			onDialogClose={handleOnDialogClose}
			setOpen={setOpen}
			submitButtonDisabled={
				input.name.invalid || Boolean(selectedCategory && selectedCategory.name === input.name.value)
			}
			submitButtonLabel={selectedCategory ? "Actualizar" : "Crear"}
			title="Cat Nuevo"
		>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<TextFieldWithValidation
						// className={classes.textField}
						label="Nombre de la categoía"
						placeholder="Ingresar nombre del categoría"
						value={input.name.value}
						onChange={handleChangeName}
						required
						settings={settings}
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
	categories: {
		selectedCategory?: Category;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedCategory: state?.categories?.selectedCategory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{ addNewCategory, getUserCategories, updateCategory, deselectCategory },
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDialog);
