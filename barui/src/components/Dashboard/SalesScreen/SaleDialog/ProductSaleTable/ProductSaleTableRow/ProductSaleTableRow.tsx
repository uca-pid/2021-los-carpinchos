import React, { useCallback, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import styles from "./styles";

import { Product } from "../../../../ProductsScreen/ProductsScreen";

import { connect } from "react-redux";
import { ProductSale } from "../../../SalesScreen";

type Props = {
	row?: ProductSale;
	products: Product[];
};

const ProductSaleTableRow = ({ products, row }: Props) => {
	const [productId, setProductId] = useState(0);
	const [amount, setAmount] = useState(0);
	const [editMode, setEditMode] = useState(false);

	const classes = styles();

	useEffect(() => {
		if (row) {
			setProductId(row.productId ?? 0);
			setAmount(row.amount ?? 0);
		}
	}, [row]);

	const handleChange = useCallback(event => setProductId(event.target.value), [setProductId]);

	const handleRemove = useCallback(() => setAmount(amount - 1), [setAmount, amount]);
	const handleAdd = useCallback(() => setAmount(amount + 1), [setAmount, amount]);

	const handleEditRow = useCallback(() => setEditMode(true), [setEditMode]);
	const handleCancelEditRow = useCallback(() => setEditMode(false), [setEditMode]);

	const handleSaveRow = useCallback(() => console.log("SAVE ROW"), []);
	const handleDeleteRow = useCallback(() => console.log("DELETE ROW"), []);

	return (
		<TableRow className={row ? "" : classes.newRow}>
			<TableCell>
				<FormControl className={classes.productsSelect}>
					<Select value={productId} onChange={handleChange} disabled={!editMode && Boolean(row)}>
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
			<TableCell>
				<Grid alignItems="center" container spacing={3}>
					{(editMode || !row) && (
						<Grid item>
							<ButtonGroup size="small" variant="text" color="primary" disableElevation>
								<IconButton onClick={handleRemove} disabled={amount === 0}>
									<RemoveRoundedIcon />
								</IconButton>
								<IconButton onClick={handleAdd}>
									<AddRoundedIcon />
								</IconButton>
							</ButtonGroup>
						</Grid>
					)}
					<Grid item>
						<Typography>{amount}</Typography>
					</Grid>
				</Grid>
			</TableCell>
			<TableCell align="right">
				{row && (
					<IconButton onClick={editMode ? handleCancelEditRow : handleEditRow} size="small">
						{editMode ? <ClearRoundedIcon /> : <EditIcon />}
					</IconButton>
				)}

				<IconButton onClick={editMode ? handleSaveRow : handleDeleteRow} disabled={!row} size="small">
					{editMode || !row ? (
						<SaveIcon className={row ? classes.saveIcon : classes.disabledSaveIcon} />
					) : (
						<DeleteIcon className={classes.deleteIcon} />
					)}
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	products: {
		userProducts: Product[];
	};
};

const mapStateToProps = (state: State) => ({
	products: state?.products?.userProducts,
	//id: state?.session?.accountData?.id,
});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
// 	actions: bindActionCreators({ selectProduct, getAllProducts }, dispatch),
// });

export default connect(mapStateToProps)(ProductSaleTableRow);
