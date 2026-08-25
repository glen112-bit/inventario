import {
    Paper,
    Typography,
    Box
} from '@mui/material'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
)

type Props = {
    analytics: any
}

export default function EquipamentoTempoChart({

    analytics

}: Props) {

    const data = {

        labels: [

            'Disponível',

            'Alugado',

            'Manutenção',

            'Danificado'

        ],

        datasets: [

            {

                label: 'Dias',

                data: [

                    analytics?.dias_disponivel ?? 0,

                    analytics?.dias_alugado ?? 0,

                    analytics?.dias_manutencao ?? 0,

                    analytics?.dias_danificado ?? 0

                ],

                backgroundColor: [

                    '#4CAF50',

                    '#1976D2',

                    '#FF9800',

                    '#F44336'

                ],

                borderRadius: 8,

                borderSkipped: false

            }

        ]

    }

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            },

            tooltip: {

                callbacks: {

                    label: (ctx:any) =>

                        `${ctx.raw} dias`

                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    callback: (value:any) =>

                        `${value} d`

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
                gutterBottom
            >

                Tempo por Estado

            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >

                Distribuição do tempo de vida do equipamento
                em cada estado.

            </Typography>

            <Box
                sx={{
                    height:350
                }}
            >

                <Bar

                    data={data}

                    options={options}

                />

            </Box>

        </Paper>

    )

}
