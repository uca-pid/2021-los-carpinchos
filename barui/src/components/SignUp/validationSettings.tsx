export type ValidationSetting = {
	message: string;
	validate: Function;
};

export const settings: ValidationSetting[] = [
	{
		message: "Debe contener menos de 30 caracteres",
		validate: (input: string) => input.length > 30,
	},
	{
		message: "El campo es requerido",
		validate: (input: string) => input.length === 0,
	},
];

export const emailSetting: ValidationSetting = {
	message: "Esta dirección de correo no es válida",
	validate: (email: string) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !re.test(String(email).toLowerCase());
	},
};

export const passwordSetting: ValidationSetting = {
	message: "La contraseña no es válida",
	validate: (password: string) => {
		const re = new RegExp(
			"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
		);
		return !re.test(String(password).toLowerCase());
	},
};
