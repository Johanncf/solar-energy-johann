import { Card, CardBG, CardsContainer, Spacer, UnitInfo } from './styled.elements';

import TableButton from '../TableButton';

export default function UnitCard({ data, onclick }) {
    return (
        <CardsContainer>
            {
                data.map(unit => {
                    return (
                        <CardBG key={unit.id}>
                            <Card>
                                <div>id: <UnitInfo>{unit.id.toString().slice(0, 4)}</UnitInfo></div>
                                <div>Apelido: <UnitInfo>{unit.Apelido}</UnitInfo></div>
                                <div>Local: <UnitInfo>{unit.Local}</UnitInfo></div>
                                <div>Marca: <UnitInfo>{unit.Marca}</UnitInfo></div>
                                <div>modelo: <UnitInfo>{unit.Modelo}</UnitInfo></div>
                            </Card>
                            <Spacer>
                                <TableButton action="edit" row={unit.id} onclick={onclick}>Editar</TableButton>
                                <TableButton action="remove" row={unit.id} onclick={onclick}>Remover</TableButton>
                            </Spacer>
                        </CardBG>
                    )
                })
            }
        </CardsContainer>
    )
}