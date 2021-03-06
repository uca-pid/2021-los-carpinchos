import React, { useState, useCallback } from "react";

import { Input, LoginInput } from "../Login/Login";
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

import { settings, emailSetting, passwordSetting, ValidationSetting } from "./validationSettings";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { signUp } from "../../ducks/sessionReducer";

export type SignUpInput = LoginInput & {
	manager: Input;
	name: Input;
};

type Props = {
	actions: {
		signUp: Function;
	};
};

const SignUp = ({ actions }: Props) => {
	const [verifyPassword, setVerifyPassword] = useState("");
	const [input, setInput] = useState<SignUpInput>({
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

	const createAccount = useCallback(() => {
		actions
			.signUp(input.name.value, input.manager.value, input.email.value, input.password.value)
			.then(() => {
				history.push("/login");
			})
			.catch(() => {
				setInput(prev => ({ ...prev, email: { value: "", invalid: true } }));
			});
	}, [actions, input, history, setInput]);

	const handleEnterPress = useCallback(
		() =>
			!input.name.invalid &&
			!input.manager.invalid &&
			!input.email.invalid &&
			!input.password.invalid &&
			input.password.value === verifyPassword &&
			createAccount(),
		[createAccount, input, verifyPassword]
	);

	const passwordCheckValidation: ValidationSetting = {
		message: "La contrase??a no coincide",
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
									label="Correo electr??nico"
									placeholder="Ingresar correo electr??nico"
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
									label="Contrase??a"
									placeholder="Ingresar contrase??a"
									value={input.password.value}
									onChange={handleChangePassword}
									required
									settings={[passwordSetting]}
								/>
							</Grid>
							<Grid item xs>
								<PasswordTextField
									className={classes.textField}
									label="Verificar contrase??a"
									placeholder="Ingresa nuevamente la contrase??a"
									value={verifyPassword}
									onChange={handleChangeVerifyPassword}
									onEnterPress={handleEnterPress}
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
								<Typography className={classes.loginText}>??Ya tenes cuenta? Inicia sesi??n</Typography>
							</Link>
						</Grid>
						<Grid item xs></Grid>
						<Grid item>
							<Button
								color="secondary"
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			signUp,
		},
		dispatch
	),
});

export default connect(null, mapDispatchToProps)(SignUp);
