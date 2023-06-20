import {
	Greetings,
	Main,
	SolarLogo,
	MainPicture,
	Login,
} from "./styled.elements";
import logo from "../../assets/logo1.png";
import HomeButton from "../../components/HomeButton";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMsal } from "@azure/msal-react";
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
} from "@azure/msal-react";

import { loginRequest, logoutRequest } from "../../config/msalConfiguration";

export default function Home() {
	const { instance } = useMsal();

	const handleLogin = async () => {
		try {
			await instance.loginRedirect(loginRequest);
		} catch (error) {
			console.log(error);
		}
	};

	const logOutAction = () => {
		instance.logoutRedirect(logoutRequest);
	};

	return (
		<Main>
			<ToastContainer />
			<MainPicture />
			<Login>
				<SolarLogo src={logo} />
				<Greetings>Seja bem vindo!</Greetings>
				<UnauthenticatedTemplate>
					<HomeButton onClick={() => handleLogin()}>
						Entrar
					</HomeButton>
				</UnauthenticatedTemplate>
				<AuthenticatedTemplate>
					<HomeButton onClick={() => logOutAction()}>Sair</HomeButton>
				</AuthenticatedTemplate>
			</Login>
		</Main>
	);
}
