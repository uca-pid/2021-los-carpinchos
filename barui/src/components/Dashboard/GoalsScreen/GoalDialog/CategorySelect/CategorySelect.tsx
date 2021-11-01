import React, { useCallback } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import styles from "./styles";
import { Category } from "../../../../common/CategoryCombo/CategoryCombo";

type Props = {
	categories: Category[];
	onChange: Function;
	disabled?: boolean;
	value: number;
};

const CategorySelect = ({ value, categories, onChange, disabled }: Props) => {
	const classes = styles();

	const handleChange = useCallback(event => onChange(event), [onChange]);

	return (
		<FormControl className={classes.productsSelect}>
			<Select value={value} onChange={handleChange} disabled={disabled}>
				<MenuItem value={0} disabled>
					Seleccionar
				</MenuItem>
				{categories.map((category: Category) => (
					<MenuItem key={`${category.name}-${category.id}`} value={category.id}>
						{category.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default CategorySelect;
