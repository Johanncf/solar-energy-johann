import styled from "styled-components";



export const StyledSelect = styled.select`
    margin: 20px 0;
    width: 50%;
    min-width: 125px;
    height: 48px;
    padding: 5px 10px;

    border-radius: 4px;
    border: 1px solid ${props => props.error ? 'red' : 'black'};
    outline: none;

    font-family: 'Raleway', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: #53575D;

    cursor: pointer;

    @media screen and (max-width: 580px) {
        width: 50%;
        height: 32px;

        font-size: 14px;
    }
`;

export const Option = styled.option`
    font-family: 'Raleway', sans-serif;
    font-size: 24px;
    font-weight: 400;
    color: #53575D;

    cursor: pointer;

    @media screen and (max-width: 580px) {
        font-size: 14px;
    }
`;