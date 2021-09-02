import React, { useCallback } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const mockedBarTypes = [
	{
		label: "Bar",
		value: "Bar",
	},
	{
		label: "Coffee Bar",
		value: "CoffeeBar",
	},
	{
		label: "Wine Bar",
		value: "WineBar",
	},
	{
		label: "Other",
		value: "Other",
	},
];

export type BarType = "None" | "Bar" | "CoffeeBar" | "WineBar" | "Other";

type Props = {
	barType: BarType;
	setBarType: Function;
};

const BarTypeSelect = ({ barType, setBarType }: Props) => {
	const handleChange = useCallback(({ target: { value } }) => setBarType(value), [setBarType]);

	return (
		<FormControl fullWidth>
			<InputLabel>Tipo de bar</InputLabel>
			<Select displayEmpty value={barType} onChange={handleChange}>
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
