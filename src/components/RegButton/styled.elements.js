import styled from "styled-components";

export const StyledButton = styled.button`
    width: auto;
    height: 45px;
    margin: ${props => props.margin};
    padding: 10px 20px;

    align-self: flex-start;

    border: none;
    border-radius: 20px;
    background-color: #4C5DF1;

    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;

    cursor: pointer;

    @media screen and (min-width: 400px) {
        width: 252px;
        height: 60px;

        padding: 0;
    }
    
    @media screen and (min-width: 960px) {
        align-self: ${props => props.align};
    }
`;