import { StyledButton } from './styled.elements'

export default function RegButton({children, ...rest}) {
    return (
        <StyledButton {...rest}>
            {
                children
            }
        </StyledButton>
    )
}