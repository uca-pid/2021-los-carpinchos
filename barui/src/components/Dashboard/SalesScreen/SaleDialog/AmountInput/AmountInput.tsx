import React, { useCallback, useEffect, useState } from "react";

import { Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import styles from "./styles";

type Props = {
	amount: number;
	disabled?: boolean;
	onAdd: Function;
	onRemove: Function;
};

const AmountInput = ({ amount, disabled, onAdd, onRemove }: Props) => {
	const classes = styles();

	const handleAdd = useCallback(() => onAdd(), [onAdd]);
	const handleRemove = useCallback(() => onRemove(), [onRemove]);

	return (
		<Grid className={classes.container} alignItems="center" container direction="row" spacing={2}>
			<Grid item>
				<Typography>{amount}</Typography>
			</Grid>
			{!disabled && (
				<Grid item>
					<div>
						<Grid container direction="column">
							<Grid item>
								<IconButton color="primary" size="small" onClick={handleAdd}>
									<AddRoundedIcon />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton color="primary" size="small" onClick={handleRemove} disabled={amount === 0}>
									<RemoveRoundedIcon />
								</IconButton>
							</Grid>
						</Grid>
					</div>
				</Grid>
			)}
		</Grid>
	);
};

export default AmountInput;
