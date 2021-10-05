import React, { useCallback } from "react";

import AppDialog from "../../../common/AppDialog";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getSales, deleteSale, deselectSale } from "../../../../ducks/salesReducer";
import { Sale } from "../SalesScreen";

type Props = {
	actions: {
		getSales: Function;
		deleteSale: Function;
		deselectSale: Function;
	};
	accountId: number;

	open: boolean;
	setOpen: Function;
	selectedSale?: Sale;
};

const DeleteSaleDialog = ({ actions, accountId, open, setOpen, selectedSale }: Props) => {
	const deleteProduct = useCallback(
		() =>
			selectedSale &&
			actions
				.deleteSale(selectedSale.id)
				.then(() => actions.getSales(accountId).then(() => setOpen(false))),
		[actions, selectedSale, accountId, setOpen]
	);

	const handleOnDialogClose = useCallback(
		() => selectedSale && actions.deselectSale(),
		[actions, selectedSale]
	);

	return (
		<AppDialog
			open={open}
			setOpen={setOpen}
			title={`Borrar venta #${selectedSale ? selectedSale.id : "#"}`}
			onSubmit={deleteProduct}
			onDialogClose={handleOnDialogClose}
			submitButtonLabel="Borrar"
		>
			<Typography variant="body1">¿Queres borrar esta venta?</Typography>
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
	actions: bindActionCreators({ getSales, deleteSale, deselectSale }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSaleDialog);
