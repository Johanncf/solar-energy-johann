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
import { axiosGET } from "../../services/api"
import { GraphContainer } from "./styled.elements"

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

    useEffect(() => {

        async function APIcall() {

            const energyArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

            const res = await axiosGET('/geracoes')

            const lastYearGenerations = res.filter(generation => {
                if (DateTime.now().year - DateTime.fromISO(generation.data).year === 1) {
                    if (DateTime.now().month < DateTime.fromISO(generation.data).month) {
                        return true
                    } else {
                        return false
                    }
                }

                if (DateTime.now().year - DateTime.fromISO(generation.data).year === 0) {
                    if (DateTime.now().month >= DateTime.fromISO(generation.data).month) {
                        return true
                    } else {
                        return false
                    }
                }

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
        }

        APIcall()
    }, [])

    const data = {
        labels,
        datasets: [
            {
                data: energyCalc,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
        ]
    }

    return (
        <GraphContainer>
            <Line options={options} data={data} />
        </GraphContainer>
    )
}