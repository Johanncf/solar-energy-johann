import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin: 120px 60px;

    @media screen and (max-width: 580px) {
        margin: 50px 35px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    width: 100%;
    
    @media screen and (min-width: 580px) {
        width: 70%;
    }
`;

export const DateWrapper = styled.div`
    width: 100%;
    margin-bottom: 30px;

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker__input-container {
        width: 50%;
        border-radius: 4px;
    }

    .datepicker {
        width: 100%;
        height: 40px;
        margin: 0;
        padding: 5px 10px;

        font-size: 24px;
        font-weight: normal;
        font-family: 'Raleway', sans-serif;
        color: ${props => props.changed ? '#000000' : '#A8A9AC'};

        border: 1px solid ${props => props.error ? 'red' : 'black'};
        border-radius: 4px;
        outline: none;

        box-sizing: border-box;

        @media screen and (max-width: 580px) {
            height: 32px;
        }
    }
`;

export const DateTitle = styled.h2`
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #53575D;

    margin-top: 10px;
    margin-bottom: 20px;

    @media screen and (max-width: 580px) {
        font-size: 18px;
    }
`

export const DateContainer = styled.div`
    width: 50%;
    min-width: 125px;
    
    div {
        background-color: white;

        height: 32px;

        @media screen and (min-width: 580px) {
            height: 48px;
        }
    }

    fieldset {
        border: 1px solid ${props => props.error ? 'red' : 'black'};
    }

    input {
        font-size: 20px;
        font-weight: 400;
        color: #53575D;
    }
`;
