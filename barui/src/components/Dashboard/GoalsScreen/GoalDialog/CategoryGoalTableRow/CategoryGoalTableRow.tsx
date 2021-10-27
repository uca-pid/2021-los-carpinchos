import React, { useCallback, useEffect, useState } from "react";

import { ProductSale } from "../../../SalesScreen/SalesScreen";
import { Product } from "../../../ProductsScreen/ProductsScreen";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import CategorySelect from "../CategorySelect";

import IconButton from "@material-ui/core/IconButton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./styles";
import { CategoryGoal } from "../../GoalsScreen";
import { Category } from "../../../../common/CategoryCombo/CategoryCombo";
import TextFieldWithValidation from "../../../../common/TextFieldWithValidation";
import { InputAdornment } from "@material-ui/core";
import { numericSetting, settings } from "../../../../SignUp/validationSettings";

type Props = {
	row?: CategoryGoal;
	categories: Category[];
	onSave?: Function;
	onDelete?: Function;
	className?: string;
	disableActions?: boolean;
};

const CategoryGoalTableRow = ({
	categories,
	row,
	onSave,
	onDelete,
	className,
	disableActions,
}: Props) => {
	const [category, setCategory] = useState<Category | null>(null);
	const [editMode, setEditMode] = useState(false);
	const [categoryIncomeGoal, setCategoryIncomeGoal] = useState("0");

	const classes = styles();

	const canSaveNewRow = !editMode && category !== null;
	const canSaveExistingRow =
		editMode && row && categoryIncomeGoal != row.categoryIncomeGoal.toString();
	const canDelete = !editMode && row;

	useEffect(() => {
		if (row) {
			setCategory(row.category ?? null);
			setCategoryIncomeGoal(row.categoryIncomeGoal.toString() ?? "0");
		}
	}, [row]);

	const handleChange = useCallback(
		event => setCategory(categories.find(p => p.id === event.target.value) ?? null),
		[setCategory, categories]
	);

	const handleCategoryGoal = useCallback(
		(value, invalid) => setCategoryIncomeGoal(value),
		[setCategoryIncomeGoal]
	);
	const handleEditRow = useCallback(() => setEditMode(true), [setEditMode]);

	const handleCancelEditRow = useCallback(() => {
		setEditMode(false);
	}, [setEditMode]);

	const handleClick = useCallback(() => {
		if (canDelete) {
			row && onDelete && onDelete(row);
		} else if (canSaveNewRow || canSaveExistingRow) {
			if (canSaveNewRow) {
				setCategory(null);
				console.log("canSaveNewRow");
			}
			console.log("canSaveExistingRow");
			setEditMode(false);
			category &&
				onSave &&
				onSave({
					category,
					categoryIncomeGoal: categoryIncomeGoal,
					totalCategoryIncome: row?.totalCategoryIncome,
				});
		}
	}, [
		onSave,
		category,
		canSaveNewRow,
		onDelete,
		canDelete,
		canSaveExistingRow,
		categoryIncomeGoal,
		row,
	]);

	return (
		<TableRow className={`${row ? "" : classes.newRow} ${className}`}>
			<TableCell>
				<CategorySelect
					value={(category && category.id) ?? 0}
					onChange={handleChange}
					disabled={Boolean(row)}
					categories={categories}
				/>
			</TableCell>

			<TableCell align="right">
				<TextFieldWithValidation
					placeholder="objetivo"
					value={categoryIncomeGoal}
					onChange={handleCategoryGoal}
					required
					InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
					settings={[...settings, numericSetting]}
					disabled={!editMode}
				/>
			</TableCell>
			{!disableActions && (
				<TableCell align="right">
					{row && (
						<IconButton onClick={editMode ? handleCancelEditRow : handleEditRow} size="small">
							{editMode ? <ClearRoundedIcon /> : <EditIcon />}
						</IconButton>
					)}

					<IconButton
						onClick={handleClick}
						disabled={!(canSaveNewRow || canSaveExistingRow || canDelete)}
						size="small"
					>
						{editMode || !row ? (
							<SaveIcon
								className={
									canSaveNewRow || canSaveExistingRow ? classes.saveIcon : classes.disabledSaveIcon
								}
							/>
						) : (
							<DeleteIcon className={classes.deleteIcon} />
						)}
					</IconButton>
				</TableCell>
			)}
		</TableRow>
	);
};

export default CategoryGoalTableRow;
