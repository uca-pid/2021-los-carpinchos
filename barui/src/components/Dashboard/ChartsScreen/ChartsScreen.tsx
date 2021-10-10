import React, { useCallback, useEffect, useState } from "react";

import {
	Chart,
	BarSeries,
	Title,
	PieSeries,
	ArgumentAxis,
	ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getSalesBarsChart } from "../../../ducks/chartReducer";
import { Container } from "@material-ui/core";

import { DatePicker } from "@material-ui/pickers";
import moment from "moment";

import "moment/locale/es";
import styles from "./styles";
import CategoryFilterSelect from "./CategoryFilterSelect";

type SaleChartData = {
	month: number;
	year: number;
	income: number;
};

type Props = {
	actions: {
		getSalesBarsChart: Function;
	};
	accountId: number;
	salesChartData: SaleChartData[];
};

const data = [
	{ region: "Asia", val: 4119626293 },
	{ region: "Africa", val: 1012956064 },
	{ region: "Northern America", val: 344124520 },
	{ region: "Latin America and the Caribbean", val: 590946440 },
	{ region: "Europe", val: 727082222 },
	{ region: "Oceania", val: 35104756 },
];

const ChartsScreen = ({ actions, accountId, salesChartData }: Props) => {
	const [year, setYear] = useState(new Date());
	const classes = styles();

	const handleDateChange = useCallback(date => setYear(date), []);

	useEffect(() => {
		accountId &&
			actions.getSalesBarsChart(accountId, moment(year).startOf("year"), moment(year).endOf("year"));
	}, [actions, accountId, year]);

	return (
		<Container>
			<Grid container spacing={4}>
				<Grid container direction="column" item md={4} spacing={3}>
					<Grid item xs>
						<Card className={classes.card}>
							<CategoryFilterSelect />
							<Chart data={data}>
								<PieSeries valueField="val" argumentField="region" innerRadius={0.6} />
								<Title text="Ingresos por Categorías" />
								<Animation />
							</Chart>
						</Card>
					</Grid>
					<Grid item xs>
						<Card className={classes.card}>METAS</Card>
					</Grid>
				</Grid>
				<Grid item xs>
					<Card className={classes.card}>
						<DatePicker
							variant="dialog"
							openTo="year"
							views={["year"]}
							label="Año"
							value={year}
							onChange={handleDateChange}
						/>
						{salesChartData && (
							<Chart data={salesChartData}>
								<ArgumentAxis />
								<ValueAxis />

								<BarSeries valueField="income" argumentField="month" />
								<Title text={`Ingresos Mensuales ${moment(year).year()}`} />
								<Animation />
							</Chart>
						)}
					</Card>
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
	chart: {
		yearIncomes: SaleChartData[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state.session.accountData.id,
	salesChartData: state?.chart?.yearIncomes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getSalesBarsChart }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartsScreen);
