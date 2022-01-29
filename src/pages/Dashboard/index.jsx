import DashCards from "../../components/DashCards";
import Graph from "../../components/Graph";
import { DashContainer } from "./styled.elements";

export default function Dash() {

    return (
        <DashContainer>
            <DashCards />
            <Graph />
        </DashContainer>
    )
}