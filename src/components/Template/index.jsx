import logo2 from "../../assets/logo_menu.png";
import logo1 from "../../assets/logo1.png";
import { useLocation } from "react-router-dom";

import { Header, MenuIcon, SolarLogo, PageTitle, MenuButton, NavButton, Gear, Dash, Graph, Nav, NavLogo, NavOption, NavList, Container, Main, MainContainer, Anchor, CloseMenuIcon } from "./styled.elements";
import Home from "../../pages/Home";
import { useState } from "react/cjs/react.development";

export default function Template({ children, page }) {

    const [isShown, setShow] = useState(false)

    const { pathname } = useLocation()

    return pathname !== '/' ? (
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
                            </Anchor></li>
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
    ) : (
        <Home />
    )
}