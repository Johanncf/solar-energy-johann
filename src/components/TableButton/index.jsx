import { useNavigate } from "react-router-dom";

import { StyledButton } from "./styled.elements";

export default function TableButton({ action, row, children, onclick }) {

    const redirect = useNavigate()

    const editAction = () => {
        redirect(`/unidades/edicao/${row}`)
    }

    const removeAction = () => {
        onclick(row)
    }

    return (
        <StyledButton action={action} onClick={action === 'edit' ? editAction : removeAction}>
            {
                children
            }
        </StyledButton>
    )
}