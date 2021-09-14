import React, { useCallback } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import styles from "./styles";
import { Grid } from "@material-ui/core";

type Props = {
	buttonLabel: string;
	dialogContent?: any;
	dialogTitle: string;
	open: boolean;
	onDialogClose?: Function;
	onSubmit: Function;
	setOpen: Function;
	submitButtonDisabled: boolean;
	submitButtonLabel: string;
	title: string;
};

const AddButton = ({
	buttonLabel,
	dialogContent,
	dialogTitle,
	open,
	onDialogClose,
	onSubmit,
	setOpen,
	submitButtonDisabled,
	submitButtonLabel,
}: Props) => {
	const classes = styles();

	const handleClickOpen = useCallback(() => setOpen(true), [setOpen]);

	const handleClose = useCallback(() => {
		setOpen(false);
		onDialogClose && onDialogClose();
	}, [setOpen, onDialogClose]);

	const handleSubmit = useCallback(() => onSubmit(), [onSubmit]);

	return (
		<>
			<Button color="secondary" onClick={handleClickOpen} size="small" variant="contained">
				{buttonLabel}
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogContent>{dialogContent()}</DialogContent>
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
								color="primary"
								variant="outlined"
								disabled={submitButtonDisabled}
							>
								{submitButtonLabel}
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		</>
	);
};
export default AddButton;
