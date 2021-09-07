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

export type Input = {
	invalid: boolean;
	value: string;
};

export type LoginInput = {
	email: Input;
	password: Input;
};

const Login = () => {
	const [input, setInput] = useState<LoginInput>({
		email: { invalid: true, value: "" },
		password: { invalid: true, value: "" },
	});
	const [errorMessage, setErrorMessage] = useState(false);

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

	const login = useCallback(async () => {
		// authenticate user
		setErrorMessage(false);
		await fetch("http://127.0.0.1:8000/user_log_in/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: input.email.value,
				password: input.password.value,
			}),
		}).then(response => {
			if (response.status === 200) {
				localStorage.setItem("isLoggedIn", "true");
				history.push("/dashboard");
			} else if (response.status === 400) {
				setErrorMessage(true);
				setInput({
					email: { invalid: true, value: "" },
					password: { invalid: true, value: "" },
				});
			}
		});

		// successful login

		// login failed
		// display error in login screen
	}, [input, history, setErrorMessage, setInput]);

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
						{errorMessage && (
							<Grid item xs>
								<Typography variant="body1" color="error">
									! Usuario/Contraseña incorrecta. Intente de nuevo.
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
								onClick={login}
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
export default Login;
