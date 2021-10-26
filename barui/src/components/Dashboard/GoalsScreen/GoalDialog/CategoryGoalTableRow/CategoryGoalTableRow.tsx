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

type Props = {
	row?: CategoryGoal;
	categories: Category[];
	onSave?: Function;
	onDelete?: Function;
	className?: string;
};

const CategoryGoalTableRow = ({ categories, row, onSave, onDelete, className }: Props) => {
	const [category, setCategory] = useState<Category | null>(null);
	const [editMode, setEditMode] = useState(false);

	const classes = styles();

	const canSaveNewRow = !editMode && category !== null;
	const canSaveExistingRow = editMode && row;
	const canDelete = !editMode && row;

	useEffect(() => {
		if (row) {
			setCategory(row.category ?? null);
		}
	}, [row]);

	const handleChange = useCallback(
		event => setCategory(categories.find(p => p.id === event.target.value) ?? null),
		[setCategory, categories]
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
			category && onSave && onSave({ category, categoryIncomeGoal: 0, totalCategoryIncome: 0 });
		}
	}, [onSave, category, canSaveNewRow, onDelete, canDelete, canSaveExistingRow, row]);

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
							className={canSaveNewRow || canSaveExistingRow ? classes.saveIcon : classes.disabledSaveIcon}
						/>
					) : (
						<DeleteIcon className={classes.deleteIcon} />
					)}
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default CategoryGoalTableRow;
