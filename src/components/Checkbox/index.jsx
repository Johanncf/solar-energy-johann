import { CheckInput, Label } from "./styled.elements";

export default function Checkbox({checked, ...rest}) {
    return (
        <>
            <Label>
                <CheckInput type='checkbox' checked={checked} {...rest}/> Ativo
            </Label>
        </>
    )
}