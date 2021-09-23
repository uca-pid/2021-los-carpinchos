import React, { useState, useCallback, useEffect } from "react";

import { Button, Container, Grid, Typography } from "@material-ui/core";
import DataTable from "../../../common/DataTable";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { selectCategory, getUserCategories } from "../../../../ducks/categoriesReducer";

import AddIcon from "@material-ui/icons/Add";
import { Category } from "../../../common/CategoryCombo/CategoryCombo";
import DeleteCategoryDialog from "./DeleteCategoryDialog/DeleteCategoryDialog";
import CategoryDialog from "./CategoryDialog";
import { GridColDef } from "@mui/x-data-grid";

type Props = {
	actions: {
		selectCategory: Function;
		getUserCategories: Function;
	};
	accountId: number;
	userCategories: Category[];
};

const CategoriesScreen = ({ actions, accountId, userCategories }: Props) => {
	const [open, setOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const columns: GridColDef[] = [{ field: "name", headerName: "Nombre", flex: 1 }];

	useEffect(() => {
		accountId && actions.getUserCategories(accountId);
	}, [actions, accountId]);

	const handleOpenDialog = useCallback(() => setOpen(true), [setOpen]);

	const handleEditRow = useCallback(
		category => {
			actions.selectCategory(category);
			setOpen(true);
		},
		[actions, setOpen]
	);

	const handleDeleteRow = useCallback(
		category => {
			actions.selectCategory(category);
			setDeleteOpen(true);
		},
		[actions, setDeleteOpen]
	);

	return (
		<Container maxWidth="md">
			<CategoryDialog open={open} setOpen={setOpen} />

			<DeleteCategoryDialog open={deleteOpen} setOpen={setDeleteOpen} />

			<Grid container direction="column" spacing={3}>
				<Grid alignItems="center" container item>
					<Grid item xs>
						<Typography variant="h5" color="primary">
							Categorias
						</Typography>
					</Grid>
					<Grid item>
						<Button
							color="secondary"
							onClick={handleOpenDialog}
							variant="contained"
							startIcon={<AddIcon />}
						>
							Crear
						</Button>
					</Grid>
				</Grid>
				<Grid item>
					<DataTable
						columns={columns}
						rows={userCategories.map(c => ({
							id: c.id,
							name: c.name,
							actions: c,
						}))}
						onEditRow={handleEditRow}
						onDeleteRow={handleDeleteRow}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
	categories: {
		userCategories: Category[];
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state.session.accountData.id,
	userCategories: state.categories.userCategories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators({ selectCategory, getUserCategories }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
