import React, { useEffect, useState } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { PieChartData } from "../CategoriesIncomeChart";

type Props = {
	categories: PieChartData[];
};

const CategoryFilterSelect = ({ categories }: Props) => {
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
	const checkedIcon = <CheckBoxIcon fontSize="small" />;

	return (
		<Autocomplete
			multiple
			limitTags={2}
			options={categories}
			disableCloseOnSelect
			defaultValue={[categories[0]]}
			getOptionLabel={option => option.categoryName}
			renderOption={(option, { selected }) => (
				<React.Fragment>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.categoryName}
				</React.Fragment>
			)}
			renderInput={params => (
				<TextField {...params} label="Categorías seleccionadas" placeholder="Categoría" />
			)}
		/>
	);
};

export default CategoryFilterSelect;
