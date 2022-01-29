import styled from "styled-components";
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi'
import { FaChartPie } from 'react-icons/fa'
import { BsGraphUp, BsGearFill } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'


export const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: ${props => props.menu ? '100vh' : 'auto'};
    overflow: ${props => props.menu ? 'hidden' : 'inicial'};
    
    background-color: #f8f8f8;

    @media screen and (min-width: 960px) {
        flex-direction: row;
    }    
`;

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100vh;
    
    @media screen and (min-width: 960px) {
        order: 2;
        
        width: 80%;
    }   
`;

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    
    width: 100%;
    padding: 10px 20px;

    background-color: white;
    border-bottom: 1px solid #e2e2e2;

    position: relative;
    z-index: 999;
    
    box-sizing: border-box;

    text-align: center;

    @media screen and (min-width: 960px) {
        height: fit-content;
        padding: 33px 0 33px 40px;

        border: none;
    }    
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;

    overflow-y: auto;
    overflow-x: hidden;
`;

export const SolarLogo = styled.img`
    width: 2.8rem;

    @media screen and (min-width: 960px) {
        display: none;
    }
`;

export const NavLogo = styled.img`
    width: 15rem;

    display: none;

    @media screen and (min-width: 960px) {
        display: block;
    }
`;

export const MenuButton = styled.button`
    border: none;
    border-radius: 5px;
    
    cursor: pointer;

    @media screen and (min-width: 960px) {
        display: none;
    }
`;

export const MenuIcon = styled(BiMenuAltRight)`
    font-size: 1.8rem;
`;

export const CloseMenuIcon = styled(IoCloseSharp)`
    font-size: 1.8rem;
`;

export const PageTitle = styled.h1`
    font-family: 'Poppins', sans-serif;
    font-size: 30px;
    color: #374557;

    @media screen and (max-width: 400px) {
        font-size: large;
    }

    @media screen and (min-width: 960px) {
        font-size: 36px;
        font-weight: 700;
    }
`;

export const Nav = styled.nav`
    display: ${props => props.show ? 'flex' : 'none'};

    position: ${props => props.show ? 'absolute' : 'static'};
    z-index: 888;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100vh;

    background-color: white;

    @media screen and (min-width: 960px) {
        display: flex;
        order: 1;
        justify-content: flex-start;

        width: 20%;
        padding: 0 45px;
    }
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const NavButton = styled.button`
    display: flex;
    align-items: center;
    gap: 20px;

    background-color: ${props => props.active ? '#4CBC9A' : '#FFFFFF'};
    border: none;
    border-radius: 20px;
    box-shadow: ${props => props.active ? '0px 20px 50px rgba(55, 69, 87, 0.1)' : '0'};

    width: 252px;
    padding: 16px 24px;

    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: ${props => props.active ? '#FFFFFF' : '#A098AE'};

    cursor: pointer;

    svg {
        color: ${props => props.active ? '#FFFFFF' : '#A098AE'};
    }

    :hover {
        background-color: #4CBC9A;
        color: #FFFFFF;

        svg {
            color: #FFFFFF;
        }
    }

`;

export const Dash = styled(FaChartPie)`
    font-size: 1.8rem;
`;

export const Graph = styled(BsGraphUp)`
    font-size: 1.8rem;
    
`;

export const Gear = styled(BsGearFill)`
    font-size: 1.8rem;
`;

export const NavOption = styled.span`
    max-width: 150px;

    text-align: start;
`;

export const Anchor = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;
`;




