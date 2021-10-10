import React, { useCallback, useEffect, useState } from "react";

import { ProductSale } from "../../SalesScreen";
import { Product } from "../../../ProductsScreen/ProductsScreen";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import AmountInput from "../AmountInput";
import ProductsSelect from "../ProductsSelect";

import IconButton from "@material-ui/core/IconButton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./styles";

type Props = {
	row?: ProductSale;
	products: Product[];
	onSave?: Function;
	onDelete?: Function;
	className?: string;
};

const ProductSaleTableRow = ({ products, row, onSave, onDelete, className }: Props) => {
	const [product, setProduct] = useState<Product | null>(null);
	const [amount, setAmount] = useState(0);
	const [editMode, setEditMode] = useState(false);

	const classes = styles();

	const canSaveNewRow = !editMode && product !== null && amount > 0;
	const canSaveExistingRow = editMode && row && amount != row.amount && amount > 0;
	const canDelete = !editMode && row;

	useEffect(() => {
		if (row) {
			setProduct(row.product ?? null);
			setAmount(row.amount ?? 0);
		}
	}, [row]);

	const handleChange = useCallback(
		event => setProduct(products.find(p => p.id === event.target.value) ?? null),
		[setProduct, products]
	);

	const handleRemove = useCallback(() => setAmount(amount - 1), [setAmount, amount]);
	const handleAdd = useCallback(() => setAmount(amount + 1), [setAmount, amount]);

	const handleEditRow = useCallback(() => setEditMode(true), [setEditMode]);
	const handleCancelEditRow = useCallback(() => {
		row && setAmount(row.amount);
		setEditMode(false);
	}, [setEditMode, row]);

	const handleClick = useCallback(() => {
		if (canDelete) {
			row && onDelete && onDelete(row);
		} else if (canSaveNewRow || canSaveExistingRow) {
			if (canSaveNewRow) {
				setProduct(null);
				setAmount(0);
				console.log("canSaveNewRow");
			}
			console.log("canSaveExistingRow");
			setEditMode(false);
			product && onSave && onSave({ amount, product });
		}
	}, [onSave, product, amount, canSaveNewRow, onDelete, canDelete, canSaveExistingRow, row]);

	return (
		<TableRow className={`${row ? "" : classes.newRow} ${className}`}>
			<TableCell>
				<ProductsSelect
					value={(product && product.id) ?? 0}
					onChange={handleChange}
					disabled={Boolean(row)}
					products={products}
				/>
			</TableCell>
			<TableCell align="center">
				<AmountInput
					amount={amount}
					disabled={!(editMode || !row)}
					onAdd={handleAdd}
					onRemove={handleRemove}
				/>
			</TableCell>
			<TableCell align="center">
				{amount !== 0 && `$ ${product ? product.price * amount : "0"}`}
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

export default ProductSaleTableRow;
