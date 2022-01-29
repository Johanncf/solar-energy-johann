import styled from "styled-components";

export const CardsContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    @media screen and (min-width: 790px) {
        display: none;
        
    }
`;

export const CardBG = styled.div`
    background-color: rgba(76, 188, 154, 0.3);
    border: 3px solid rgba(76, 188, 154, 1);
    border-radius: 4px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    gap: 15px;
    
    width: 200px;
    padding: 10px;
`;

export const Spacer = styled.div`
    width: 100%;
    height: 20%;

    display: flex;
    justify-content: space-around;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 10px;

    width: 100%;

    border-radius: 4px;

    background-color: white;

    box-sizing: border-box;

    font-family: 'Raleway', sans-serif;
    font-size: 18px;
    font-weight: bold;
`;

export const UnitInfo = styled.span`
    font-family: 'Raleway', sans-serif;
    font-size: 18px;
    font-weight: 400;
`;