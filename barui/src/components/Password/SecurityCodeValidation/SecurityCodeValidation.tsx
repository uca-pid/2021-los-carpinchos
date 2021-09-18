import React, { useState, useCallback, useEffect } from "react";

import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import styles from "./styles";

import { settings, numericSetting, ValidationSetting } from "../../SignUp/validationSettings";
import TextFieldWithValidation from "../../common/TextFieldWithValidation";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { validateCode } from "../../../ducks/sessionReducer";

type Props = {
	actions: {
		validateCode: Function;
	};
	savedEmail: string;
	previousPath: string;
};

const SecurityCodeValidation = ({ actions, savedEmail, previousPath }: Props) => {
	const [code, setCode] = useState({ invalid: true, value: "" });
	const history = useHistory();
	const classes = styles();

	useEffect(() => {
		if (previousPath !== "requestPasswordReset") {
			history.replace("/");
		}
	}, [history, previousPath]);

	const handleValidate = useCallback(() => {
		actions
			.validateCode(savedEmail, code.value)
			.then(() => {
				history.push("/resetPassword");
			})
			.catch(() => setCode({ value: "", invalid: true }));
	}, [actions, savedEmail, code, history]);

	const handleChangeCode = useCallback((value, invalid) => setCode({ value, invalid }), [setCode]);

	const codeValidation: ValidationSetting = {
		message: "El código es de 7 digitos.",
		validate: (code: string) => !(code.length === 7),
	};

	return (
		<Container maxWidth="sm">
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} variant="h5" component="h2">
						Ingresar código de seguridad
						<Typography variant="body1" component="h2">
							Te enviamos un mail con un código de 7 digitos a: {savedEmail}
						</Typography>
					</Typography>
					<TextFieldWithValidation
						className={classes.textField}
						label="Código de Seguridad"
						placeholder="Ingresar código"
						value={code.value}
						onChange={handleChangeCode}
						required
						settings={[...settings, numericSetting, codeValidation]}
					/>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button
						color="secondary"
						className={classes.button}
						size="small"
						variant="contained"
						onClick={handleValidate}
						disabled={code.invalid}
					>
						Validar
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
			validateCode,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityCodeValidation);
