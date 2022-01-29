import { Input, Label } from "./styled.elements";

export default function InputReg({ label, ...rest }) {
    return (
        <>
            <Label>
                {label}
                <br/><Input {...rest}/>
            </Label>
        </>
    )
}