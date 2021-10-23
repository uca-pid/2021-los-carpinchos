import React, { useCallback, useState, useEffect } from "react";

import { Chart, Title, PieSeries, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getIncomeByCategory } from "../../../../ducks/chartReducer";

import "moment/locale/es";
import CategoryFilterSelect from "./CategoryFilterSelect";

import moment from "moment";

export type PieChartData = {
	categoryId: number;
	categoryName: string;
	income: number;
};

type Props = {
	actions: {
		getIncomeByCategory: Function;
	};
	accountId: number;
	categoriesChartData: PieChartData[];
	cardClassName: string;
};

const CategoriesIncomeChart = ({
	actions,
	accountId,
	categoriesChartData,
	cardClassName,
}: Props) => {
	const [month, setMonth] = useState(new Date());
	const [categoriesIdShown, setCategoriesIdShown] = useState([0]);

	useEffect(() => {
		accountId &&
			actions.getIncomeByCategory(
				accountId,
				moment(month).startOf("month"),
				moment(month).endOf("month")
			);
	}, [actions, accountId, month]);

	const handleDateChange = useCallback(date => setMonth(date), []);

	const renderTooltip = useCallback(
		({ text, targetItem, props }) => (
			<Tooltip.Content
				text={`${categoriesChartData[targetItem.point].categoryName} - $ ${text}`}
				{...props}
			/>
		),
		[categoriesChartData]
	);

	return (
		<Card className={cardClassName}>
			<Grid container direction="column" spacing={3}>
				<Grid item xs>
					<DatePicker
						views={["year", "month"]}
						openTo="month"
						label="Mes"
						value={month}
						onChange={handleDateChange}
					/>
				</Grid>

				<Grid item xs>
					<CategoryFilterSelect
						categories={categoriesChartData}
						categoriesIdShown={categoriesIdShown}
						setCategoriesIdShown={setCategoriesIdShown}
					/>
				</Grid>

				<Grid item xs>
					{categoriesChartData && (
						<Chart
							height={350}
							data={categoriesChartData.filter(
								r => categoriesIdShown.includes(r.categoryId) || categoriesIdShown.includes(0)
							)}
						>
							<PieSeries valueField="income" argumentField="categoryName" innerRadius={0.6} />
							<Title text="Ingresos por Categorías" />
							<Animation />
							<EventTracker />
							<Tooltip contentComponent={renderTooltip} />
						</Chart>
					)}
				</Grid>
			</Grid>
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
		categoriesChart: PieChartData[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state.session.accountData.id,
	categoriesChartData: state?.chart?.categoriesChart,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getIncomeByCategory }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesIncomeChart);
