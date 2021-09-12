import React, { useState, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextFieldWithValidation, {
	TextFieldWithValidationProps,
} from "../TextFieldWithValidation/TextFieldWithValidation";

const PasswordTextField = ({
	className,
	label,
	placeholder,
	value,
	onChange,
	onEnterPress,
	required,
	settings,
	disabled,
}: TextFieldWithValidationProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = useCallback(
		() => setShowPassword(!showPassword),
		[setShowPassword, showPassword]
	);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<TextFieldWithValidation
			className={className}
			label={label}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onEnterPress={onEnterPress}
			required={required}
			settings={settings}
			type={showPassword ? "text" : "password"}
			disabled={disabled}
			InputProps={{
				endAdornment: !disabled && (
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default PasswordTextField;
