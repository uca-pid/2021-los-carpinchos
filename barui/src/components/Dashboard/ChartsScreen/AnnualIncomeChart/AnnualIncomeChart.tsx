import React, { useCallback, useEffect, useState } from "react";

import {
	Chart,
	BarSeries,
	Title,
	ArgumentAxis,
	ValueAxis,
	Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";
import Card from "@material-ui/core/Card";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getSalesBarsChart } from "../../../../ducks/chartReducer";

import { DatePicker } from "@material-ui/pickers";
import moment from "moment";

import "moment/locale/es";

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
	cardClassName: string;
};

const AnnualIncomeChart = ({ actions, accountId, salesChartData, cardClassName }: Props) => {
	const [year, setYear] = useState(new Date());

	const handleDateChange = useCallback(date => setYear(date), []);

	useEffect(() => {
		accountId &&
			actions.getSalesBarsChart(accountId, moment(year).startOf("year"), moment(year).endOf("year"));
	}, [actions, accountId, year]);

	const renderIncomeLabel = useCallback(
		({ text, style, ...restProps }) => (
			<ValueAxis.Label text={`$ ${text}`} style={style} {...restProps} />
		),
		[]
	);

	const renderTooltip = useCallback(
		({ data, text, style, ...props }) => <Tooltip.Content text={`$ ${text}`} {...props} />,
		[]
	);

	return (
		<Card className={cardClassName}>
			<DatePicker
				openTo="year"
				views={["year"]}
				label="Año"
				value={year}
				onChange={handleDateChange}
			/>
			{salesChartData && (
				<Chart height={450} data={salesChartData}>
					<ArgumentAxis />
					<ValueAxis labelComponent={renderIncomeLabel} />

					<BarSeries valueField="income" argumentField="month" />
					<Title text={`Ingresos Mensuales ${moment(year).year()}`} />
					<Animation />
					<EventTracker />
					<Tooltip contentComponent={renderTooltip} />
				</Chart>
			)}
		</Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnualIncomeChart);
