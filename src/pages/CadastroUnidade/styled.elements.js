import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 80%;
    margin: 0 35px;
    
    
    @media screen and (min-width: 580px) {
        width: 100%;
        margin: 0 60px;
    }
`;

export const FormTitle = styled.h2`
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 28px;
    color: #374557;

    margin: 50px 0;

    @media screen and (max-width: 400px) {
        font-size: 18px;
        margin: 30px 0;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    width: 100%;
    
    @media screen and (min-width: 580px) {
        width: 50%;
    }
`;