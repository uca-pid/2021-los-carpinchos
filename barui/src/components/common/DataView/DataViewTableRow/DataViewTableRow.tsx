import React, { useCallback } from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

import { ColumnDef } from "../DataView";

type Props = {
	columnsDef: ColumnDef[];
	row: any;
	onEditRow?: Function;
};

const DataViewTableRow = ({ columnsDef, row, onEditRow }: Props) => {
	const handleEdit = useCallback(() => onEditRow && onEditRow(row), [onEditRow, row]);

	return (
		<TableRow>
			{columnsDef.map((def: ColumnDef, key: number) => (
				<TableCell align={def.align} key={`cell-${key}}`}>
					{row[def.propName]}
				</TableCell>
			))}
			<TableCell align="right">
				<IconButton disabled={!onEditRow} onClick={handleEdit}>
					<EditIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default DataViewTableRow;
