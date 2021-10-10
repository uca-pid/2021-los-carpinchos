/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
	getStaticCategories,
	getUserCategories,
	addNewCategory,
} from "../../../ducks/categoriesReducer";

import { Grid, Typography } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CategoryIcon from "@material-ui/icons/Category";

export type Category = {
	inputValue?: string;
	id?: number;
	name: string;
	static: boolean;
};

type Props = {
	actions: {
		getStaticCategories: Function;
		getUserCategories: Function;
		addNewCategory: Function;
	};
	accountId: number;
	staticCategories: any[];
	selectedValue: Category | null;
	setSelectedValue: Function;
	userCategories: any[];
};

const filter = createFilterOptions<Category>();

const CategoryCombo = ({
	actions,
	accountId,
	staticCategories,
	selectedValue,
	setSelectedValue,
	userCategories,
}: Props) => {
	const [allCategories, setAllCategories] = useState<Category[]>([]);

	useEffect(() => {
		actions.getStaticCategories();
		actions.getUserCategories(accountId);
	}, [actions, accountId]);

	useEffect(() => {
		staticCategories && userCategories && setAllCategories([...staticCategories, ...userCategories]);
	}, [staticCategories, userCategories, setAllCategories]);

	const handleChange = useCallback(
		(event, newValue) => {
			if (newValue && newValue.inputValue) {
				// Create a new value from the user input
				actions.addNewCategory(newValue.inputValue, accountId).then((response: any) => {
					setSelectedValue({
						id: response.category_id,
						name: response.category_name,
						static: response.static,
					});
					actions.getUserCategories(accountId);
				});
			} else {
				setSelectedValue(newValue);
			}
		},
		[actions, accountId, setSelectedValue]
	);

	const handleFilter = useCallback((options, params) => {
		const filtered = filter(options, params);

		// Suggest the creation of a new value
		if (params.inputValue !== "") {
			filtered.push({
				inputValue: params.inputValue,
				name: `Crear categoría "${params.inputValue}"`,
				static: false,
			});
		}

		return filtered;
	}, []);

	const getOptionLabel = useCallback((option: Category): string => {
		// Value selected with enter, right from the input
		if (typeof option === "string") {
			return option;
		}
		// Add "xxx" option created dynamically
		if (option.inputValue) {
			return option.inputValue;
		}
		// Regular option
		return option.name;
	}, []);

	const renderOption = useCallback(
		(option: Category) => (
			<Grid container direction="row" spacing={2}>
				<Grid item>
					{option.static ? (
						<FiberManualRecordIcon fontSize="small" />
					) : (
						<CategoryIcon fontSize="small" />
					)}
				</Grid>
				<Grid item xs>
					{option.name}
				</Grid>
			</Grid>
		),
		[]
	);

	const renderInput = useCallback(
		params => (
			<TextField
				{...params}
				label="Categoría"
				placeholder="Seleccioné o ingrese una categoría"
				InputLabelProps={{
					shrink: true,
					style: { fontSize: 20 },
				}}
			/>
		),
		[]
	);

	return (
		<Autocomplete
			value={selectedValue}
			onChange={handleChange}
			filterOptions={handleFilter}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			options={allCategories}
			getOptionLabel={getOptionLabel}
			renderOption={renderOption}
			freeSolo
			renderInput={renderInput}
		/>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	categories: {
		staticCategories: any[];
		userCategories: any[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state?.session?.accountData?.id,
	staticCategories: state?.categories?.staticCategories,
	userCategories: state?.categories?.userCategories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ getStaticCategories, getUserCategories, addNewCategory }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCombo);
