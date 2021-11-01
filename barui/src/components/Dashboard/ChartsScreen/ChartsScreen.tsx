import React from "react";

import { Container, Grid } from "@material-ui/core";

import CurrentGoalPanel from "../../common/CurrentGoalPanel";
import AnnualIncomeChart from "./AnnualIncomeChart";
import CategoriesIncomeChart from "./CategoriesIncomeChart";

import styles from "./styles";

const ChartsScreen = () => {
	const classes = styles();

	return (
		<Container>
			<Grid container spacing={4}>
				<Grid item md={12}>
					<CurrentGoalPanel />
				</Grid>
				<Grid item md={4}>
					<CategoriesIncomeChart cardClassName={classes.card} />
				</Grid>
				<Grid item xs>
					<AnnualIncomeChart cardClassName={classes.card} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default ChartsScreen;
