import { Link } from "react-router-dom";
import styled from "styled-components";


export const UnitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 200px;

    margin-right: 10%;

    @media screen and (max-width: 790px) {
        margin: 50px 0;
        justify-content: center;
    }

    @media screen and (max-width: 1100px) {
        gap: 0;
    }
`;

export const Anchor = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;

    align-self: flex-end;

    margin-bottom: 50px;

    @media screen and (max-width: 790px) {
        align-self: center;
    }
`

