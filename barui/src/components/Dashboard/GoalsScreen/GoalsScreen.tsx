import React, { useState, useCallback, useEffect } from "react";

import DataTable from "../../common/DataTable";
import { Button, Container, Grid, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import GoalDialog from "./GoalDialog";
import DeleteFutureGoalDialog from "./DeleteFutureGoalDialog";
import AddIcon from "@material-ui/icons/Add";

import { GridColDef } from "@mui/x-data-grid";

export type Goal = {
	id: number;
	incomeGoal: number;
	month: number;
	year: number;
	incomesByCategory: Array<{
		categoryName: string;
		categoryId: number;
		categoryIncomeGoal: number;
		totalCategoryIncome: number;
	}>;
};

type Props = {
	futureGoals: Goal[];
	id: number;
};

const GoalsScreen = ({ futureGoals, id }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const columns: GridColDef[] = [{ field: "name", headerName: "Nombre meta", flex: 1 }];

	// useEffect(() => id && actions.getAllProducts(id), [actions, id]);

	const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);

	const handleEditRow = useCallback(
		product => {
			// actions.selectGoal(product);
			setOpen(true);
		},
		[setOpen]
	);

	const handleDeleteRow = useCallback(product => {
		// actions.selectGoal(product);
		setDeleteOpen(true);
	}, []);

	return (
		<Container maxWidth="md">
			<GoalDialog open={open} setOpen={setOpen} />

			<DeleteFutureGoalDialog open={deleteOpen} setOpen={setDeleteOpen} />

			<Grid container direction="column" spacing={3}>
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
							name: `${p.month} - ${p.year}`,
							actions: p,
						}))}
						onEditRow={handleEditRow}
						onDeleteRow={handleDeleteRow}
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
	};
};

const mapStateToProps = (state: State) => ({
	futureGoals: state?.goals?.futureGoals,
	id: state?.session?.accountData?.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalsScreen);
