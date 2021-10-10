import React, { useCallback, useState } from "react";

import { Product } from "../../../ProductsScreen/ProductsScreen";

import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import AmountInput from "../AmountInput";
import ProductsSelect from "../ProductsSelect";

import styles from "./styles";

type Props = {
	products: Product[];
	onAdd: Function;
};

const SaleInputForm = ({ products, onAdd }: Props) => {
	const [amount, setAmount] = useState(0);
	const [product, setProduct] = useState<Product | null>(null);

	const classes = styles();

	const handleChange = useCallback(
		event => setProduct(products.find(p => p.id === event.target.value) ?? null),
		[setProduct, products]
	);

	const handleRemove = useCallback(() => setAmount(amount - 1), [setAmount, amount]);
	const handleAdd = useCallback(() => setAmount(amount + 1), [setAmount, amount]);

	const handelAdd = useCallback(() => {
		setProduct(null);
		setAmount(0);
		onAdd({ amount, product });
	}, [onAdd, amount, product]);

	return (
		<Card className={classes.form} variant="outlined">
			<Grid alignItems="center" container spacing={3} justifyContent="space-between">
				<Grid item>
					<ProductsSelect
						value={(product && product.id) ?? 0}
						onChange={handleChange}
						products={products}
					/>
				</Grid>
				<Grid item>
					<AmountInput amount={amount} onAdd={handleAdd} onRemove={handleRemove} />
				</Grid>
				<Grid item>
					<Typography>{amount !== 0 && `$ ${product ? product.price * amount : "0"}`}</Typography>
				</Grid>
				<Grid item>
					<Button
						color="secondary"
						onClick={handelAdd}
						variant="contained"
						disableElevation
						disabled={!(product !== null && amount > 0)}
					>
						Agregar
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
};

export default SaleInputForm;
