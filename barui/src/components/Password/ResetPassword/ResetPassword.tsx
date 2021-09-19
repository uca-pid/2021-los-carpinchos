import React, { useState, useCallback, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { Input } from "../../Login/Login";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";

import PasswordTextField from "../../common/PasswordTextField";

import styles from "./styles";

import { passwordSetting, ValidationSetting } from "../../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { resetPassword } from "../../../ducks/sessionReducer";

export type LoginInput = {
	password: Input;
	verifyPassword: Input;
};

type Props = {
	actions: {
		resetPassword: Function;
	};
	savedEmail: string;
	previousPath: string;
};

const ResetPassword = ({ actions, savedEmail, previousPath }: Props) => {
	const [input, setInput] = useState<LoginInput>({
		password: { invalid: true, value: "" },
		verifyPassword: { invalid: true, value: "" },
	});
	const history = useHistory();

	const classes = styles();

	useEffect(() => {
		previousPath !== "securityCodeValidation" && history.replace("/");
	}, [previousPath, history]);

	const handleChangePassword = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, password: { value, invalid } })),
		[setInput]
	);

	const handleChangeVerifyPassword = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, verifyPassword: { value, invalid } })),
		[setInput]
	);

	const resetPassword = useCallback(() => {
		actions.resetPassword(savedEmail, input.password.value).then(() => history.push("/login"));
	}, [actions, savedEmail, input, history]);

	const passwordCheckValidation: ValidationSetting = {
		message: "La contraseña no coincide",
		validate: useCallback(password => password !== input.password.value, [input]),
	};

	return (
		<Container maxWidth="sm">
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} variant="h5" component="h2">
						Reiniciar Contraseña
						<Typography variant="body1" component="h2">
							Cuenta: {savedEmail ?? "ACCOUNT_EMAIL"}
						</Typography>
					</Typography>
					<Grid container direction="column" spacing={3}>
						<Grid item xs>
							<PasswordTextField
								className={classes.textField}
								label="Contraseña Nueva"
								placeholder="Ingresar contraseña"
								value={input.password.value}
								onChange={handleChangePassword}
								required
								settings={[passwordSetting]}
							/>
						</Grid>
						<Grid item xs>
							<PasswordTextField
								className={classes.textField}
								label="Verificar contraseña"
								placeholder="Ingresa nuevamente la contraseña"
								value={input.verifyPassword.value}
								onChange={handleChangeVerifyPassword}
								required
								settings={[passwordSetting, passwordCheckValidation]}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button
						color="secondary"
						className={classes.loginButton}
						size="small"
						variant="contained"
						onClick={resetPassword}
						disabled={
							input.password.invalid ||
							input.verifyPassword.invalid ||
							input.password.value !== input.verifyPassword.value
						}
					>
						Reestablecer contraseña
					</Button>
				</CardActions>
			</Card>
		</Container>
	);
};

type State = {
	session: {
		accountData: {
			email: string;
		};
		previousPath: string;
	};
};

const mapStateToProps = (state: State) => ({
	savedEmail: state.session.accountData.email ?? "",
	previousPath: state.session.previousPath,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			resetPassword,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
