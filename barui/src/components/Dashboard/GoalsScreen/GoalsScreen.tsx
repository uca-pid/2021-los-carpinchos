import React, { useState, useCallback, useEffect } from "react";

import DataTable from "../../common/DataTable";
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
	selectGoal,
	getFutureGoals,
	getPastGoals,
	getCurrentGoal,
} from "../../../ducks/goalsReducer";
import { getStaticCategories, getUserCategories } from "../../../ducks/categoriesReducer";

import GoalDialog from "./GoalDialog";
import DeleteFutureGoalDialog from "./DeleteFutureGoalDialog";
import AddIcon from "@material-ui/icons/Add";

import { GridColDef } from "@mui/x-data-grid";
import { Category } from "../../common/CategoryCombo/CategoryCombo";
import moment from "moment";
import CurrentGoalPanel from "../../common/CurrentGoalPanel";

export type CategoryGoal = {
	idGoalCategory: number;
	category: Category;
	categoryIncomeGoal: number;
	totalCategoryIncome: number;
};

export type Goal = {
	id: number;
	incomeGoal: number;
	month: number;
	year: number;
	incomesByCategory: Array<CategoryGoal>;
};

type Props = {
	actions: {
		selectGoal: Function;
		getPastGoals: Function;
		getFutureGoals: Function;
		getStaticCategories: Function;
		getUserCategories: Function;
		getCurrentGoal: Function;
	};
	futureGoals: Goal[];
	pastGoals: Goal[];
	id: number;
};

const GoalsScreen = ({ actions, futureGoals, pastGoals, id }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Nombre meta", flex: 1 },
		{ field: "goalIncome", headerName: "Objetivo", flex: 1 },
	];

	useEffect(() => {
		if (id) {
			actions.getFutureGoals(id);
			actions.getPastGoals(id);
			actions.getCurrentGoal(id);
		}
	}, [actions, id]);

	useEffect(() => {
		actions.getStaticCategories();
		actions.getUserCategories(id);
	}, [actions, id]);

	const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);

	const handleEditRow = useCallback(
		goal => {
			actions.selectGoal(goal);
			setOpen(true);
		},
		[actions, setOpen]
	);

	const handleDeleteRow = useCallback(
		goal => {
			actions.selectGoal(goal);
			setDeleteOpen(true);
		},
		[actions]
	);

	return (
		<Container maxWidth="md">
			<GoalDialog open={open} setOpen={setOpen} />

			<DeleteFutureGoalDialog open={deleteOpen} setOpen={setDeleteOpen} />

			<Grid container direction="column" spacing={3}>
				<Grid item xs>
					<CurrentGoalPanel variant="outlined" transparent />
				</Grid>
				<Grid alignItems="center" container item>
					<Grid item xs>
						<Typography variant="h5" color="primary">
							Metas Futuras
						</Typography>
					</Grid>
					<Grid item>
						<Button
							color="secondary"
							onClick={handleOpenDialog}
							variant="contained"
							startIcon={<AddIcon />}
						>
							Crear
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<DataTable
						columns={columns}
						rows={futureGoals.map(p => ({
							id: p.id,
							name: `Meta ${moment(p.month, "M").format("MMMM")} ${p.year}`,
							goalIncome: `$ ${p.incomeGoal}`,
							actions: p,
						}))}
						onEditRow={handleEditRow}
						onDeleteRow={handleDeleteRow}
					/>
				</Grid>
				<Grid item xs>
					<Typography variant="h5" color="primary">
						Metas Pasadas
					</Typography>
				</Grid>
				<Grid item>
					<DataTable
						columns={columns}
						rows={pastGoals.map(p => ({
							id: p.id,
							name: `Meta ${moment(p.month, "M").format("MMMM")} ${p.year}`,
							goalIncome: `$ ${p.incomeGoal}`,
							actions: p,
						}))}
						onEditRow={handleEditRow}
						watchMode={true}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	goals: {
		futureGoals: Goal[];
		pastGoals: Goal[];
	};
};

const mapStateToProps = (state: State) => ({
	futureGoals: state?.goals?.futureGoals,
	pastGoals: state?.goals?.pastGoals,
	id: state?.session?.accountData?.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			selectGoal,
			getFutureGoals,
			getPastGoals,
			getStaticCategories,
			getUserCategories,
			getCurrentGoal,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsScreen);
