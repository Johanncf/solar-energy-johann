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
import { useAccount, useMsal } from "@azure/msal-react"
import { InteractionRequiredAuthError } from "@azure/msal-browser"

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
    // const {execute, ...rest} = //await axiosGET('/geracoes')
    //             useFetchWithMsal();
    const { instance } = useMsal()
    const accountInfo = useAccount();
    const [ apiData, setApiData ] = useState(null)
    // const { login, result, error } = useMsalAuthentication("redirect", {
    //     ...configuration, 
    //     scopes: ["https://solarenergyjohann.onmicrosoft.com/880155ac-ef66-4774-94b1-df98bf8b7c26/user_acess"],
    //     account: instance.getActiveAccount()
    // });

    useEffect(() => {

        async function APIcall() {
            const accounts = instance.getAllAccounts();
            const tokenRequest = {
                account: accounts[0], // This is an example - Select account based on your app's requirements
                scopes: ["https://solarenergyjohann.onmicrosoft.com/api/user_access"]
            }
            instance.acquireTokenSilent(tokenRequest).then(async (response) => {
                // Call your API with the access token and return the data you need to save in state
                console.log(response)
                const headers = new Headers();
                const bearer = `Bearer ${response.accessToken}`;
                headers.append("Authorization", bearer);

                let options = {
                    method: "GET",
                    headers: headers
                };

                const solarApiResponse = await fetch("https://localhost:7289/api/geracoes", options)
                const data = await solarApiResponse.json();
                setApiData(data);
            }).catch(async (e) => {
                console.log(e)

                if (e instanceof InteractionRequiredAuthError) {
                    await instance.acquireTokenRedirect(tokenRequest);
                }

                throw e;
            });

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
        }

        APIcall()
    }, [instance, accountInfo, apiData])

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