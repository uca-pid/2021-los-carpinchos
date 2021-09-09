import React, { useState, useCallback } from "react";

import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Grid, Link } from "@material-ui/core";

import PasswordTextField from "../common/PasswordTextField";

import styles from "./styles";
import TextFieldWithValidation from "../common/TextFieldWithValidation";

import { settings, emailSetting } from "../SignUp/validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { login } from "../../ducks/sessionReducer";

export type Input = {
	invalid: boolean;
	value: string;
};

export type LoginInput = {
	email: Input;
	password: Input;
};

type Props = {
	actions: {
		login: Function;
	};
	error: boolean;
	errorMessage: string;
};

const Login = ({ actions, error, errorMessage }: Props) => {
	const [input, setInput] = useState<LoginInput>({
		email: { invalid: true, value: "" },
		password: { invalid: true, value: "" },
	});

	const history = useHistory();

	const classes = styles();

	const handleChangeEmail = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, email: { value, invalid } })),
		[setInput]
	);

	const handleChangePassword = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, password: { value, invalid } })),
		[setInput]
	);

	const handleLogin = useCallback(() => {
		actions
			.login(input.email.value, input.password.value)
			.then(() => {
				history.push("/dashboard");
			})
			.catch(() => {
				setInput(prev => ({
					...prev,
					password: { invalid: true, value: "" },
				}));
			});
	}, [input, actions, history, setInput]);

	const createAccount = useCallback(() => history.push("/signUp"), [history]);

	const resetPassword = useCallback(() => history.push("/resetPassword"), [history]);

	return (
		<Container maxWidth="sm">
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} variant="h5" component="h2">
						Iniciar Sesión
					</Typography>
					<Grid container direction="column" item spacing={5}>
						<Grid item xs>
							<TextFieldWithValidation
								className={classes.textField}
								label="Correo electrónico"
								placeholder="Ingresar correo electrónico"
								value={input.email.value}
								onChange={handleChangeEmail}
								required
								settings={[...settings, emailSetting]}
								type="email"
							/>
						</Grid>
						<Grid item xs>
							<PasswordTextField
								className={classes.textField}
								label="Contraseña"
								placeholder="Ingresar contraseña"
								value={input.password.value}
								onChange={handleChangePassword}
								required
							/>
							<div className={classes.resetPasswordText}>
								<Link onClick={resetPassword}>
									<Typography>¿Olvidaste tu contraseña?</Typography>
								</Link>
							</div>
						</Grid>
						{error && (
							<Grid item xs>
								<Typography variant="body1" color="error">
									{errorMessage}
								</Typography>
							</Grid>
						)}
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Grid alignItems="center" container direction="column" spacing={3}>
						<Grid item xs>
							<Button
								color="secondary"
								className={classes.loginButton}
								size="small"
								variant="contained"
								onClick={handleLogin}
								disabled={input.email.invalid || input.password.value === ""}
							>
								Iniciar Sesión
							</Button>
						</Grid>

						<Grid item xs>
							<Link onClick={createAccount}>
								<Typography className={classes.signUpText}>¿Aún no tenes cuenta? Crear cuenta</Typography>
							</Link>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Container>
	);
};

type State = {
	session: {
		error: {
			value: boolean;
			message: string;
		};
	};
};

const mapStateToProps = (state: State) => ({
	error: state?.session?.error?.value,
	errorMessage: state?.session?.error?.message,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			login,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
