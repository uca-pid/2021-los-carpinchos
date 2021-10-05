import React, { useCallback, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";

import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./styles";

import { ProductSale } from "../../SalesScreen";
import { Product } from "../../../ProductsScreen/ProductsScreen";

type Props = {
	row?: ProductSale;
	products: Product[];
	onSave?: Function;
};

const ProductSaleTableRow = ({ products, row, onSave }: Props) => {
	const [product, setProduct] = useState<Product | null>(null);
	const [amount, setAmount] = useState(0);
	const [editMode, setEditMode] = useState(false);

	const classes = styles();

	const saveNewRow = !row && product !== null && amount > 0;
	const saveExistingRow = row && amount != row.amount && amount > 0;

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

	const handleSaveRow = useCallback(() => {
		if (saveNewRow) {
			setProduct(null);
			setAmount(0);
		}
		setEditMode(false);
		product && onSave && onSave({ amount, product });
	}, [onSave, product, amount, saveNewRow]);

	const handleDeleteRow = useCallback(() => console.log("DELETE ROW"), []);

	return (
		<TableRow className={row ? "" : classes.newRow}>
			<TableCell>
				<FormControl className={classes.productsSelect}>
					<Select value={(product && product.id) ?? 0} onChange={handleChange} disabled={Boolean(row)}>
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
			</TableCell>
			<TableCell align="center">
				<Grid alignItems="center" container direction="row" spacing={2}>
					<Grid item>
						<Typography>{amount}</Typography>
					</Grid>
					{(editMode || !row) && (
						<Grid item>
							<div>
								<Grid container direction="column">
									<Grid item>
										<IconButton color="primary" size="small" onClick={handleAdd}>
											<AddRoundedIcon />
										</IconButton>
									</Grid>
									<Grid item>
										<IconButton color="primary" size="small" onClick={handleRemove} disabled={amount === 0}>
											<RemoveRoundedIcon />
										</IconButton>
									</Grid>
								</Grid>
							</div>
						</Grid>
					)}
				</Grid>
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
					onClick={saveNewRow || saveExistingRow ? handleSaveRow : handleDeleteRow}
					disabled={!(saveNewRow || saveExistingRow)}
					size="small"
				>
					{editMode || !row ? (
						<SaveIcon
							className={saveNewRow || saveExistingRow ? classes.saveIcon : classes.disabledSaveIcon}
						/>
					) : (
						<DeleteIcon className={classes.deleteIcon} />
					)}
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

// type State = {
// 	// session: {
// 	// 	accountData: {
// 	// 		id: number;
// 	// 	};
// 	// };
// 	// products: {
// 	// 	userProducts: Product[];
// 	// };
// };

// const mapStateToProps = (state: State) => ({
// 	//products: state?.products?.userProducts,
// 	//id: state?.session?.accountData?.id,
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
// 	actions: bindActionCreators({ selectProduct, getAllProducts }, dispatch),
// });

// export default connect(mapStateToProps)(ProductSaleTableRow);
export default ProductSaleTableRow;
