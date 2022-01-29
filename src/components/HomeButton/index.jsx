import { StyledButton } from "./styled.elements"

export default function HomeButton({children, ...rest}) {
    return (
        <StyledButton 
            type='submit' 
            {...rest}
        >{children}</StyledButton>
    )
}