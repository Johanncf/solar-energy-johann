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
    CloseMenuIcon } from "./styled.elements";
import { useState } from "react/cjs/react.development";
import { useMsal } from "@azure/msal-react";

export default function Template({ children, page }) {
    const logOutAction = (setShow, instance) => {
        setShow(false);

        const logoutRequest = {
            account: instance.getActiveAccount(),
            postLogoutRedirectUri: "https://localhost:3000/",
        }
        instance.logoutRedirect(logoutRequest);
    }

    const [isShown, setShow] = useState(false)
    const { instance } = useMsal();

    const { pathname } = useLocation()

    return (
        <>
            <Container menu={isShown}>
                <Nav show={isShown}>
                    <NavLogo src={logo1} wideScreen={true} />
                    <NavList>
                        <li>
                            <Anchor to='/dashboard'>
                                <NavButton 
                                    active={pathname === '/dashboard' && true} 
                                    onClick={() => setShow(false)}
                                >
                                    <Dash /><NavOption>Dashboard</NavOption>
                                </NavButton>
                            </Anchor>
                        </li>
                        <li>
                            <Anchor to='/unidades'>
                                <NavButton 
                                    active={
                                        pathname.includes('/unidades') && true
                                    } 
                                    onClick={() => setShow(false)}>
                                    <Graph /><NavOption>Unidades</NavOption>
                                </NavButton>
                            </Anchor>
                        </li>
                        <li>
                            <Anchor to='/geracoes'>
                                <NavButton active={pathname === '/geracoes' && true} onClick={() => setShow(false)}>
                                    <Gear /><NavOption>Cadastro de energia gerada</NavOption>
                                </NavButton>
                            </Anchor>
                        </li>
                        <li>
                            <NavButton onClick={() => logOutAction(setShow, instance)}>
                                <Logout /><NavOption>Sair</NavOption>
                            </NavButton>
                        </li>
                    </NavList>
                </Nav>
                <MainContainer>
                    <Header>
                        <SolarLogo src={logo2} />
                        <PageTitle>
                            {
                                page === '/dashboard' ? 'Dashboard' : (
                                    page.includes('/unidades') ? 'Unidades' : (
                                        page === '/geracoes' && 'Lançamento de geração mensal'
                                    )
                                )
                            }
                        </PageTitle>
                        <MenuButton onClick={() => { setShow(!isShown) }}>
                            {
                                isShown ? <CloseMenuIcon /> : <MenuIcon />
                            }
                        </MenuButton>
                    </Header>
                    <Main>
                        {
                            children
                        }
                    </Main>
                </MainContainer>
            </Container>
        </>
    )
}