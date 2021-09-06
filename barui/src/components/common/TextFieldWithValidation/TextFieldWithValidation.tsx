import React, { useCallback, useState } from "react";

import { ValidationSetting } from "../../SignUp/validationSettings";

import TextField from "@material-ui/core/TextField";

export type TextFieldWithValidationProps = {
	className: string;
	label: string;
	placeholder: string;
	value: string;
	onChange: Function;
	required?: boolean;
	settings?: Array<ValidationSetting>;
	type?: "text" | "password" | "email";
	InputProps?: any;
	isValidCallback?: Function;
	disabled?: boolean;
};

const TextFieldWithValidation = ({
	className,
	label,
	placeholder,
	value,
	onChange,
	required,
	settings,
	type = "text",
	InputProps,
	isValidCallback,
	disabled = false,
}: TextFieldWithValidationProps) => {
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState("");

	const handleChange = useCallback(
		({ target: { value } }) => {
			let hasError = false;
			let messages: string[] = [];
			settings &&
				settings.forEach(setting => {
					const isValid = setting.validate(value);

					hasError = hasError || isValid;
					isValid && messages.push(setting.message);
				});
			hasError !== error && setError(hasError);
			isValidCallback && isValidCallback(hasError);
			setHelperText(messages.join(", "));

			onChange(value, hasError);
		},
		[onChange, settings, error, setError, setHelperText, isValidCallback]
	);

	return (
		<TextField
			className={className}
			label={label}
			error={error}
			helperText={helperText}
			placeholder={placeholder}
			fullWidth
			margin="normal"
			InputLabelProps={{
				shrink: true,
				style: { fontSize: 20 },
			}}
			InputProps={InputProps}
			value={value}
			onChange={handleChange}
			required={error && required}
			type={type}
			disabled={disabled}
		/>
	);
};

export default TextFieldWithValidation;
