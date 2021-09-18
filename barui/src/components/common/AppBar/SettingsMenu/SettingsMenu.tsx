import React, { useCallback } from "react";

import { useHistory } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withWidth from "@material-ui/core/withWidth";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ProductsMenuIcon from "@material-ui/icons/MenuBook";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import LogOutIcon from "@material-ui/icons/ExitToApp";

type Props = {
	width: Breakpoint;
};
const SettingsMenu = ({ width }: Props) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const history = useHistory();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = useCallback(() => {
		setAnchorEl(null);
	}, [setAnchorEl]);

	const goToProducts = useCallback(() => {
		history.push("/dashboard");
		handleClose();
	}, [history, handleClose]);

	const goToSettings = useCallback(() => {
		history.push("/dashboard ");
		handleClose();
	}, [history, handleClose]);

	const goToSales = useCallback(() => {
		history.push("/dashboard/settings/profile");
		handleClose();
	}, [history, handleClose]);

	const handleLogOut = useCallback(() => {
		handleClose();
		localStorage.setItem("isLoggedIn", "false");
		localStorage.removeItem("userId");
		history.push("/");
	}, [history, handleClose]);

	return (
		<div>
			<IconButton color="inherit" onClick={handleClick}>
				<MenuIcon />
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
				{width === "xs" && (
					<MenuItem onClick={goToProducts}>
						<ListItemIcon>
							<ProductsMenuIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Productos" />
					</MenuItem>
				)}
				{width === "xs" && (
					<MenuItem onClick={goToSales}>
						<ListItemIcon>
							<ReceiptIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText primary="Ventas" />
					</MenuItem>
				)}
				<MenuItem onClick={goToSettings}>
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

export default withWidth()(SettingsMenu);
