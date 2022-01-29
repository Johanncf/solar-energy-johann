import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: ${props => 
    props.action === 'edit' ? (
        '#8DB51B'
    ) : (
        props.action === 'remove' && '#D82D56'
    )};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    padding: 8px 16px;

    border: none;
    border-radius: 4px;

    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    font-size: 16px;
    color: #FBFCFF;

    cursor: pointer;
`;