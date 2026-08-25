import {
    Box,
    Paper,
    Typography,
    Chip
} from '@mui/material'

import TimelineIcon from '../TimelineIcon'

type Props = {
    evento: any
}

export default function TimelineEvento({

    evento

}: Props) {

    return (

        <Box
            display="flex"
            gap={2}
            mb={3}
        >

            {/* Línea del Timeline */}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
            >

                <TimelineIcon
                    estado={evento.estado_novo}
                />

                <Box
                    sx={{
                        width: 2,
                        flex: 1,
                        bgcolor: 'divider',
                        minHeight: 80
                    }}
                />

            </Box>

            {/* Tarjeta */}

            <Paper
                sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 3
                }}
            >

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >

                    <Chip
                        label={evento.estado_novo}
                        color={

                            evento.estado_novo === 'disponivel'

                                ? 'success'

                                : evento.estado_novo === 'alugado'

                                ? 'primary'

                                : evento.estado_novo === 'manutencao'

                                ? 'warning'

                                : 'error'

                        }
                    />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {

                            new Date(
                                evento.created_at
                            ).toLocaleString()

                        }

                    </Typography>

                </Box>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                >

                    Estado anterior

                </Typography>

                <Typography>

                    {evento.estado_anterior ?? '-'}

                </Typography>

                <Typography
                    variant="subtitle2"
                    sx={{ mt: 2 }}
                >

                    Novo estado

                </Typography>

                <Typography>

                    {evento.estado_novo}

                </Typography>

                {

                    evento.usuario && (

                        <>

                            <Typography
                                variant="subtitle2"
                                sx={{ mt: 2 }}
                            >

                                Usuário

                            </Typography>

                            <Typography>

                                {evento.usuario}

                            </Typography>

                        </>

                    )

                }

                {

                    evento.observacao && (

                        <>

                            <Typography
                                variant="subtitle2"
                                sx={{ mt: 2 }}
                            >

                                Observação

                            </Typography>

                            <Typography
                                color="text.secondary"
                            >

                                {evento.observacao}

                            </Typography>

                        </>

                    )

                }

            </Paper>

        </Box>

    )

}
