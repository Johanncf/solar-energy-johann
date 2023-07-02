import { useEffect, useState } from "react";
import { CardInfo, CardsContainer, CardTitle, DashCard } from "./styled.elements";
import useFetchWithMsal from "../../hooks/useFetchWithMsal";

export default function DashCards() {

    const [totalUnits, setTotalUnits] = useState(0)
    const [activeUnits, setActiveUnits] = useState(0)
    const [averageEnergy, setAverageEnergy] = useState(0)
    const { execute } = useFetchWithMsal();

    useEffect(() => {
        let totalEnergy = 0
        let handleActiveUnits = 0

        async function APIcall() {
            const units = await execute('GET', 'unidades');
            const generations = await execute('GET', 'geracoes')

            units.filter(unit => {
                return unit.Ativo
            }).map(() => {
                return handleActiveUnits++
            })
            
            generations.map(generation => {
                return totalEnergy += parseFloat(generation.geracao)
            })

            setTotalUnits(units.length)
            setActiveUnits(handleActiveUnits)
            totalEnergy && setAverageEnergy((totalEnergy/units.length).toFixed(0))
        }

        APIcall()

    }, [execute])

    return (
        <CardsContainer>
            <DashCard>
                <CardTitle>Total unidades</CardTitle>
                <CardInfo>{totalUnits}</CardInfo>
            </DashCard>
            <DashCard>
                <CardTitle>Unidades ativas</CardTitle>
                <CardInfo>{activeUnits}</CardInfo>
            </DashCard>
            <DashCard>
                <CardTitle>Unidades inativas</CardTitle>
                <CardInfo>{totalUnits - activeUnits}</CardInfo>
            </DashCard>
            <DashCard>
                <CardTitle>Média de energia</CardTitle>
                <CardInfo>{averageEnergy} kw</CardInfo>
            </DashCard>
        </CardsContainer>
    )
}