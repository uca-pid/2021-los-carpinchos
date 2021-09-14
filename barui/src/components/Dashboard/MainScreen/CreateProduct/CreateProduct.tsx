import React, { useCallback, useEffect, useState } from "react";

import TextFieldWithValidation from "../../../common/TextFieldWithValidation";

import styles from "./styles";
import { Grid, InputAdornment } from "@material-ui/core";
import { settings, numericSetting } from "../../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getAllProducts, addNewProduct } from "../../../../ducks/productsReducer";
import AddButton from "../../../common/DataView/AddButton";

type Props = {
	actions: {
		getAllProducts: Function;
		addNewProduct: Function;
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

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, productName: { value, invalid } })),
		[setInput]
	);

	const handleChangePrice = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, price: { value, invalid } })),
		[setInput]
	);

	const handleAddProduct = useCallback(() => {
		actions
			.addNewProduct(input.productName.value, parseFloat(input.price.value), accountId)
			.then(() => {
				actions.getAllProducts(accountId).then(() => {
					setOpen(false);
				});
			});
	}, [actions, setOpen, input, accountId]);

	const handleEnterPress = useCallback(
		() => !input.price.invalid && !input.productName.invalid && handleAddProduct(),
		[handleAddProduct, input]
	);

	useEffect(() => {
		setInput({
			productName: { invalid: true, value: "" },
			price: { invalid: true, value: "" },
		});
	}, [open, accountId, setInput]);

	const dialogContent = useCallback(
		() => (
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
						onEnterPress={handleEnterPress}
						required
						InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
						settings={[...settings, numericSetting]}
					/>
				</Grid>
			</Grid>
		),
		[classes, input, handleChangeName, handleChangePrice, handleEnterPress]
	);

	return (
		<AddButton
			buttonLabel="Agregar producto!"
			dialogContent={dialogContent}
			dialogTitle="Agregar nuevo producto"
			open={open}
			onSubmit={handleAddProduct}
			setOpen={setOpen}
			submitButtonDisabled={input.price.invalid || input.productName.invalid}
			submitButtonLabel="Agregar"
			title="Producto Nuevo"
		/>
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
			addNewProduct,
			getAllProducts,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);
