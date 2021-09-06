import React, { useState, useCallback } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";

import { SignUpInput } from "../../../SignUp/SignUp";
import { emailSetting, passwordSetting, settings } from "../../../SignUp/validationSettings";
import TextFieldWithValidation from "../../../common/TextFieldWithValidation";
import PasswordTextField from "../../../common/PasswordTextField";

import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles";

const ProfileScreen = () => {
	const [input, setInput] = useState<SignUpInput>({
		email: { invalid: true, value: "ACCOUNT_EMAIL" },
		manager: { invalid: true, value: "ACCOUNT_MANAGER" },
		name: { invalid: true, value: "BAR_NAME" },
		password: { invalid: true, value: "AAAAAAAAAAA" },
	});
	const [editMode, setEditMode] = useState(false);

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

	const cancelChanges = useCallback(() => {
		setEditMode(false);
	}, [setEditMode]);

	const changeToEditMode = useCallback(() => setEditMode(true), [setEditMode]);
	const saveChanges = useCallback(() => console.log(input), [input]);

	return (
		<Grid container direction="column" spacing={3}>
			<Grid alignItems="center" container item>
				<Grid item xs>
					<Typography color="primary" variant="h5">
						Perfil
					</Typography>
				</Grid>
				<Grid item>
					{editMode && (
						<IconButton onClick={cancelChanges}>
							<CloseIcon color="error" />
						</IconButton>
					)}
					<IconButton
						color="primary"
						onClick={editMode ? saveChanges : changeToEditMode}
						disabled={editMode && true}
					>
						{editMode ? <SaveIcon /> : <EditIcon />}
					</IconButton>
				</Grid>
			</Grid>
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
						disabled={!editMode}
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
						disabled={!editMode}
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
						disabled={!editMode}
					/>
				</div>
			</Grid>
			<Grid item>
				<div className={classes.singleInputRow}>
					<PasswordTextField
						className={classes.textField}
						label="Contraseña"
						placeholder="Ingresar contraseña"
						value={input.password.value}
						onChange={handleChangePassword}
						required
						settings={[passwordSetting]}
						disabled
					/>
				</div>
			</Grid>
		</Grid>
	);
};

export default ProfileScreen;
