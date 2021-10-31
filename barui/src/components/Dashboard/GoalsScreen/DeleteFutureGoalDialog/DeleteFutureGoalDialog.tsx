import React, { useCallback } from "react";

import AppDialog from "../../../common/AppDialog";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { deleteGoal, getFutureGoals, deselectGoal } from "../../../../ducks/goalsReducer";

import { Goal } from "../GoalsScreen";

type Props = {
	actions: {
		deleteGoal: Function;
		getFutureGoals: Function;
		deselectGoal: Function;
	};
	accountId: number;

	open: boolean;
	setOpen: Function;
	selectedGoal?: Goal;
};
const DeleteFutureGoalDialog = ({ actions, accountId, open, setOpen, selectedGoal }: Props) => {
	const deleteProduct = useCallback(
		() =>
			selectedGoal &&
			actions
				.deleteGoal(selectedGoal.id)
				.then(() => actions.getFutureGoals(accountId).then(() => setOpen(false))),
		[actions, selectedGoal, accountId, setOpen]
	);

	const handleOnDialogClose = useCallback(
		() => selectedGoal && actions.deselectGoal(),
		[actions, selectedGoal]
	);

	return (
		<AppDialog
			open={open}
			setOpen={setOpen}
			title="Borrar meta"
			onSubmit={deleteProduct}
			onDialogClose={handleOnDialogClose}
			submitButtonLabel="Borrar"
		>
			<Typography variant="body1">¿Queres borrar este meta?</Typography>
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
	actions: bindActionCreators({ deleteGoal, getFutureGoals, deselectGoal }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFutureGoalDialog);
