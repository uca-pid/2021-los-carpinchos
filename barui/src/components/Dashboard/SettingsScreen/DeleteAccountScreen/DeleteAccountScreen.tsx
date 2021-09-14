import React, { useState, useCallback } from "react";

import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import PasswordTextField from "../../../common/PasswordTextField";

import styles from "./styles";

import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { deleteAccount } from "../../../../ducks/sessionReducer";

type Props = {
	actions: {
		deleteAccount: Function;
	};
	id: number;
	email: string;
};

const DeleteAccountScreen = ({ actions, id, email }: Props) => {
	const classes = styles();
	const history = useHistory();

	const [password, setPassword] = useState("");

	const handleChangePassword = useCallback((value, _) => setPassword(value), [setPassword]);

	const handleDeleteAccount = useCallback(() => {
		actions
			.deleteAccount(id, email, password)
			.then(() => {
				localStorage.setItem("isLoggedIn", "false");
				history.push("/");
			})
			.catch(() => {
				setPassword("");
			});
	}, [actions, history, password, email, id]);

	return (
		<Grid container direction="column" spacing={3}>
			<Grid item xs>
				<Typography color="primary" variant="h5">
					Eliminar Cuenta
				</Typography>
			</Grid>
			<Grid item xs>
				<Typography color="primary" variant="body1">
					Esta acción es irreversible. Para borrar tu cuenta de MyBar ingresa a continuación tu
					contraseña y confirma.
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
				<Button
					color="secondary"
					size="small"
					variant="contained"
					disabled={password.length === 0}
					onClick={handleDeleteAccount}
				>
					Borrar cuenta
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
			deleteAccount,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountScreen);
