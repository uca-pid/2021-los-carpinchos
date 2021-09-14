import React, { useCallback, useState } from "react";

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

export type ColumnDef = {
	title: string;
	propName: string;
	align?: "left" | "right" | "inherit" | "center" | "justify";
};

type Props = {
	addButton?: any;
	data: any[];
	columnsDef: ColumnDef[];
	title: string;
};

const DataView = ({ addButton, columnsDef, data, title }: Props) => {
	const [open, setOpen] = useState(false);
	const classes = styles();

	const handleSetOpen = useCallback(value => setOpen(value), [setOpen]);

	return (
		<Container maxWidth="md">
			<Grid container direction="column" spacing={3}>
				<Grid alignItems="center" container item>
					<Grid item xs>
						<Typography variant="h5" color="primary">
							{title}
						</Typography>
					</Grid>
					<Grid item>{addButton}</Grid>
				</Grid>
				<Grid item>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									{columnsDef.map((def: ColumnDef, key: number) => (
										<TableCell align={def.align} key={`headerTitle-${key}}`}>
											{def.title}
										</TableCell>
									))}
									<TableCell align="right">Acciones</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map((row, index) => (
									<TableRow key={`${row.name}-${index}`}>
										{columnsDef.map((def: ColumnDef, key: number) => (
											<TableCell align={def.align} key={`cell-${index}-${key}}`}>
												{row[def.propName]}
											</TableCell>
										))}
										<TableCell align="right">
											<IconButton disabled>
												<EditIcon />
											</IconButton>
											<IconButton disabled>
												<DeleteIcon />
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

export default DataView;
