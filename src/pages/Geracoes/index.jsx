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

import { axiosPOST } from "../../services/api";

export default function Geracoes() {

    const [controller, setController] = useState(false)

    const [unit, setUnit] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [generation, setGeneration] = useState('')

    const [newDate, setNewDate] = useState(false)

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

        if (!unit) {
            setError({ ...error, unit: true })
            errorsArray.push('Informe a unidade geradora!')
        }

        if (!startDate) {
            setError({...error, date: true})
            errorsArray.push('Informe a data do lançamento!')
        }

        if (startDate > DateTime.now()) {
            setError({...error, date: true})
            errorsArray.push('Não é possível lançar métrica para meses futuros.')
        }

        if (!generation) {
            setError({ ...error, generation: true })
            errorsArray.push('Métrica de geração é necessária!')
        }

        if (errorsArray.length > 0) {

            errorsArray.map(error => {
                return toast.error(error)
            })

        } else {

            axiosPOST('/geracoes', {
                nome: unit,
                data: startDate,
                geracao: generation
            }).then(() => {
                toast.success('Geração lançada com sucesso')
                setController(!controller)
            })

        }
    }

    return (
        <FormContainer>
            <Form onSubmit={handleGeneration}>
                <Select
                    label="Unidade geradora"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                />

                <DateWrapper >
                    <DateTitle>Mês/ano</DateTitle>
                    {/* <DatePicker
                        className="datepicker"
                        selected={startDate}
                        changed={newDate}
                        onChange={(date) => {setStartDate(date); setNewDate(true)}}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                    /> */}
                    <DateContainer>
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
                />
                <RegButton
                    margin="48px 0"
                    align="flex-start"
                >Cadastrar</RegButton>
            </Form>
        </FormContainer>
    )
}