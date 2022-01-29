import styled from "styled-components";

export const Label = styled.label`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #53575D;

    display: block;

    @media screen and (max-width: 580px) {
        font-size: 18px;
    }
`;

export const Input = styled.input`
    margin: 20px 0;
    width: ${props => props.size === 'large' ? '100%' : (props.size === 'small' && '50%')};
    height: 36px;
    padding: 5px 10px;

    border-radius: 4px;
    border: 1px solid ${props => props.error ? 'red' : 'black'};
    outline: none;

    font-size: 24px;

    @media screen and (max-width: 580px) {
        height: 20px;
        max-width: fit-content;

        font-size: 14px;
    }
`;