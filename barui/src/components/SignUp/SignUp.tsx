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
import TextFieldWithValidation, {
	ValidationSetting,
} from "../common/TextFieldWithValidation/TextFieldWithValidation";

type Input = {
	invalid: boolean;
	value: string;
};

type Account = {
	email: Input;
	manager: Input;
	name: Input;
	password: Input;
};

const SignUp = () => {
	const [verifyPassword, setVerifyPassword] = useState("");
	const [input, setInput] = useState<Account>({
		email: { invalid: true, value: "" },
		manager: { invalid: true, value: "" },
		name: { invalid: true, value: "" },
		password: { invalid: true, value: "" },
	});
	const history = useHistory();

	const classes = styles();

	const handleChangeName = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, name: { value, invalid } })),
		[setInput]
	);

	const handleChangeManager = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, manager: { value, invalid } })),
		[setInput]
	);

	const handleChangeEmail = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, email: { value, invalid } })),
		[setInput]
	);

	const handleChangePassword = useCallback(
		(value, invalid) => setInput(prev => ({ ...prev, password: { value, invalid } })),
		[setInput]
	);

	const handleChangeVerifyPassword = useCallback(
		value => setVerifyPassword(value),
		[setVerifyPassword]
	);

	const login = useCallback(() => history.push("/login"), [history]);

	const createAccount = useCallback(() => console.log(input), [input]);

	const settings: ValidationSetting[] = [
		{
			message: "Debe contener menos de 30 caracteres",
			validate: (input: string) => input.length > 30,
		},
		{
			message: "El campo es requerido",
			validate: (input: string) => input.length === 0,
		},
	];

	const emailSetting: ValidationSetting = {
		message: "Esta dirección de correo no es válida",
		validate: (email: string) => {
			const re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return !re.test(String(email).toLowerCase());
		},
	};

	const passwordSetting: ValidationSetting = {
		message: "La contraseña no es válida",
		validate: (password: string) => {
			const re = new RegExp(
				"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
			);
			return !re.test(String(password).toLowerCase());
		},
	};

	const passwordCheckValidation: ValidationSetting = {
		message: "La contraseña no coincide",
		validate: useCallback(password => password !== input.password.value, [input]),
	};

	return (
		<Container maxWidth="md">
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} variant="h5" component="h2">
						Crear cuenta
					</Typography>
					<Grid container direction="column" spacing={5}>
						<Grid container direction="row" item spacing={3}>
							<Grid item xs>
								<TextFieldWithValidation
									className={classes.textField}
									label="Nombre del bar"
									placeholder="Ingresar nombre del bar"
									value={input.name.value}
									onChange={handleChangeName}
									required
									settings={settings}
								/>
							</Grid>
							<Grid item xs>
								<TextFieldWithValidation
									className={classes.textField}
									label="Ecargado del bar"
									placeholder="Ingresar nombre del encargado"
									value={input.manager.value}
									onChange={handleChangeManager}
									required
									settings={settings}
								/>
							</Grid>
						</Grid>
						<Grid item>
							<div className={classes.singleInputRow}>
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
							</div>
						</Grid>
						<Grid container direction="row" item spacing={3}>
							<Grid item xs>
								<PasswordTextField
									className={classes.textField}
									label="Contraseña"
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
									value={verifyPassword}
									onChange={handleChangeVerifyPassword}
									required
									settings={[passwordSetting, passwordCheckValidation]}
								/>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Grid alignItems="center" container>
						<Grid item>
							<Link onClick={login}>
								<Typography>¿Ya tenes cuenta? Inicia sesión</Typography>
							</Link>
						</Grid>
						<Grid item xs></Grid>
						<Grid item>
							<Button
								color="primary"
								size="small"
								variant="contained"
								onClick={createAccount}
								disabled={
									input.name.invalid ||
									input.manager.invalid ||
									input.email.invalid ||
									input.password.invalid ||
									input.password.value !== verifyPassword
								}
							>
								Crear cuenta
							</Button>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Container>
	);
};
export default SignUp;
