import React, { useCallback } from "react";

import AppDialog from "../../../common/AppDialog";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllProducts, deleteProduct } from "../../../../ducks/productsReducer";
import { Product } from "../ProductsScreen";

type Props = {
	actions: {
		getAllProducts: Function;
		deleteProduct: Function;
	};
	open: boolean;
	setOpen: Function;
	selectedProduct?: Product;
};
const DeleteProductDialog = ({ actions, open, setOpen, selectedProduct }: Props) => {
	const deleteProduct = useCallback(
		() => selectedProduct && actions.deleteProduct(selectedProduct.id),
		[actions, selectedProduct]
	);

	return (
		<AppDialog
			open={open}
			setOpen={setOpen}
			title="Borrar producto"
			onSubmit={deleteProduct}
			submitButtonLabel="Borrar"
		>
			<Typography variant="body1">¿Queres borrar este producto?</Typography>
		</AppDialog>
	);
};

type State = {
	products: {
		selectedProduct?: Product;
	};
};

const mapStateToProps = (state: State) => ({
	selectedProduct: state?.products?.selectedProduct,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getAllProducts, deleteProduct }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProductDialog);
