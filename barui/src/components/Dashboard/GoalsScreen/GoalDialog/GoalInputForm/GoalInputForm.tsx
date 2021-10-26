import React, { useCallback, useState } from "react";

import { Product } from "../../../ProductsScreen/ProductsScreen";

import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import CategorySelect from "../CategorySelect";

import styles from "./styles";
import { Category } from "../../../../common/CategoryCombo/CategoryCombo";

type Props = {
	categories: Category[];
	onAdd?: Function;
};

const GoalInputForm = ({ categories, onAdd }: Props) => {
	const [category, setCategory] = useState<Category | null>(null);

	const classes = styles();

	const handleChange = useCallback(
		event => setCategory(categories.find(p => p.id === event.target.value) ?? null),
		[setCategory, categories]
	);

	const handelAdd = useCallback(() => {
		setCategory(null);
		onAdd && onAdd({ category, categoryIncomeGoal: 0, totalCategoryIncome: 0 });
	}, [onAdd, category]);

	return (
		<Card className={classes.form} variant="outlined">
			<Grid alignItems="center" container spacing={3} justifyContent="space-between">
				<Grid item>
					<CategorySelect
						value={(category && category.id) ?? 0}
						onChange={handleChange}
						categories={categories}
					/>
				</Grid>
				<Grid item>
					<Button
						color="secondary"
						onClick={handelAdd}
						variant="contained"
						disableElevation
						disabled={!(category !== null)}
					>
						Agregar
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default GoalInputForm;
