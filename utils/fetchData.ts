import { APIResponse } from "~/types/ApiResponse";

type fetchDataArguments = {
	url: string;
	options?: {
		params?: Record<string, unknown>;
	};
};

export const fetchData = async <DataT>({
	url,
	options,
}: fetchDataArguments) => {
	try {
		const res = await $fetch<APIResponse<DataT>>(url, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
			params: {
				...options?.params,
			},
		});
		return res;
	} catch (error) {
		console.error("Error while fetching trending movies: " + error);
	}
};
