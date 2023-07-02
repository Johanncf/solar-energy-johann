import axios from "axios";

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
