import {
    Paper,
    Typography,
    Box
} from '@mui/material'

import {

    Chart as ChartJS,

    ArcElement,

    Tooltip,

    Legend

} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

type Props = {
    analytics: any
}

export default function EquipamentoEstadoChart({

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

                data: [

                    analytics?.dias_disponivel ?? 0,

                    analytics?.dias_alugado ?? 0,

                    analytics?.dias_manutencao ?? 0,

                    analytics?.dias_danificado ?? 0

                ],

                backgroundColor: [

                    '#2e7d32',

                    '#1976d2',

                    '#ed6c02',

                    '#d32f2f'

                ],

                borderWidth: 0

            }

        ]

    }

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: 'bottom' as const

            }

        }

    }

    return (

        <Paper
            sx={{
                p:3,
                height:'100%'
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >

                Distribuição dos Estados

            </Typography>

            <Box
                sx={{
                    height:320
                }}
            >

                <Doughnut

                    data={data}

                    options={options}

                />

            </Box>

        </Paper>

    )

}
