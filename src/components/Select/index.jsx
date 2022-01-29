import { useEffect, useState } from "react";
import { axiosGET } from "../../services/api";
import { Label } from "../InputReg/styled.elements";
import { Option, StyledSelect } from "./styled.elements";

export default function Select({ label, ...rest }) {

    const [units, setUnits] = useState([])

    useEffect(() => {

        async function APIcall() {
            const res = await axiosGET('/unidades')

            const unitsArray = []

            res.map(unit => {
                return unit.Ativo && unitsArray.push(unit)
            })

            setUnits(unitsArray)
        }

        APIcall()
    }, [])

    return (
        <Label>
            {label}<br/>
            <StyledSelect {...rest}>
                <Option value="" disabled >Selecione</Option>
                {
                    units.map(unit => {
                        return <Option key={unit.id} value={unit.id}>{unit.Apelido}</Option>
                    })
                }
            </StyledSelect>
        </Label>
    )
}