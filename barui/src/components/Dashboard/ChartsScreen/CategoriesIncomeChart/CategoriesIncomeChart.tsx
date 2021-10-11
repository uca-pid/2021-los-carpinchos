import React, { useCallback, useState } from "react";

import { Chart, Title, PieSeries, Tooltip } from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import { Animation } from "@devexpress/dx-react-chart";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";

import { DatePicker } from "@material-ui/pickers";

import "moment/locale/es";
import CategoryFilterSelect from "./CategoryFilterSelect";

import { mockedPieChartData } from "./mockedPieChartData";

export type PieChartData = {
	categoryName: string;
	income: number;
};

type Props = {
	cardClassName: string;
};

const CategoriesIncomeChart = ({ cardClassName }: Props) => {
	const [month, setMonth] = useState(new Date());

	const handleDateChange = useCallback(date => setMonth(date), []);

	const renderTooltip = useCallback(
		({ data, text, style, ...props }) => <Tooltip.Content text={`$ ${text}`} {...props} />,
		[]
	);

	return (
		<Card className={cardClassName}>
			<Grid container direction="column" spacing={3}>
				<Grid item xs>
					<DatePicker views={["year", "month"]} label="Mes" value={month} onChange={handleDateChange} />
				</Grid>

				<Grid item xs>
					<CategoryFilterSelect categories={mockedPieChartData} />
				</Grid>

				<Grid item xs>
					<Chart data={mockedPieChartData}>
						<PieSeries valueField="income" argumentField="categoryName" innerRadius={0.6} />
						<Title text="Ingresos por Categorías" />
						<Animation />
						<EventTracker />
						<Tooltip contentComponent={renderTooltip} />
					</Chart>
				</Grid>
			</Grid>
		</Card>
	);
};

export default CategoriesIncomeChart;
