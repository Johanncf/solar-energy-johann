import styled from "styled-components";
import checkBG from "../../assets/check.png";

export const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 28px;
    margin-top: 10px;

    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: #53575D;

    @media screen and (min-width: 580px) {
        margin-bottom: 48px;
        margin-top: 28px;

        font-size: 24px;
    }
`;

export const CheckInput = styled.input`
    -webkit-appearance: none;
    border: 1px solid black;
    width: 29px;
    height: 28px;
    
    background-image: none;

    cursor: pointer;
    
    :checked {
        background: url(${checkBG}) no-repeat center, -webkit-linear-gradient(#fcfcfc, #DFDFDF);
        background-size: 22px;
    }

    @media screen and (max-width: 580px) {
        width: 20px;
        height: 20px;

        font-size: 14px;

        :checked {
            background-size: 14px;
        }
    }
`;