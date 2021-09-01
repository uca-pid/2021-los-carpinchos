import React, { useState, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import styles from "./styles";

type Props = {
	password: string;
	setPassword: Function;
};

const PasswordTextField = ({ password, setPassword }: Props) => {
	const classes = styles();

	const [showPassword, setShowPassword] = useState(false);

	const handleChange = useCallback(event => setPassword(event), [setPassword]);

	const handleClickShowPassword = useCallback(
		() => setShowPassword(!showPassword),
		[setShowPassword, showPassword]
	);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<FormControl fullWidth>
			<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
			<Input
				type={showPassword ? "text" : "password"}
				value={password}
				onChange={handleChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default PasswordTextField;
