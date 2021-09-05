import React, { useCallback } from "react";

import { useHistory } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import LogOutIcon from "@material-ui/icons/ExitToApp";

const SettingsMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const history = useHistory();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, [setAnchorEl]);

	const handleLogOut = useCallback(() => {
		handleClose();
		localStorage.setItem("isLoggedIn", "false");
		history.push("/");
	}, [history, handleClose]);

	return (
		<div>
			<IconButton color="inherit" onClick={handleClick}>
				<SettingsIcon />
			</IconButton>
			<Menu
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<ProfileIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Perfil" />
				</MenuItem>
				<MenuItem onClick={handleLogOut}>
					<ListItemIcon>
						<LogOutIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Cerrar Sesión" />
				</MenuItem>
			</Menu>
		</div>
	);
};

export default SettingsMenu;
