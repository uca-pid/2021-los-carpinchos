import React, { useCallback } from "react";

import AppDialog from "../../../common/AppDialog";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllProducts, deleteProduct, deselectProduct } from "../../../../ducks/productsReducer";
import { Product } from "../ProductsScreen";

type Props = {
	actions: {
		getAllProducts: Function;
		deleteProduct: Function;
		deselectProduct: Function;
	};
	accountId: number;

	open: boolean;
	setOpen: Function;
	selectedProduct?: Product;
};
const DeleteProductDialog = ({ actions, accountId, open, setOpen, selectedProduct }: Props) => {
	const deleteProduct = useCallback(
		() =>
			selectedProduct &&
			actions
				.deleteProduct(selectedProduct.product_id)
				.then(() => actions.getAllProducts(accountId).then(() => setOpen(false))),
		[actions, selectedProduct, accountId, setOpen]
	);

	const handleOnDialogClose = useCallback(
		() => selectedProduct && actions.deselectProduct(),
		[actions, selectedProduct]
	);

	return (
		<AppDialog
			open={open}
			setOpen={setOpen}
			title="Borrar producto"
			onSubmit={deleteProduct}
			onDialogClose={handleOnDialogClose}
			submitButtonLabel="Borrar"
		>
			<Typography variant="body1">¿Queres borrar este producto?</Typography>
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
		selectedProduct?: Product;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedProduct: state?.products?.selectedProduct,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getAllProducts, deleteProduct, deselectProduct }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProductDialog);
