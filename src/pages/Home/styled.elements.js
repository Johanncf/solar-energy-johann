import styled from "styled-components";
import usina from "../../assets/usina.jpeg";

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 100vh;

	@media screen and (min-width: 960px) {
		flex-direction: row;
	}
`;

export const MainPicture = styled.div`
	display: none;

	@media screen and (min-width: 960px) {
		background-image: url(${usina});
		background-size: cover;
		background-repeat: no-repeat;
		background-position: bottom right -210px;

		display: block;

		width: 50%;
		height: 100%;
	}
`;

export const Login = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10%;

	height: 100%;
	width: 100%;

	@media screen and (min-width: 960px) {
		width: 50%;
	}
`;

export const SolarLogo = styled.img`
	width: 60%;

	@media screen and (min-width: 600px) {
		width: 40%;
	}
`;

export const Greetings = styled.p`
	font-family: "Roboto Slab", serif;
	font-weight: 600;
	color: #374557;
	font-size: 18px;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;

	margin-top: 20px;

	max-width: 518px;

	@media screen and (min-width: 600px) {
		width: 50%;
	}

	@media screen and (min-width: 960px) {
		width: 60%;
	}
`;
