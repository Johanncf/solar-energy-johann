import { StyledButton } from "./styled.elements";

export default function HomeButton({ children, ...rest }) {
	return <StyledButton {...rest}>{children}</StyledButton>;
}
