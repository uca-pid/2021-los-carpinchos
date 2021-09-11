import React, { useCallback, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import TextFieldWithValidation from "../../../common/TextFieldWithValidation";

import styles from "./styles";
import { Grid, InputAdornment } from "@material-ui/core";
import { settings } from "../../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllProducts } from "../../../../ducks/sessionReducer";
import fetcher from "../../../../ducks/fetcher";

type Props = {
	actions: {
		getAllProducts: Function;
	};

	accountId: number;
};

const CreateProduct = ({ actions, accountId }: Props) => {
	const [open, setOpen] = React.useState(false);
	const [input, setInput] = useState({
		productName: { invalid: true, value: "" },
		price: { invalid: true, value: "" },
	});
	const classes = styles();

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, productName: { value, invalid } })),
		[setInput]
	);

	const handleChangePrice = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, price: { value, invalid } })),
		[setInput]
	);

	const handleAddProduct = useCallback(() => {
		fetcher
			.post("addNewProduct", {
				name: input.productName.value,
				price: parseInt(input.price.value),
				accountId,
			})
			.then(() => {
				actions.getAllProducts(accountId).then(() => {
					handleClose();
				});
			});
	}, [actions, handleClose, input, accountId]);

	useEffect(() => {
		setInput({
			productName: { invalid: true, value: "" },
			price: { invalid: true, value: "" },
		});
	}, [open, accountId, setInput]);

	return (
		<>
			<Button color="secondary" onClick={handleClickOpen} size="small" variant="contained">
				Agregar Producto
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Producto Nuevo</DialogTitle>
				<DialogContent>
					<Grid container direction="column" spacing={2}>
						<Grid item xs>
							<TextFieldWithValidation
								className={classes.textField}
								label="Nombre del producto"
								placeholder="Ingresar nombre del producto"
								value={input.productName.value}
								onChange={handleChangeName}
								required
								settings={settings}
							/>
						</Grid>
						<Grid item xs>
							<TextFieldWithValidation
								className={classes.textField}
								label="Precio"
								placeholder="Ingresar precio del producto"
								value={input.price.value}
								onChange={handleChangePrice}
								required
								InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
								settings={settings}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Grid container>
						<Grid item>
							<Button onClick={handleClose} color="primary">
								Cancelar
							</Button>
						</Grid>
						<Grid item xs></Grid>
						<Grid item>
							<Button
								onClick={handleAddProduct}
								color="primary"
								variant="outlined"
								disabled={input.price.invalid || input.productName.invalid}
							>
								Agregar
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
		};
	};
};

const mapStateToProps = (state: State) => ({
	accountId: state.session.accountData.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			getAllProducts,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
