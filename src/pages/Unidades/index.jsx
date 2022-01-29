import Table from "../../components/Table";
import RegButton from "../../components/RegButton";
import { UnitsContainer, Anchor } from "./styled.elements";
import { useEffect, useState } from "react";
import { axiosDELETE, axiosGET } from "../../services/api";
import UnitCard from "../../components/UnitCard";
import { toast } from "react-toastify";

export default function Unidades() {

    const [units, setUnits] = useState([])
    const [controller, setController] = useState(false)

    useEffect(() => {

        async function callAPI() {
            const res = await axiosGET('/unidades')
            setUnits(res)
        }

        callAPI()
    }, [controller])

    function callDELETE(target) {
        axiosDELETE(target)
            .then(() => {
                setController(!controller)
                toast.success("Deletado com sucesso")
            })
    }



    return (
        <UnitsContainer>
            <Table
                title="Lista de unidades"
                columns={["id", "Apelido", "Local", "Marca", "Modelo", "", ""]}
                data={units}
                functions={callDELETE}
            />

            <Anchor to='/unidades/cadastro'><RegButton align="flex-end">Nova unidade</RegButton></Anchor>
            <UnitCard
                data={units}
                onclick={callDELETE}
            />
        </UnitsContainer>
    )
}