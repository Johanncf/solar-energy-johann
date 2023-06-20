import logo2 from "../../assets/logo_menu.png";
import logo1 from "../../assets/logo1.png";
import { useLocation } from "react-router-dom";

import {
	Header,
	MenuIcon,
	SolarLogo,
	PageTitle,
	MenuButton,
	NavButton,
	Gear,
	Dash,
	Graph,
	Logout,
	Nav,
	NavLogo,
	NavOption,
	NavList,
	Container,
	Main,
	MainContainer,
	Anchor,
	CloseMenuIcon,
} from "./styled.elements";
import { useState } from "react/cjs/react.development";
import Home from "../../pages/Home";

import { useMsal } from "@azure/msal-react";
import { AuthenticatedTemplate } from "@azure/msal-react";
import { logoutRequest } from "../../config/msalConfiguration";

export default function Template({ children, page }) {
	const logOutAction = () => {
		setShow(false);

		const request = logoutRequest(instance);
		instance.logoutRedirect(request);
	};

	const [isShown, setShow] = useState(false);
	const { instance } = useMsal();

	const { pathname } = useLocation();

	if (pathname === "/") return <Home />;

	return (
		<AuthenticatedTemplate>
			<Container menu={isShown}>
				<Nav show={isShown}>
					<NavLogo src={logo1} wideScreen={true} />
					<NavList>
						<li>
							<Anchor to="/dashboard">
								<NavButton
									active={pathname === "/dashboard"}
									onClick={() => setShow(false)}
								>
									<Dash />
									<NavOption>Dashboard</NavOption>
								</NavButton>
							</Anchor>
						</li>
						<li>
							<Anchor to="/unidades">
								<NavButton
									active={pathname.includes("/unidades")}
									onClick={() => setShow(false)}
								>
									<Graph />
									<NavOption>Unidades</NavOption>
								</NavButton>
							</Anchor>
						</li>
						<li>
							<Anchor to="/geracoes">
								<NavButton
									active={pathname === "/geracoes"}
									onClick={() => setShow(false)}
								>
									<Gear />
									<NavOption>
										Cadastro de energia gerada
									</NavOption>
								</NavButton>
							</Anchor>
						</li>
						<li>
							<NavButton onClick={() => logOutAction()}>
								<Logout />
								<NavOption>Sair</NavOption>
							</NavButton>
						</li>
					</NavList>
				</Nav>
				<MainContainer>
					<Header>
						<SolarLogo src={logo2} />
						<PageTitle>
							{page === "/dashboard"
								? "Dashboard"
								: page.includes("/unidades")
								? "Unidades"
								: page === "/geracoes" &&
								  "Lançamento de geração mensal"}
						</PageTitle>
						<MenuButton
							onClick={() => {
								setShow(!isShown);
							}}
						>
							{isShown ? <CloseMenuIcon /> : <MenuIcon />}
						</MenuButton>
					</Header>
					<Main>{children}</Main>
				</MainContainer>
			</Container>
		</AuthenticatedTemplate>
	);
}
