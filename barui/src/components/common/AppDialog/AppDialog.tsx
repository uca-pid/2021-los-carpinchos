import React, { useCallback } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import styles from "./styles";
import { Grid } from "@material-ui/core";

type Props = {
	children?: any;
	title: string;
	open: boolean;
	onDialogClose?: Function;
	onSubmit: Function;
	setOpen: Function;
	submitButtonDisabled?: boolean;
	submitButtonLabel: string;
};

const AppDialog = ({
	title,
	open,
	onDialogClose,
	onSubmit,
	setOpen,
	submitButtonDisabled,
	submitButtonLabel,
	children,
}: Props) => {
	const classes = styles();

	const handleClose = useCallback(() => {
		setOpen(false);
		onDialogClose && onDialogClose();
	}, [setOpen, onDialogClose]);

	const handleSubmit = useCallback(() => onSubmit(), [onSubmit]);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<Grid container>
					<Grid item>
						<Button onClick={handleClose} color="primary">
							Cancelar
						</Button>
					</Grid>
					<Grid item xs></Grid>
					<Grid item>
						<Button
							onClick={handleSubmit}
							color="secondary"
							variant="contained"
							disabled={submitButtonDisabled}
						>
							{submitButtonLabel}
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</Dialog>
	);
};

export default AppDialog;
