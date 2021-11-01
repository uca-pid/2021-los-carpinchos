import React, { useCallback, useState, useEffect } from "react";

import { Grid, InputAdornment, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DatePicker } from "@material-ui/pickers";

import AppDialog from "../../../common/AppDialog";
import CategoryGoalTableRow from "./CategoryGoalTableRow";
import GoalInputForm from "./GoalInputForm";

import {
	deselectGoal,
	addNewGoal,
	getFutureGoals,
	updateGoal,
	deleteGoalCategory,
} from "../../../../ducks/goalsReducer";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import styles from "./styles";

import moment from "moment";
import TextFieldWithValidation from "../../../common/TextFieldWithValidation";
import { numericSetting, settings } from "../../../SignUp/validationSettings";
import { Goal, CategoryGoal } from "../GoalsScreen";
import { Category } from "../../../common/CategoryCombo/CategoryCombo";

type Props = {
	actions: {
		deselectGoal: Function;
		addNewGoal: Function;
		getFutureGoals: Function;
		updateGoal: Function;
		deleteGoalCategory: Function;
	};
	open: boolean;
	setOpen: Function;
	selectedGoal?: Goal;
	futureGoals?: Goal[];
	categories: Category[];
	accountId: number;
};

const GoalDialog = ({
	accountId,
	actions,
	open,
	setOpen,
	selectedGoal,
	futureGoals,
	categories,
}: Props) => {
	const [categoriesGoal, setCategoriesGoal] = useState<CategoryGoal[]>([]);
	const [date, setDate] = useState<Date | null>(null);
	const [globalGoal, setGlobalGoal] = useState("");

	const classes = styles();

	useEffect(() => {
		if (selectedGoal) {
			setDate(moment(`1/${selectedGoal.month}/${selectedGoal.year}`, "D/M/YYYY").toDate());
			setGlobalGoal(selectedGoal.incomeGoal.toString());
		}
	}, [selectedGoal]);

	const handleDateChange = useCallback(date => setDate(date), []);

	const handleOnDialogClose = useCallback(() => {
		setCategoriesGoal([]);
		setDate(null);
		setGlobalGoal("");
		selectedGoal && actions.deselectGoal();
	}, [actions, selectedGoal]);

	const createGoal = useCallback(() => {
		actions
			.addNewGoal(
				accountId,
				globalGoal,
				categoriesGoal.map(p => ({
					categoryId: p.category.id,
					categoryIncomeGoal: p.categoryIncomeGoal,
				})),
				date
			)
			.then(() => {
				actions.getFutureGoals(accountId).then(() => {
					setOpen(false);
					setCategoriesGoal([]);
					setDate(null);
					setGlobalGoal("");
				});
			});
	}, [actions, setOpen, accountId, categoriesGoal, date, globalGoal]);

	// NEW SALE
	const addCategoryToNewGoal = useCallback(
		(categoryGoal: CategoryGoal) => setCategoriesGoal(prev => [...prev, categoryGoal]),
		[setCategoriesGoal]
	);

	const handleUpdateRowFromNewGoal = useCallback((categoryGoal: CategoryGoal) => {
		setCategoriesGoal(prev =>
			prev.map(p => (p.category.id === categoryGoal.category.id ? categoryGoal : p))
		);
	}, []);

	const handleDeleteRowFromNewGoal = useCallback((categoryGoal: CategoryGoal) => {
		setCategoriesGoal(prev => prev.filter(p => p.category.id !== categoryGoal.category.id));
	}, []);

	// EXISTING SALE
	const handleUpdateRowFromExistingGoal = useCallback(
		(categoryGoal: CategoryGoal) =>
			actions
				.updateGoal(selectedGoal?.id, {
					categoryId: categoryGoal.category.id,
					categoryIncomeGoal: categoryGoal.categoryIncomeGoal,
				})
				.then(() => actions.getFutureGoals(accountId)),
		[actions, selectedGoal, accountId]
	);

	const handleDeleteRowFromExistingGoal = useCallback(
		(categoryGoal: CategoryGoal) => {
			actions.deleteGoalCategory(categoryGoal.idGoalCategory).then(() => {
				actions.getFutureGoals(accountId);
			});
		},
		[actions, accountId]
	);

	const handleChangeGlobalGoal = useCallback(
		value => {
			setGlobalGoal(value);
			selectedGoal &&
				actions
					.updateGoal(selectedGoal?.id, {
						incomeGoal: value,
					})
					.then(() => actions.getFutureGoals(accountId));
		},
		[setGlobalGoal, selectedGoal, accountId, actions]
	);

	const goalExists = futureGoals?.some(
		p =>
			p.month === parseInt(moment(date).format("M")) &&
			p.year === parseInt(moment(date).format("YYYY"))
	);

	const isPastGoal =
		selectedGoal &&
		moment(`1/${selectedGoal.month}/${selectedGoal.year}`, "D/M/YYYY").isBefore(moment());

	return (
		<AppDialog
			open={open}
			onSubmit={createGoal}
			onDialogClose={handleOnDialogClose}
			setOpen={setOpen}
			submitButtonDisabled={categoriesGoal.length === 0 || goalExists}
			submitButtonLabel={"Crear"}
			title={
				selectedGoal
					? `Meta ${moment(selectedGoal.month, "M").format("MMMM")} - ${selectedGoal.year} (${
							isPastGoal ? "Terminada" : "Meta futura"
					  })`
					: "Meta Nuevo"
			}
			hideActions={Boolean(selectedGoal)}
		>
			<Grid container direction="column" spacing={2}>
				<Grid item xs>
					<DatePicker
						//className={classes.textField}
						views={["year", "month"]}
						openTo="month"
						label="Periodo"
						value={date}
						onChange={handleDateChange}
						minDate={moment().add(1, "month").toDate()}
						disabled={Boolean(selectedGoal)}
						minDateMessage=""
						maxDateMessage=""
					/>

					{!selectedGoal && goalExists && (
						<Typography color="error" variant="subtitle2">
							Ya existe una meta para este periodo
						</Typography>
					)}
				</Grid>
				<Grid item xs>
					<TextFieldWithValidation
						label="Objetivo"
						// className={classes.textField}
						placeholder="Ingresar objetivo de la meta"
						value={globalGoal}
						onChange={handleChangeGlobalGoal}
						required
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						settings={[...settings, numericSetting]}
						disabled={isPastGoal}
					/>
				</Grid>
				<Grid item xs>
					{!isPastGoal && !selectedGoal && (
						<GoalInputForm
							categories={categories.filter(
								item => categoriesGoal.findIndex(x => x.category.id === item.id) === -1
							)}
							onAdd={selectedGoal ? undefined : addCategoryToNewGoal}
						/>
					)}
				</Grid>
				{(selectedGoal ? selectedGoal.incomesByCategory : categoriesGoal).length > 0 && (
					<Grid item xs>
						<TableContainer component={Paper} variant="outlined" className={classes.table}>
							<Table stickyHeader size="small">
								<TableHead>
									<TableRow>
										<TableCell>Producto</TableCell>
										<TableCell align="center">Objetivo</TableCell>
										{!isPastGoal && <TableCell align="right">Acciones</TableCell>}
									</TableRow>
								</TableHead>
								<TableBody>
									{(selectedGoal ? selectedGoal.incomesByCategory : categoriesGoal).map(
										(row: CategoryGoal) => {
											return (
												<CategoryGoalTableRow
													key={row.category.id}
													row={row}
													categories={categories}
													onSave={selectedGoal ? handleUpdateRowFromExistingGoal : handleUpdateRowFromNewGoal}
													onDelete={selectedGoal ? handleDeleteRowFromExistingGoal : handleDeleteRowFromNewGoal}
													disableActions={isPastGoal}
												/>
											);
										}
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				)}
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
	goals: {
		selectedGoal?: Goal;
		futureGoals: Goal[];
	};
	categories: {
		staticCategories: Category[];
		userCategories: Category[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	selectedGoal: state?.goals?.selectedGoal,
	futureGoals: state?.goals?.futureGoals,
	categories: [...state?.categories?.staticCategories, ...state?.categories?.userCategories],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{ deselectGoal, addNewGoal, getFutureGoals, updateGoal, deleteGoalCategory },
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalDialog);
