import { Form, FormContainer, FormTitle } from "./styled.elements";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Checkbox from "../../components/Checkbox";
import InputReg from "../../components/InputReg";
import RegButton from "../../components/RegButton";

import { toast } from "react-toastify";

import { axiosGET, axiosPOST, axiosPUT } from "../../services/api";

import { v4 } from "uuid";

export default function CadastroUnidade({action}) {

    const {id} = useParams()
    const redirect = useNavigate()

    const [unit_id, setUnit_id] = useState('')
    const [nick, setNick] = useState('')
    const [adress, setAdress] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [check, setCheck] = useState(false)

    const [error, setError] = useState({
        nick: false,
        adress: false,
        brand: false, 
        model: false
    })

    useEffect(() => {
        async function callAPI() {
            const res = await axiosGET(`/unidades/?id=${id}`)

            setUnit_id(res[0].id)
            setNick(res[0].Apelido)
            setAdress(res[0].Local)
            setBrand(res[0].Marca)
            setModel(res[0].Modelo)
            setCheck(res[0].Ativo)
        }

        id && callAPI()

    }, [id])

    function handleNewUnit(e) {
        e.preventDefault()
        
        const errorsArray = []
        let fieldError = error

        if (!nick) {
            fieldError = {...fieldError, nick: true}
            errorsArray.push('Campo de apelido é obrigatório!')
        }

        if (!adress) {
            fieldError = {...fieldError, adress: true}
            errorsArray.push('Campo de localização é obrigatório!')
        }
        
        if (!brand) {
            fieldError = {...fieldError, brand: true}
            errorsArray.push('Campo de marca é obrigatório!')
        }
        
        if (!model) {
            fieldError = {...fieldError, model: true}
            errorsArray.push('Campo de modelo é obrigatório!')
        }

        if (errorsArray.length > 0) {

            errorsArray.map(error => {
                return toast.error(error)
            })

            setError(fieldError)

        } else {

            if (action === 'Cadastro') {
                axiosPOST('/unidades', {
                    id: v4(),
                    Apelido: nick,
                    Local: adress,
                    Marca: brand,
                    Modelo: model,
                    Ativo: check
                }).then(() => {
                    toast.success('Cadastro realizado com sucesso!')
                    redirect('/unidades')
                })
            }

            if (action === 'Edição') {
                axiosPUT(unit_id, {
                    Apelido: nick,
                    Local: adress,
                    Marca: brand,
                    Modelo: model,
                    Ativo: check
                }).then(() => {
                    toast.success('Unidade editada com sucesso!')
                    redirect('/unidades')
                })
            }
        }
    }

    return (
        <FormContainer>
            <FormTitle>{action} de unidade geradora</FormTitle>
            <Form onSubmit={handleNewUnit}>
                <InputReg 
                    label='Apelido'
                    type='text'
                    size='small'
                    placeholder='Painel 1'
                    value={nick}
                    onChange={(e) => {setNick(e.target.value); setError({...error, nick: false})}}
                    error={error.nick}
                />
                <InputReg 
                    label='Local'
                    type='text'
                    size='large'
                    placeholder='Rua Alberto 430'
                    value={adress}
                    onChange={(e) => {setAdress(e.target.value); setError({...error, adress: false})}}
                    error={error.adress}
                />
                <InputReg 
                    label='Marca'
                    type='text'
                    size='large'
                    placeholder='Resun'
                    value={brand}
                    onChange={(e) => {setBrand(e.target.value); setError({...error, brand: false})}}
                    error={error.brand}
                />
                <InputReg 
                    label='Modelo'
                    type='text'
                    size='large'
                    placeholder='155 W'
                    value={model}
                    onChange={(e) => {setModel(e.target.value); setError({...error, model: false})}}
                    error={error.model}
                />
                <Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)}/>

                <RegButton>Salvar</RegButton>
            </Form>
        </FormContainer>
    )
}