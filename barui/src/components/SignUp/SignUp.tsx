import React, { useState, useCallback } from "react";

import { BarType } from "./BarTypeSelect/BarTypeSelect";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";

import PasswordTextField from "../common/PasswordTextField";
import BarTypeSelect from "./BarTypeSelect";

import styles from "./styles";

type Account = {
	name: string;
	manager: string;
	type: BarType;
	email: string;
	password: string;
};

const SignUp = () => {
	const [info, setInfo] = useState<Account>({
		name: "",
		manager: "",
		type: "None",
		email: "",
		password: "",
	});

	const [verifyPassword, setVerifyPassword] = useState("");

	const classes = styles();

	const handleChangeName = useCallback(
		event => setInfo(prev => ({ ...prev, name: event.target.value })),
		[setInfo]
	);

	const handleChangeManager = useCallback(
		event => setInfo(prev => ({ ...prev, manager: event.target.value })),
		[setInfo]
	);

	const handleChangeType = useCallback(
		event => setInfo(prev => ({ ...prev, type: event.target.value })),
		[setInfo]
	);

	const handleChangeEmail = useCallback(
		event => setInfo(prev => ({ ...prev, email: event.target.value })),
		[setInfo]
	);

	const handleChangePassword = useCallback(
		event => setInfo(prev => ({ ...prev, password: event.target.value })),
		[setInfo]
	);

	const handleChangeVerifyPassword = useCallback(
		event => setVerifyPassword(event.target.value),
		[setVerifyPassword]
	);

	const createAccount = useCallback(() => console.log(info), [info]);

	return (
		<Container maxWidth="md">
			<Card className={classes.card}>
				<CardContent>
					<Typography variant="h5" component="h2">
						Crear cuenta
					</Typography>
					<Grid container direction="column" spacing={5}>
						<Grid container direction="row" item spacing={3}>
							<Grid item xs>
								<TextField
									label="Nombre del bar"
									placeholder="Ingresar nombre del bar"
									fullWidth
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
									value={info.name}
									onChange={handleChangeName}
								/>
							</Grid>
							<Grid item xs>
								<TextField
									label="Ecargado del bar"
									placeholder="Ingresar nombre del encargado"
									fullWidth
									margin="normal"
									InputLabelProps={{
										shrink: true,
									}}
									value={info.manager}
									onChange={handleChangeManager}
								/>
							</Grid>
						</Grid>
						<Grid item>
							<BarTypeSelect barType={info.type} setBarType={handleChangeType} />
						</Grid>
						<Grid item xs>
							<TextField
								label="Correo electrónico"
								placeholder="Ingresar correo electrónico de la empresa"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								value={info.manager}
								onChange={handleChangeEmail}
							/>
						</Grid>
						<Grid container direction="row" item spacing={3}>
							<Grid item xs>
								<PasswordTextField password={info.password} setPassword={handleChangePassword} />
							</Grid>
							<Grid item xs>
								<PasswordTextField password={verifyPassword} setPassword={handleChangeVerifyPassword} />
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Grid alignItems="center" container>
						<Grid item>
							<Typography>¿Ya tenes cuenta? Inicia sesión</Typography>
						</Grid>
						<Grid item xs></Grid>
						<Grid item>
							<Button color="primary" size="small" variant="contained" onClick={createAccount}>
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
