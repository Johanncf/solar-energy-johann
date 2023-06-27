import axios from "axios";
import { useCallback, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { tokenRequest } from "../config/msalConfiguration";

const apiBaseUrl = "https://localhost:7289/api"

const connection = axios.create({
	baseURL: apiBaseUrl,
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

const useFetchWithMsal = () => {
	const { instance } = useMsal();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	
	const execute = async (method, endpoint, data = null) => {
		const { accessToken, msalError } = await getMsalTokenRedirect(instance);
		if (msalError) {
			setError(msalError);
			return;
		}
		
		if (accessToken) {
			try {
				let response = null;

				const headers = new Headers();
				const bearer = `Bearer ${accessToken}`;
				headers.append("Authorization", bearer);

				if (data) headers.append("Content-Type", "application/json");

				let options = {
					method: method,
					headers: headers,
					body: data ? JSON.stringify(data) : null,
				};

				setIsLoading(true);

				response = await fetch(apiBaseUrl + endpoint, options);
				if (response.status) {
					setError(response);
					return;
				}
				let apiData = await response.json();

				console.log("Api Response: " + response);
				setData(apiData);
				setIsLoading(false);

				return apiData;
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
		execute: useCallback(execute, [instance]), // to avoid infinite calls when inside a `useEffect`
	};
};

const getMsalTokenRedirect = async (instance) => {
	const request = tokenRequest(instance);

	try {
		let tokenAcquisitionResult = await instance.acquireTokenSilent(request);
		return {
			accessToken: tokenAcquisitionResult.accessToken,
			msalError: null
		};
	} catch (error) {
		return {
			accessToken: null,
			msalError: error
		};
	}
};

export default useFetchWithMsal;
