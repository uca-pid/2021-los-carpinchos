import React, { useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";

export type ValidationSetting = {
	message: string;
	validate: Function;
};

export type TextFieldWithValidationProps = {
	className: string;
	label: string;
	placeholder: string;
	value: string;
	onChange: Function;
	required?: boolean;
	settings?: Array<ValidationSetting>;
	type?: "text" | "password" | "email";
	InputProps?: object;
	isValidCallback?: Function;
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
}: TextFieldWithValidationProps) => {
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState("");

	const handleChange = useCallback(
		({ target: { value } }) => {
			//validation
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
		[onChange, settings, error, setError, setHelperText]
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
			}}
			InputProps={InputProps}
			value={value}
			onChange={handleChange}
			required={error && required}
			type={type}
		/>
	);
};

export default TextFieldWithValidation;
