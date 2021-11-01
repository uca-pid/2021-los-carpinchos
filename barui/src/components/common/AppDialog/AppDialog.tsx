import React, { useCallback } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/ClearRounded";

import styles from "./styles";
import { Grid } from "@material-ui/core";

type Props = {
	hideActions?: boolean;
	children?: any;
	title: string;
	open: boolean;
	onDialogClose?: Function;
	onSubmit?: Function;
	setOpen: Function;
	submitButtonDisabled?: boolean;
	submitButtonLabel: string;
};

const AppDialog = ({
	hideActions,
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

	const handleSubmit = useCallback(() => onSubmit && onSubmit(), [onSubmit]);

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<Grid alignItems="center" container>
					<Grid item>{title}</Grid>
					<Grid item xs></Grid>
					<Grid item></Grid>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Grid>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
			<DialogActions className={classes.dialogActions}>
				{!hideActions && (
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
				)}
			</DialogActions>
		</Dialog>
	);
};

export default AppDialog;
