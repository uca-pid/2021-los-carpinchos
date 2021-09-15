import React, { useCallback } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import styles from "./styles";
import DataTableRow from "./DataTableRow";

export type ColumnDef = {
	title: string;
	propName: string;
	align?: "left" | "right" | "inherit" | "center" | "justify";
};

type Props = {
	data: any[];
	columnsDef: ColumnDef[];
	onEditRow?: Function;
	onDeleteRow?: Function;
};

const DataTable = ({ columnsDef, data, onEditRow, onDeleteRow }: Props) => {
	const classes = styles();

	return (
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
