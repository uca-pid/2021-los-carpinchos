import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Container, Grid, IconButton, Typography } from "@material-ui/core";

import styles from "./styles";
import CreateProduct from "./CreateProduct";

const createData = (name: string, price: number) => ({
	name,
	price,
});

const rows = [
	createData("PRODUCT 1", 150),
	createData("PRODUCT 2", 100),
	createData("PRODUCT 3", 850),
	createData("PRODUCT 4", 950),
];

const MainScreen = () => {
	const classes = styles();

	return (
		<Container maxWidth="md">
			<Grid container direction="column" spacing={3}>
				<Grid alignItems="center" container item>
					<Grid item xs>
						<Typography variant="h5" color="primary">
							Productos
						</Typography>
					</Grid>
					<Grid item>
						<CreateProduct />
					</Grid>
				</Grid>
				<Grid item>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Producto</TableCell>
									<TableCell align="right">Precio ($)</TableCell>
									<TableCell align="right">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow key={row.name}>
										<TableCell align="left">{row.name}</TableCell>
										<TableCell align="right">$ {row.price}</TableCell>
										<TableCell align="right">
											<IconButton disabled>
												<DeleteIcon />
											</IconButton>
											<IconButton disabled>
												<EditIcon />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Container>
	);
};

export default MainScreen;
