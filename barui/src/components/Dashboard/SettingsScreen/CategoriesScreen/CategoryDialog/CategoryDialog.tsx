import React, { useState, useCallback, useEffect } from "react";

import { Grid } from "@material-ui/core";
import AppDialog from "../../../../common/AppDialog";

import TextFieldWithValidation from "../../../../common/TextFieldWithValidation";

import styles from "./styles";
import { settings } from "../../../../SignUp/validationSettings";

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

	const classes = styles();

	useEffect(() => {
		setInput({
			name: { invalid: true, value: "" },
		});
	}, [open, accountId, setInput]);

	useEffect(() => {
		if (selectedCategory) {
			setInput({
				name: { invalid: false, value: selectedCategory.name },
			});
		}
	}, [selectedCategory, setInput]);

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, name: { value, invalid } })),
		[setInput]
	);

	const addProduct = useCallback(() => {
		actions.addNewCategory(input.name.value, accountId).then(() => {
			actions.getUserCategories(accountId).then(() => {
				setOpen(false);
			});
		});
	}, [actions, accountId, setOpen, input]);

	const updateProduct = useCallback(() => {
		if (selectedCategory) {
			const data = {
				category_name: input.name.value !== selectedCategory.name ? input.name.value : undefined,
			};
			actions
				.updateCategory(selectedCategory.id, data)
				.then(() => actions.getUserCategories(accountId).then(() => setOpen(false)));
		}
	}, [selectedCategory, actions, setOpen, input, accountId]);

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
			title={selectedCategory ? "Categor??a" : "Categor??a Nueva"}
		>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<TextFieldWithValidation
						className={classes.textField}
						label="Nombre de la catego??a"
						placeholder="Ingresar nombre del categor??a"
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
