import React, { useState, useCallback } from "react";

import { Grid } from "@material-ui/core";
import AppDialog from "../../../common/AppDialog";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Goal } from "../GoalsScreen";

type Props = {
	open: boolean;
	setOpen: Function;
	accountId: number;
	selectedGoal?: Goal;
};

const ProductDialog = ({ accountId, open, setOpen, selectedGoal }: Props) => {
	const [input, setInput] = useState({
		name: { invalid: true, value: "" },
		price: { invalid: true, value: "" },
	});

	const addProduct = useCallback(() => {
		// actions
		// 	.addNewProduct(input.name.value, parseFloat(input.price.value), selectedCategory?.id, accountId)
		// 	.then(() => {
		// 		actions.getAllProducts(accountId).then(() => {
		// 			setOpen(false);
		// 		});
		// 	});
	}, [setOpen, input, accountId]);

	const handleOnDialogClose = useCallback(
		() => {}, //selectedProduct && actions.deselectProduct(),
		[selectedGoal]
	);

	return (
		<AppDialog
			open={open}
			onSubmit={addProduct}
			onDialogClose={handleOnDialogClose}
			setOpen={setOpen}
			submitButtonLabel={selectedGoal ? "Actualizar" : "Crear"}
			title={selectedGoal ? "Meta" : "Nueva Meta"}
		>
			<Grid container direction="column" spacing={2}></Grid>
		</AppDialog>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	goals: {
		selectedGoal?: Goal;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedGoal: state?.goals?.selectedGoal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDialog);
