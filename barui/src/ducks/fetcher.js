const fetcher = ({ method, url, body, headers = null }) => {
	const settings = {
		headers: headers || {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method,
		body,
	};

	return fetch(`http://127.0.0.1:8000/${url}`, settings).then(response => {
		if (!response.ok) {
			return response.json().then(({ error }) => {
				throw new Error(error);
			});
		}
		// the catch is for responses with 200 but with no body.
		return response.json().catch(() => null);
	});
};

export const $get = url => {
	return fetcher({
		method: "GET",
		url,
	});
};

export const $post = (url, body) => {
	return fetcher({
		method: "POST",
		url,
		body: JSON.stringify(body),
	});
};

export const $put = (url, body) => {
	return fetcher({
		method: "PUT",
		url,
		body: JSON.stringify(body),
	});
};

export const $delete = url => {
	return fetcher({
		method: "DELETE",
		url,
	});
};

export default {
	get: $get,
	post: $post,
	put: $put,
	delete: $delete,
};
