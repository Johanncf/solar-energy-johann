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

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Graph() {

    const [energyCalc, setEnergyCalc] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const { execute, error } = useFetchWithMsal();

    useEffect(() => {
        const apiCall = async () => {
            const apiResponseData = await execute("GET", "geracoes");
            const lastYearEnergyProduction = getLastYearEnergyProduction(apiResponseData);
            const energyArray = getEnergyArray(lastYearEnergyProduction)
            setEnergyCalc(energyArray)
        }
        apiCall()
    }, [execute])

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

const getLastYearEnergyProduction = (data) => {
    return data.filter(generation => {
        if (DateTime.now().year - DateTime.fromISO(generation.data).year === 1) 
            return DateTime.now().month < DateTime.fromISO(generation.data).month;

        if (DateTime.now().year - DateTime.fromISO(generation.data).year === 0)
            return DateTime.now().month >= DateTime.fromISO(generation.data).month;

        return false
    })
}

const getEnergyArray = (lastYearEnergyProduction) => {
    const energyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    labels.map((month, index) => {
        return lastYearEnergyProduction.map(generation => {
            if (month === DateTime.fromISO(generation.data).setLocale('pt-BR').toLocaleString({ month: 'long' })) {
                energyArray[index] += parseFloat(generation.geracao)
            }
            return energyArray
        })
    })

    return energyArray;
}