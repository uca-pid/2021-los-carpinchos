import React, { useCallback } from "react";

import { Grid } from "@material-ui/core";
import AppDialog from "../../../common/AppDialog";

import { deselectSale } from "../../../../ducks/salesReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Sale } from "../SalesScreen";
import ProductSaleTable from "./ProductSaleTable";

type Props = {
	actions: {
		deselectSale: Function;
	};
	open: boolean;
	setOpen: Function;
	accountId: number;
	selectedSale?: Sale;
};

const SaleDialog = ({ actions, accountId, open, setOpen, selectedSale }: Props) => {
	// useEffect(() => {
	// 	if (selectedProduct) {
	// 		setInput({
	// 			name: { invalid: false, value: selectedProduct.name },
	// 			price: { invalid: false, value: String(selectedProduct.price) },
	// 		});
	// 		setSelectedCategory(selectedProduct.category);
	// 	}
	// }, [selectedProduct, setInput, setSelectedCategory]);

	// const addProduct = useCallback(() => {
	// 	actions
	// 		.addNewProduct(input.name.value, parseFloat(input.price.value), selectedCategory?.id, accountId)
	// 		.then(() => {
	// 			actions.getAllProducts(accountId).then(() => {
	// 				setOpen(false);
	// 			});
	// 		});
	// }, [actions, setOpen, input, accountId]);

	// const updateProduct = useCallback(() => {
	// 	if (selectedProduct) {
	// 		const data = {
	// 			name: input.name.value !== selectedProduct.name ? input.name.value : undefined,
	// 			price: parseFloat(input.price.value) !== selectedProduct.price ? input.price.value : undefined,
	// 			categoryId:
	// 				selectedCategory?.id != selectedProduct.category.id ? selectedCategory?.id : undefined,
	// 		};
	// 		console.log(selectedProduct);
	// 		actions
	// 			.updateProduct(selectedProduct.id, data)
	// 			.then(() => actions.getAllProducts(accountId).then(() => setOpen(false)));
	// 	}
	// }, [actions, selectedProduct, input, accountId, setOpen, selectedCategory]);

	const handleOnDialogClose = useCallback(
		() => selectedSale && actions.deselectSale(),
		[actions, selectedSale]
	);

	return (
		<AppDialog
			open={open}
			// onSubmit={selectedSale ? updateProduct : addProduct}
			onDialogClose={handleOnDialogClose}
			setOpen={setOpen}
			// submitButtonDisabled={
			// 	input.price.invalid ||
			// 	input.name.invalid ||
			// 	Boolean(
			// 		selectedProduct &&
			// 			selectedProduct.name === input.name.value &&
			// 			String(selectedProduct.price) === input.price.value &&
			// 			selectedProduct.category.id === selectedCategory?.id
			// 	)
			// }
			submitButtonLabel={selectedSale ? "Actualizar" : "Crear"}
			title={selectedSale ? "Venta" : "Venta Nuevo"}
		>
			<Grid container direction="column" spacing={2}>
				<ProductSaleTable />
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
	sales: {
		selectedSale?: Sale;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedSale: state?.sales?.selectedSale,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ deselectSale }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaleDialog);
