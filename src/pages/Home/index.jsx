import { Form, Greetings, Main, SolarLogo, MainPicture, Login } from "./styled.elements";
import logo from "../../assets/logo1.png";
import InputLogin from "../../components/InputLogin";
import HomeButton from "../../components/HomeButton";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Home() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({
        email: false,
        password: false
    })

    const redirect = useNavigate()

    const handleSubmission = (e) => {
        e.preventDefault()
        
        const errorsArray = []

        if (!email) {
            setError({...error, email: true})
            errorsArray.push('Campo de email é obrigatório!')
        }

        if (!password) {
            setError({...error, password: true})
            errorsArray.push('Campo de senha é obrigatório!')
        }

        if (errorsArray.length > 0) {
            errorsArray.map(error => {
                return toast.error(error)
            })
        } else {
            redirect('/dashboard')
        }
    }

    return (
        <Main>
            <ToastContainer />
            <MainPicture />
            <Login>
                <SolarLogo
                    src={logo}
                />
                <Greetings>Seja bem vindo</Greetings>
                <Form onSubmit={handleSubmission}>
                    <InputLogin 
                        label='mail' 
                        type='email' 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value); setError({...error, email: false})}}
                        error={error.email}
                    />
                    <InputLogin 
                        label='password' 
                        type='password' 
                        value={password} 
                        onChange={(e) => {setPassword(e.target.value); setError({...error, password: false})}}
                        error={error.password}
                    />
                    <HomeButton>Entrar</HomeButton>
                </Form>
            </Login>
        </Main>
    )
}