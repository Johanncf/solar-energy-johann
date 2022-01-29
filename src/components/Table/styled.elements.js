import styled from "styled-components";

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin: 150px 0 0 128px;
    
    @media screen and (max-width: 790px) {
        display: none;
    }
    
    @media screen and (max-width: 1100px) {
        margin: 150px 60px;
    }
`;

export const TableTitle = styled.h2`
    display: block;

    font-family: 'Poppins', sans-serif;
    color: #374557;
    font-size: 28px;
    font-weight: bold;
`;

export const UnitsTable = styled.table`
    width: 100%;
    margin-top: 50px;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const Thead = styled.thead`
    tr {
        background-color: #f8f8f8 !important;
    }
`;

export const Th = styled.th`
    font-family: 'Raleway', sans-serif;
    background-color: #f8f8f8;
    font-weight: 700;
    color: #25282B;
    
    text-align: left;
    vertical-align: middle;
    padding: 10px;
`;

export const Tr = styled.tr`
    border-bottom: 1px solid #e2e2e2;

    height: 40px;

    background-color: #ffffff;
`;

export const Td = styled.td`
    text-align: start;
    vertical-align: middle;
    padding: 10px;

    font-family: 'Raleway', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #53575D;
`;