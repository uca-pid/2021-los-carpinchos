import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ProductSale } from "../../SalesScreen";
import ProductSaleTableRow from "./ProductSaleTableRow";

const useStyles = makeStyles({
	table: {
		minWidth: 540,
	},
});

type Props = {
	rows?: ProductSale[];
};

const ProductSaleTable = ({ rows: rows }: Props) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper} variant="outlined">
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Producto</TableCell>
						<TableCell>Cantidad</TableCell>
						<TableCell align="right">Acciones</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows &&
						rows.map((row: ProductSale) => {
							return <ProductSaleTableRow key={row.productId} row={row} />;
						})}
					<ProductSaleTableRow />
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ProductSaleTable;
