import React, { useState, useCallback, useEffect } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";

import { SignUpInput } from "../../../SignUp/SignUp";
import { emailSetting, passwordSetting, settings } from "../../../SignUp/validationSettings";
import TextFieldWithValidation from "../../../common/TextFieldWithValidation";
import PasswordTextField from "../../../common/PasswordTextField";

import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { updateAccountData } from "../../../../ducks/sessionReducer";

type Props = {
	actions: {
		updateAccountData: Function;
	};
	accountName: string;
	manager: string;
	email: string;
	id: number;
};

const ProfileScreen = ({ actions, accountName, manager, email, id }: Props) => {
	const [input, setInput] = useState<SignUpInput>({
		email: { invalid: true, value: "" },
		manager: { invalid: true, value: "" },
		name: { invalid: true, value: "" },
		password: { invalid: true, value: "" },
	});
	const [editMode, setEditMode] = useState(false);

	const classes = styles();

	useEffect(() => {
		setInput({
			email: { invalid: false, value: email },
			manager: { invalid: false, value: manager },
			name: { invalid: false, value: accountName },
			password: { invalid: false, value: "AAAAAAAAAAAA" },
		});
	}, [email, manager, accountName]);

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
	const saveChanges = useCallback(() => {
		const data = {
			name: input.name.value !== accountName ? input.name.value : undefined,
			manager: input.manager.value !== manager ? input.manager.value : undefined,
			email: input.email.value !== email ? input.email.value : undefined,
			password: input.password.value !== "AAAAAAAAAAAA" ? input.password.value : undefined,
		};
		actions.updateAccountData(id, data).then(() => {
			setEditMode(false);
		});
	}, [actions, input, accountName, manager, email, id]);

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
						disabled={
							(editMode &&
								input.name.value === accountName &&
								input.manager.value === manager &&
								input.email.value === email &&
								input.password.value === "AAAAAAAAAAAA") ||
							input.name.invalid ||
							input.manager.invalid ||
							input.email.invalid ||
							input.password.invalid
						}
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
						disabled={!editMode}
					/>
				</div>
			</Grid>
		</Grid>
	);
};

type State = {
	session: {
		accountData: {
			name: string;
			manager: string;
			email: string;
			id: number;
		};
	};
};

const mapStateToProps = (state: State) => ({
	accountName: state.session.accountData.name,
	manager: state.session.accountData.manager,
	email: state.session.accountData.email,
	id: state.session.accountData.id,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			updateAccountData,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
