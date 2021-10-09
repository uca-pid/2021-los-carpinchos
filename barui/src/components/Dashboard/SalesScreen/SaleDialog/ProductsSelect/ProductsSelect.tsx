import React, { useCallback } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Product } from "../../../ProductsScreen/ProductsScreen";

import styles from "./styles";

type Props = {
	products: Product[];
	onChange: Function;
	disabled?: boolean;
	value: number;
};

const ProductsSelect = ({ value, products, onChange, disabled }: Props) => {
	const classes = styles();

	const handleChange = useCallback(event => onChange(event), [onChange]);

	return (
		<FormControl className={classes.productsSelect}>
			<Select value={value} onChange={handleChange} disabled={disabled}>
				<MenuItem value={0} disabled>
					Seleccionar
				</MenuItem>
				{products.map((product: Product) => (
					<MenuItem key={`${product.name}-${product.id}`} value={product.id}>
						{product.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ProductsSelect;
