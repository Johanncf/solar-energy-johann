import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"

import { Line } from "react-chartjs-2"

import { DateTime } from "luxon"

import { useEffect, useState } from "react"
import { GraphContainer } from "./styled.elements"
import useFetchWithMsal from "../../hooks/useFetchWithMsal"
import { scopes } from "../../config/msalConfiguration"

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            align: 'start',
            text: 'Total de energia gerada por mês',
            font: {
                size: '20px'
            },
            padding: 30
        },
        legend: {
            labels: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        }
    }
}

const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
]
const currentMonthIndex = months.findIndex(month => month === DateTime.now().setLocale('pt-BR').toLocaleString({ month: 'long' }))
let labels = months.slice(currentMonthIndex + 1, months.length)
labels = labels.concat(months.slice(0, currentMonthIndex + 1))

export default function Graph() {

    const [energyCalc, setEnergyCalc] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [ apiData, setApiData ] = useState([])
    const { execute, error, data } = useFetchWithMsal({scopes: scopes});

    useEffect(() => {
        const apiCall = async () => {
            //if (apiData == null) {
                const apiResponseData = await execute("GET", "/geracoes");
                setApiData(apiResponseData)
                const energyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                const lastYearGenerations = apiData.filter(generation => {
                    if (DateTime.now().year - DateTime.fromISO(generation.data).year === 1) 
                        return DateTime.now().month < DateTime.fromISO(generation.data).month;
            
                    if (DateTime.now().year - DateTime.fromISO(generation.data).year === 0)
                        return DateTime.now().month >= DateTime.fromISO(generation.data).month;
            
                    return false
                })
            
                labels.map((month, index) => {
                    return lastYearGenerations.map(generation => {
                        if (month === DateTime.fromISO(generation.data).setLocale('pt-BR').toLocaleString({ month: 'long' })) {
                            energyArray[index] += parseFloat(generation.geracao)
                        }
                        return energyArray
                    })
                })
            
                setEnergyCalc(energyArray)
            //}
        }
        apiCall()
    }, [execute, data, apiData])

    



    const componentData = {
        labels,
        datasets: [
            {
                data: energyCalc,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <GraphContainer>
            <Line options={options} data={componentData} />
        </GraphContainer>
    )
}