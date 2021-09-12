import { useEffect } from "react";

import { connect } from "react-redux";

import { useSnackbar, OptionsObject } from "notistack";

type Props = {
	message: string;
	options: OptionsObject;
};

const Notification = ({ message, options }: Props) => {
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (message !== "") {
			enqueueSnackbar(message, options);
		}
	}, [message, options, enqueueSnackbar]);

	return null;
};

type State = {
	notifications: {
		notificationsMessage: string;
		notificationsOptions: OptionsObject;
	};
};

const mapStateToProps = (state: State) => ({
	message: state.notifications.notificationsMessage,
	options: state.notifications.notificationsOptions,
});

export default connect(mapStateToProps)(Notification);
