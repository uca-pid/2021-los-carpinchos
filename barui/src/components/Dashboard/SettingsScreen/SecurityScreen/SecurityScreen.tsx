import React, { useState, useCallback } from "react";

import { Button, Grid, Typography } from "@material-ui/core";

import { passwordSetting, ValidationSetting } from "../../../SignUp/validationSettings";

import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { changePassword } from "../../../../ducks/sessionReducer";
import { Input } from "../../../Login/Login";
import PasswordTextField from "../../../common/PasswordTextField";

type SecurityInput = {
	currentPassword: Input;
	newPassword: Input;
	validatePassword: Input;
};

type Props = {
	actions: {
		changePassword: Function;
	};
	id: number;
	email: string;
};

const SecurityScreen = ({ actions, id, email }: Props) => {
	const [input, setInput] = useState<SecurityInput>({
		currentPassword: { invalid: true, value: "" },
		newPassword: { invalid: true, value: "" },
		validatePassword: { invalid: true, value: "" },
	});

	const classes = styles();

	const handleChangeCurrent = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, currentPassword: { value, invalid } })),
		[setInput]
	);

	const handleChangeNewPassword = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, newPassword: { value, invalid } })),
		[setInput]
	);

	const handleChangeValidatePassword = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, validatePassword: { value, invalid } })),
		[setInput]
	);

	const changePassword = useCallback(() => {
		actions.changePassword(id, email, input.currentPassword.value, input.newPassword.value).then(() =>
			setInput({
				currentPassword: { invalid: true, value: "" },
				newPassword: { invalid: true, value: "" },
				validatePassword: { invalid: true, value: "" },
			})
		);
	}, [actions, email, id, input]);

	const passwordCheckValidation: ValidationSetting = {
		message: "La contraseña no coincide",
		validate: useCallback(password => password !== input.newPassword.value, [input]),
	};

	return (
		<Grid container direction="column" item spacing={3}>
			<Grid item xs>
				<Typography color="primary" variant="h5">
					Cambiar contraseña
				</Typography>
			</Grid>
			<Grid item xs>
				<div className={classes.singleInputRow}>
					<PasswordTextField
						className={classes.textField}
						label="Contraseña actual"
						placeholder="Ingresar contraseña"
						value={input.currentPassword.value}
						onChange={handleChangeCurrent}
						required
					/>
				</div>
			</Grid>
			<Grid item xs>
				<div className={classes.singleInputRow}>
					<PasswordTextField
						className={classes.textField}
						label="Nueva contraseña"
						placeholder="Ingresar contraseña"
						value={input.newPassword.value}
						onChange={handleChangeNewPassword}
						required
						settings={[passwordSetting]}
					/>
				</div>
			</Grid>
			<Grid item xs>
				<div className={classes.singleInputRow}>
					<PasswordTextField
						className={classes.textField}
						label="Verificar nueva contraseña"
						placeholder="Ingresa nuevamente la contraseña"
						value={input.validatePassword.value}
						onChange={handleChangeValidatePassword}
						required
						settings={[passwordSetting, passwordCheckValidation]}
					/>
				</div>
			</Grid>
			<Grid item xs>
				<Button
					color="secondary"
					size="small"
					variant="contained"
					disabled={
						input.newPassword.invalid ||
						input.validatePassword.invalid ||
						input.newPassword.value !== input.validatePassword.value
					}
					onClick={changePassword}
				>
					Cambiar contraseña
				</Button>
			</Grid>
		</Grid>
	);
};

type State = {
	session: {
		accountData: {
			id: number;
			email: string;
		};
	};
};

const mapStateToProps = (state: State) => ({
	id: state.session.accountData.id,
	email: state.session.accountData.email,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			changePassword,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityScreen);
