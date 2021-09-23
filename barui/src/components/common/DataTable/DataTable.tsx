import React, { useCallback } from "react";

import { GridColDef, DataGrid, GridRenderCellParams } from "@mui/x-data-grid";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

type Props = {
	columns?: GridColDef[];
	rows?: any[];
	onEditRow?: Function;
	onDeleteRow?: Function;
};

const DataTable = ({ columns = [], rows = [], onEditRow, onDeleteRow }: Props) => {
	const actionsColumn: GridColDef = {
		field: "actions",
		headerName: "Acciones",
		sortable: false,
		align: "right",
		flex: 0.5,
		headerAlign: "right",
		disableColumnMenu: true,
		renderCell: (params: GridRenderCellParams) => {
			const handleEdit = () => onEditRow && onEditRow(params.value);

			const handleDelete = () => onDeleteRow && onDeleteRow(params.value);
			return (
				<>
					<IconButton disabled={!onEditRow} onClick={handleEdit}>
						<EditIcon />
					</IconButton>
					<IconButton disabled={!onDeleteRow} onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				</>
			);
		},
	};

	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={[...columns, actionsColumn]}
				pageSize={5}
				disableSelectionOnClick
			/>
		</div>
	);
};

export default DataTable;
