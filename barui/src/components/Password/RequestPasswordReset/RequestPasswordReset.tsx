import React, { useState, useCallback } from "react";

import { useHistory } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles";

import { settings, emailSetting } from "../../SignUp/validationSettings";
import TextFieldWithValidation from "../../common/TextFieldWithValidation";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { requestPasswordChange } from "../../../ducks/sessionReducer";
import { Grid } from "@material-ui/core";

type Props = {
	actions: {
		requestPasswordChange: Function;
	};
	savedEmail: string;
	loading: boolean;
};

const RequestPasswordReset = ({ actions, loading, savedEmail }: Props) => {
	const [email, setEmail] = useState({ invalid: savedEmail === "", value: savedEmail });
	const history = useHistory();

	const classes = styles();

	const handleRequest = useCallback(() => {
		actions
			.requestPasswordChange(email.value)
			.then(() => {
				history.push("/securityCodeValidation");
			})
			.catch(() => setEmail({ value: "", invalid: true }));
	}, [actions, email, history]);

	const handleChangeEmail = useCallback(
		(value, invalid) => setEmail({ value, invalid }),
		[setEmail]
	);

	return (
		<Container maxWidth="sm">
			<Card className={classes.card}>
				<CardContent>
					<Typography className={classes.title} variant="h5" component="h2">
						Reiniciar Contraseña
						<Typography variant="body1" component="h2">
							Ingresa el correo electrónico de tu cuenta de MyBar. Recibirás un email con un código de
							seguridad.
						</Typography>
					</Typography>
					<TextFieldWithValidation
						className={classes.textField}
						label="Correo electrónico"
						placeholder="Ingresar correo electrónico"
						value={email.value}
						onChange={handleChangeEmail}
						required
						settings={[...settings, emailSetting]}
						type="email"
					/>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Grid alignItems="center" container direction="column" spacing={3}>
						<Grid item xs>
							<Button
								color="secondary"
								className={classes.button}
								size="small"
								variant="contained"
								onClick={handleRequest}
								disabled={email.invalid || loading}
							>
								Enviar
							</Button>
						</Grid>
						{loading && (
							<Grid item xs>
								<CircularProgress />
							</Grid>
						)}
					</Grid>
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
		loading: boolean;
	};
};

const mapStateToProps = (state: State) => ({
	savedEmail: state.session.accountData.email ?? "",
	loading: state.session.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	actions: bindActionCreators(
		{
			requestPasswordChange,
		},
		dispatch
	),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestPasswordReset);
