import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./styles";
import DataTableRow from "./DataTableRow";

export type ColumnDef = {
	title: string;
	propName: Function;
	align?: "left" | "right" | "inherit" | "center" | "justify";
};

type Props = {
	data: any[];
	columnsDef: ColumnDef[];
	onEditRow?: Function;
	onDeleteRow?: Function;
	variant?: "outlined" | "elevation";
};

const DataTable = ({ columnsDef, data, onEditRow, onDeleteRow, variant }: Props) => {
	const classes = styles();

	return (
		<TableContainer component={Paper} variant={variant}>
			<Table className={classes.table}>
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
						<DataTableRow
							columnsDef={columnsDef}
							key={`row-${index}}`}
							onEditRow={onEditRow}
							onDeleteRow={onDeleteRow}
							row={row}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DataTable;
