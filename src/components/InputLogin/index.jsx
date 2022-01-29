import { InputContainer, InputWrapper, LockIcon, MailIcon, StyledInput } from "./styled.elements"



export default function InputLogin({ label, error, ...rest }) {
    return (
        <InputContainer>
            <InputWrapper error={error}>
                {
                    label === 'mail' ?
                        <MailIcon /> : (
                            label === 'password' && <LockIcon />
                        )

                }
                <StyledInput
                    placeholder={
                        label === 'mail' ? 'E-mail' : (label === 'password' && 'Senha')
                    }

                    {...rest}
                />
            </InputWrapper>
        </InputContainer>
    )
}