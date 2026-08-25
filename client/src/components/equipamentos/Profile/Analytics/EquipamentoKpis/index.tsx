import {
    Grid,
    Paper,
    Typography,
    Box
} from '@mui/material'

import InventoryIcon from '@mui/icons-material/Inventory'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildIcon from '@mui/icons-material/Build'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

type Props = {
    analytics: any
}

export default function EquipamentoKpis({
    analytics
}: Props) {

    const cards = [

        {
            titulo: 'Operações',
            valor: analytics?.total_operacoes ?? 0,
            cor: '#1976d2',
            icon: <InventoryIcon />
        },

        {
            titulo: 'Aluguéis',
            valor: analytics?.alugueis ?? 0,
            cor: '#2e7d32',
            icon: <LocalShippingIcon />
        },

        {
            titulo: 'Manutenções',
            valor: analytics?.manutencoes ?? 0,
            cor: '#ed6c02',
            icon: <BuildIcon />
        },

        {
            titulo: 'Danos',
            valor: analytics?.danos ?? 0,
            cor: '#d32f2f',
            icon: <ErrorIcon />
        },

        {
            titulo: 'Disponibilidade',
            valor: `${analytics?.disponibilidade ?? 0}%`,
            cor: '#00897b',
            icon: <CheckCircleIcon />
        },

        {
            titulo: 'Receita',
            valor: `R$ ${Number(
                analytics?.receita_total ?? 0
            ).toLocaleString('pt-BR')}`,
            cor: '#6a1b9a',
            icon: <AttachMoneyIcon />
        }

    ]

    return (

        <Grid
            container
            spacing={2}
            mb={3}
        >

            {

                cards.map((card) => (

                    <Grid
                        key={card.titulo}
                        size={{
                            xs:12,
                            sm:6,
                            md:4,
                            lg:2
                        }}
                    >

                        <Paper
                            sx={{
                                p:3,
                                borderRadius:3,
                                height:'100%',
                                borderTop:`5px solid ${card.cor}`
                            }}
                        >

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >

                                        {card.titulo}

                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                        mt={1}
                                    >

                                        {card.valor}

                                    </Typography>

                                </Box>

                                <Box
                                    sx={{
                                        color:card.cor,
                                        fontSize:36
                                    }}
                                >

                                    {card.icon}

                                </Box>

                            </Box>

                        </Paper>

                    </Grid>

                ))

            }

        </Grid>

    )

}
