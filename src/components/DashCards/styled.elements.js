import styled from "styled-components";

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    margin: 50px;

 
`;

export const DashCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    border: 1px solid #E5E5E5;
    border-radius: 6px;

    width: 250px;
    padding: 20px 10px;

    background-color: white;

    cursor: pointer;

    :hover {
        border-color: #3751FF;

        h1, h3 {
            color: #3751FF;
        }
    }

    @media screen and (max-width: 420px) {
        width: 75%;
    }
`;

export const CardTitle = styled.h3`
    font-family: 'Mulish', sans-serif;
    font-size: 20px;
    color: #9FA2B4;
    text-align: center;

    @media screen and (max-width: 530px) {
        font-size: 15px;
    }
`;

export const CardInfo = styled.h1`
    font-family: 'Mulish', sans-serif;
    font-size: 40px;
    color: #252733;

    @media screen and (max-width: 530px) {
        font-size: 20px;
    }
`