import axios from "axios";
import { useCallback, useState } from "react";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";


const connection = axios.create({
	baseURL: "https://localhost:7289/api",
});

export const axiosGET = async (request) => {
	try {
		const res = await connection.get(request);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const axiosPOST = async (URL, request) => {
	try {
		const res = await connection.post(URL, request);
		return res.status;
	} catch (error) {
		console.log(error);
	}
};

export const axiosPUT = async (id, request) => {
	try {
		const res = await connection.put(`/unidades/${id}`, request);
		return res.status;
	} catch (error) {
		console.log(error);
	}
};

export const axiosDELETE = async (request) => {
	let res;

	try {
		res = await connection.delete(`/unidades/${request}`);
	} catch (error) {
		console.log(error);
	}

	try {
		const res = await axiosGET(`geracoes/?nome=${request}`);
		res.map((generation) => {
			return connection.delete(`geracoes/${generation.id}`);
		});
	} catch (error) {
		console.log("Não existem dados de geração para esta unidade");
	}

	return res;
};

// ---------------------------------------------------------------------------

const useFetchWithMsal = (msalRequest = null) => {
	const { instance } = useMsal();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const { result, error: msalError } = useMsalAuthentication("redirect", {
		...msalRequest,
		scope: "https://solarenergyjohann.onmicrosoft.com/880155ac-ef66-4774-94b1-df98bf8b7c26/user_acess",
		account: instance.getActiveAccount(),
		redirectUri: "/dashboard",
	});

	const execute = async (method, endpoint, data = null) => {
		if (msalError) {
			setError(msalError);
			return;
		}

		if (result) {
			try {
				let response = null;

				const headers = new Headers();
				const bearer = `Bearer ${result.accessToken}`;
				headers.append("Authorization", bearer);

				if (data) headers.append("Content-Type", "application/json");

				let options = {
					method: method,
					headers: headers,
					body: data ? JSON.stringify(data) : null,
				};

				setIsLoading(true);

				response = await (await fetch("https://localhost:7289/api" + endpoint, options)).json();
				console.log("teste " + response)
				setData(response);

				setIsLoading(false);
				return response;
			} catch (e) {
				setError(e);
				setIsLoading(false);
				throw e;
			}
		}
	};

	return {
		isLoading,
		error,
		data,
		execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
	};
};

export default useFetchWithMsal;
