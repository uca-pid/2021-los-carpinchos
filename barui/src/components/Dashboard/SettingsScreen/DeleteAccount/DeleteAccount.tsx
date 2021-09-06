import React, { useState, useCallback } from "react";

import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import PasswordTextField from "../../../common/PasswordTextField";

import styles from "./styles";

const DeleteAccount = () => {
	const classes = styles();

	const [password, setPassword] = useState("");

	const handleChangePassword = useCallback((value, _) => setPassword(value), [setPassword]);
	return (
		<Grid container direction="column" spacing={3}>
			<Grid item xs>
				<Typography color="primary" variant="h5">
					Eliminar Cuenta
				</Typography>
			</Grid>
			<Grid item xs>
				<Typography color="primary" variant="body1">
					Esta acción es irreversible. Para borrar tu cuenta de MyBar ingresa a continuación tu contraseña y
					confirma.
				</Typography>
			</Grid>
			<Grid item>
				<div className={classes.singleInputRow}>
					<PasswordTextField
						className={classes.textField}
						label="Contraseña"
						placeholder="Ingresar contraseña"
						value={password}
						onChange={handleChangePassword}
						required
					/>
				</div>
			</Grid>
			<Grid item xs>
				<Typography variant="body1" color="error">
					! Contraseña incorrecta. Intente de nuevo.
				</Typography>
			</Grid>
			<Grid item xs>
				<Button color="secondary" size="small" variant="contained" disabled={password.length === 0}>
					Borrar cuenta
				</Button>
			</Grid>
		</Grid>
	);
};

export default DeleteAccount;
