import React, { useCallback } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styles from "./styles";

const mockedBarTypes = [
	{
		value: "Bar",
		label: "Bar",
	},
	{
		value: "CoffeeBar",
		label: "Coffee Bar",
	},
	{
		value: "WineBar",
		label: "Wine Bar",
	},
	{
		value: "Other",
		label: "Other",
	},
];

export type BarType = "None" | "Bar" | "CoffeeBar" | "WineBar" | "Other";

type Props = {
	barType: BarType;
	setBarType: Function;
};

const BarTypeSelect = ({ barType, setBarType }: Props) => {
	const classes = styles();

	const handleChange = useCallback(event => setBarType(event), [setBarType]);
	return (
		<FormControl fullWidth>
			<InputLabel>Tipo de bar</InputLabel>
			<Select value={barType} onChange={handleChange}>
				<MenuItem value="None" disabled>
					Seleccionar tipo de bar
				</MenuItem>
				{mockedBarTypes.map((type, key) => (
					<MenuItem value={type.value} key={`barType-${key}`}>
						{type.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default BarTypeSelect;
