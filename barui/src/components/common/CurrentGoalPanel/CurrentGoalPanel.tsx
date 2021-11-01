import React, { useCallback, useEffect } from "react";

import BorderLinearProgress from "./BorderLinearProgress";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getCurrentGoal } from "../../../ducks/goalsReducer";
import { Goal } from "../../Dashboard/GoalsScreen/GoalsScreen";
import { Grid, Link, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import styles from "./styles";
import { useHistory } from "react-router-dom";

type Props = {
	actions: {
		getCurrentGoal: Function;
	};
	accountId: number;
	currentGoal: Goal;
	variant?: "outlined" | "elevation";
	transparent?: boolean;
	detailed?: boolean;
};

const CurrentGoalPanel = ({
	actions,
	accountId,
	currentGoal,
	variant = "elevation",
	transparent,
	detailed = false,
}: Props) => {
	useEffect(() => {
		accountId && actions.getCurrentGoal(accountId);
	}, [actions, accountId]);

	const history = useHistory();

	const classes = styles();

	const handleMoreDetails = useCallback(() => history.push("/dashboard/goals"), [history]);

	return (
		currentGoal && (
			<Paper
				variant={variant}
				className={`${classes.goalsCard} ${transparent ? "" : classes.background}`}
			>
				<Grid container spacing={3} direction="column">
					<Grid container item direction="row" alignItems="center" spacing={3}>
						<Grid item>
							<Typography variant="h5" color="primary">
								{`Meta en curso: ${moment(currentGoal.month, "M").format("MMMM")} ${currentGoal.year}`}
							</Typography>
						</Grid>
						{!detailed && (
							<Grid item>
								<Link onClick={handleMoreDetails}>
									<Typography className={classes.seeMoreText}>Ver más...</Typography>
								</Link>
							</Grid>
						)}
						<Grid item xs></Grid>
						<Grid item>
							<Typography variant="h5" color="primary">
								{`$${currentGoal.incomesByCategory
									.map(p => p.totalCategoryIncome)
									.reduce((a, b) => a + b)} / $${currentGoal.incomeGoal}`}
							</Typography>
						</Grid>
					</Grid>
					{detailed && (
						<Grid item xs>
							<Grid container spacing={1} direction="column">
								{currentGoal.incomesByCategory.map((ic, key) => (
									<>
										<Grid item xs>
											<Typography variant="body2">{`${ic.category.name} (objetivo: $${ic.categoryIncomeGoal})`}</Typography>
										</Grid>
										<Grid container key={`ic-${key}`} item direction="row" spacing={2} alignItems="center">
											<Grid item xs>
												<BorderLinearProgress
													variant="determinate"
													value={(ic.totalCategoryIncome / ic.categoryIncomeGoal) * 100}
												/>
											</Grid>
											<Grid item xs={1}>
												<Typography variant="body2">
													{`${((ic.totalCategoryIncome / ic.categoryIncomeGoal) * 100).toFixed(2)} %`}
												</Typography>
											</Grid>
										</Grid>
									</>
								))}
							</Grid>
						</Grid>
					)}
				</Grid>
			</Paper>
		)
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	goals: {
		currentGoal: Goal;
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state.session.accountData.id,
	currentGoal: state.goals.currentGoal,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getCurrentGoal }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentGoalPanel);
