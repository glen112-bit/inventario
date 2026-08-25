import {
    Paper,
    Typography,
    Box
} from '@mui/material'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
)

type Props = {
    analytics: any
}

export default function EquipamentoUsoChart({
    analytics
}: Props) {

    const meses =
        analytics?.uso_mensal?.map((m:any)=>m.mes) ?? []

    const valores =
        analytics?.uso_mensal?.map((m:any)=>m.total) ?? []

    const data = {

        labels: meses,

        datasets: [

            {

                label: 'Utilização',

                data: valores,

                borderColor: '#1976d2',

                backgroundColor: 'rgba(25,118,210,0.15)',

                fill: true,

                tension: 0.35,

                pointRadius: 5,

                pointHoverRadius: 7

            }

        ]

    }

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {

            mode: 'index' as const,

            intersect: false

        },

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    precision: 0

                }

            }

        }

    }

    return (

        <Paper
            sx={{
                p:3,
                borderRadius:3,
                height:'100%'
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >

                Utilização Mensal

            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >

                Quantidade de operações realizadas por mês.

            </Typography>

            <Box
                sx={{
                    height:320
                }}
            >

                <Line

                    data={data}

                    options={options}

                />

            </Box>

        </Paper>

    )

}
