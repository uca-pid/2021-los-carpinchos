/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";

type FilmOptionType = {
	inputValue?: string;
	title: string;
	year?: number;
};

const filter = createFilterOptions<FilmOptionType>();

const CategoryCombo = () => {
	const [value, setValue] = useState<FilmOptionType | null>(null);

	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				if (typeof newValue === "string") {
					setValue({
						title: newValue,
					});
				} else if (newValue && newValue.inputValue) {
					// Create a new value from the user input
					setValue({
						title: newValue.inputValue,
					});
				} else {
					setValue(newValue);
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				// Suggest the creation of a new value
				if (params.inputValue !== "") {
					filtered.push({
						inputValue: params.inputValue,
						title: `Crear categoría "${params.inputValue}"`,
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			options={top100Films}
			getOptionLabel={option => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				// Add "xxx" option created dynamically
				if (option.inputValue) {
					return option.inputValue;
				}
				// Regular option
				return option.title;
			}}
			renderOption={option => option.title}
			freeSolo
			renderInput={params => (
				<TextField
					{...params}
					label="Categoría"
					placeholder="Seleccioné o ingrese una categoría"
					InputLabelProps={{
						shrink: true,
						style: { fontSize: 20 },
					}}
				/>
			)}
		/>
	);
};

const top100Films: FilmOptionType[] = [
	{ title: "To Kill a Mockingbird", year: 1962 },
	{ title: "Toy Story 3", year: 2010 },
	{ title: "Logan", year: 2017 },
	{ title: "Full Metal Jacket", year: 1987 },
	{ title: "Dangal", year: 2016 },
	{ title: "The Sting", year: 1973 },
	{ title: "2001: A Space Odyssey", year: 1968 },
	{ title: "Singin' in the Rain", year: 1952 },
	{ title: "Toy Story", year: 1995 },
];

export default CategoryCombo;
