import React, { useCallback, useEffect, useState } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { PieChartData } from "../CategoriesIncomeChart";

type Props = {
	categories: PieChartData[];
	setCategoriesIdShown: Function;
	categoriesIdShown: number[];
};

const CategoryFilterSelect = ({ categories, categoriesIdShown, setCategoriesIdShown }: Props) => {
	let allCategories: PieChartData = { categoryId: 0, categoryName: "Todos", income: 10 };
	const [options, setOptions] = useState<PieChartData[]>([allCategories]);

	useEffect(() => {
		setOptions([{ categoryId: 0, categoryName: "Todos", income: 10 }, ...categories]);
	}, [categories]);

	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
	const checkedIcon = <CheckBoxIcon fontSize="small" />;

	const handleChange = useCallback(
		(event, value) => {
			let ids = value.map((m: PieChartData) => m.categoryId);
			console.log(ids);
			if (ids.includes(0)) {
				if (ids[ids.length - 1] === 0) {
					setCategoriesIdShown([0]);
				} else {
					console.log(value.slice(1));
					setCategoriesIdShown(value.slice(1).map((m: PieChartData) => m.categoryId));
				}
			} else {
				console.log(`value.length : ${value.length} categoriesIdShown.length: ${categories.length}`);
				if (value.length === categories.length) {
					setCategoriesIdShown([0]);
				} else {
					setCategoriesIdShown(value.map((m: PieChartData) => m.categoryId));
				}
			}
		},
		[setCategoriesIdShown, categories]
	);

	return (
		<>
			{options.length > 0 && (
				<Autocomplete
					multiple
					limitTags={2}
					size="small"
					options={options}
					disableCloseOnSelect
					getOptionLabel={option => option.categoryName}
					renderOption={(option, { selected }) => (
						<React.Fragment>
							<Checkbox
								icon={icon}
								checkedIcon={checkedIcon}
								style={{ marginRight: 8 }}
								checked={categoriesIdShown.includes(option.categoryId)}
							/>
							{option.categoryName} - {selected ? "True" : "false"}
						</React.Fragment>
					)}
					value={options.filter(r => categoriesIdShown.includes(r.categoryId))}
					onChange={handleChange}
					renderInput={params => (
						<TextField {...params} label="Categorías seleccionadas" placeholder="Categoría" />
					)}
				/>
			)}
		</>
	);
};

export default CategoryFilterSelect;
