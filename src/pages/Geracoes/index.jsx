import { DateTitle, DateWrapper, FormContainer, Form, DateContainer } from "./styled.elements";
import InputReg from "../../components/InputReg";
import RegButton from "../../components/RegButton";
import Select from "../../components/Select";

import { DateTime } from "luxon";

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import useFetchWithMsal from "../../hooks/useFetchWithMsal";

export default function Geracoes() {
    const { execute } = useFetchWithMsal();

    const [controller, setController] = useState(false)

    const [unit, setUnit] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [generation, setGeneration] = useState('')

    const [error, setError] = useState({
        unit: false,
        date: false,
        generation: false
    })

    useEffect(() => {
        setUnit('')
        setStartDate(new Date())
        setGeneration('')
    }, [controller])

    function handleGeneration(e) {
        e.preventDefault()

        const errorsArray = []
        let fieldErrorHandler = error

        if (!unit) {
            fieldErrorHandler = {...fieldErrorHandler, unit: true}
            errorsArray.push('Informe a unidade geradora!')
        }

        if (!startDate) {
            fieldErrorHandler = {...fieldErrorHandler, date: true}
            errorsArray.push('Informe a data do lançamento!')
        }

        if (startDate > DateTime.now()) {
            fieldErrorHandler = {...fieldErrorHandler, date: true}
            errorsArray.push('Não é possível lançar métrica para meses futuros.')
        }

        if (!generation) {
            fieldErrorHandler = {...fieldErrorHandler, generation: true}
            errorsArray.push('Métrica de geração é necessária!')
        }

        if (errorsArray.length > 0) {
            setError(fieldErrorHandler)

            errorsArray.map(error => {
                return toast.error(error)
            })

        } else {
            execute('POST', 'geracoes', {
                nome: unit,
                data: startDate,
                geracao: generation
            }).then(() => {
                toast.success('Geração lançada com sucesso')
                setController(!controller)
            })

            // axiosPOST('/geracoes', {
            //     nome: unit,
            //     data: startDate,
            //     geracao: generation
            // }).then(() => {
            //     toast.success('Geração lançada com sucesso')
            //     setController(!controller)
            // })

        }
    }

    return (
        <FormContainer>
            <Form onSubmit={handleGeneration}>
                <Select
                    label="Unidade geradora"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    error={error.unit}
                />

                <DateWrapper >
                    <DateTitle>Mês/ano</DateTitle>
                    <DateContainer error={error.date}>
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                            <DesktopDatePicker
                                views={['year', 'month']}
                                inputFormat="MM/yyyy"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </DateContainer>
                </DateWrapper>

                <InputReg
                    label="Total kW gerado"
                    type="number"
                    size="small"
                    placeholder='80'
                    value={generation}
                    onChange={(e) => setGeneration(e.target.value)}
                    error={error.generation}
                />
                <RegButton
                    margin="48px 0"
                    align="flex-start"
                >Cadastrar</RegButton>
            </Form>
        </FormContainer>
    )
}