import React, { useCallback } from "react";

import AppDialog from "../../../../common/AppDialog";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Category } from "../../../../common/CategoryCombo/CategoryCombo";

type Props = {
	accountId: number;
	open: boolean;
	setOpen: Function;
	selectedCategoy?: Category;
};
const DeleteCategoryDialog = ({ accountId, open, setOpen, selectedCategoy }: Props) => {
	const deleteCategory = useCallback(
		() => selectedCategoy && console.log("selectedCategoy delete"),
		// actions
		// 	.deleteProduct(selectedProduct.product_id)
		// 	.then(() => actions.getAllProducts(accountId).then(() => setOpen(false))),
		[selectedCategoy, accountId, setOpen]
	);

	const handleOnDialogClose = useCallback(
		() => {}, //selectedCategoy && actions.deselectProduct(),
		[]
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
		selectedCategoy?: Category;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedCategoy: state?.categories?.selectedCategoy,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCategoryDialog);
