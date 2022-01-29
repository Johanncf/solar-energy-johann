import styled from "styled-components"
import { MdOutlineEmail } from 'react-icons/md';
import { VscLock } from 'react-icons/vsc'

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    border: 1px solid ${props => props.error ? 'red' : 'black'};
    border-radius: 10px;

    height: 32px;
    padding: 15px;
`;


export const MailIcon = styled(MdOutlineEmail)`
    color: #A098AE;
`;

export const LockIcon = styled(VscLock)`
    color: #A098AE;
`;


export const StyledInput = styled.input`
    border: none;
    background: none;
    outline: none;
    
    font-family: 'Roboto Slab', serif;

    @media screen and (min-width: 600px) {
        width: 100%;
    }
`