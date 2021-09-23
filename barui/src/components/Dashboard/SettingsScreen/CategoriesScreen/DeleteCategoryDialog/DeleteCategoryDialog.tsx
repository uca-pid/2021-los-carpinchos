import React, { useCallback } from "react";

import AppDialog from "../../../../common/AppDialog";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Category } from "../../../../common/CategoryCombo/CategoryCombo";
import {
	deleteCategory,
	getUserCategories,
	deselectCategory,
} from "../../../../../ducks/categoriesReducer";

type Props = {
	actions: {
		deleteCategory: Function;
		getUserCategories: Function;
		deselectCategory: Function;
	};
	accountId: number;
	open: boolean;
	setOpen: Function;
	selectedCategory?: Category;
};
const DeleteCategoryDialog = ({ actions, accountId, open, setOpen, selectedCategory }: Props) => {
	const deleteCategory = useCallback(() => {
		selectedCategory &&
			actions
				.deleteCategory(selectedCategory.id)
				.then(() => actions.getUserCategories(accountId).then(() => setOpen(false)));
	}, [actions, selectedCategory, setOpen]);

	const handleOnDialogClose = useCallback(
		() => selectedCategory && actions.deselectCategory(),
		[selectedCategory, actions]
	);

	return (
		<AppDialog
			open={open}
			setOpen={setOpen}
			title="Borrar Categoía"
			onSubmit={deleteCategory}
			onDialogClose={handleOnDialogClose}
			submitButtonLabel="Borrar"
		>
			<Typography variant="body1">¿Queres borrar esta categoría?</Typography>
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
	actions: bindActionCreators({ deleteCategory, getUserCategories, deselectCategory }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCategoryDialog);
