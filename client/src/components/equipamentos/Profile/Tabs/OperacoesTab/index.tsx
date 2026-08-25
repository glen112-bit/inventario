import { useState } from 'react'

import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
    Divider,
    TableContainer
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import InventoryIcon from '@mui/icons-material/Inventory'
import OperacaoDetalhesDialog from '../../../../operacoes/OperacaoDetalhesDialog'
type Props = {
    operacoes: any[]
}

export default function OperacoesTab({

    operacoes

}: Props) {

const [operacaoSelecionada,setOperacaoSelecionada] = useState<any>(null)

const [loadingOperacao,setLoadingOperacao] = useState(false)

const total = operacoes.length

const abrirOperacao = async(id:number)=>{

    try{
        setLoadingOperacao(true)
        const {data}=await api.get(
            `/operacoes/${id}`
        )
        console.log(data)
        setOperacaoSelecionada(data)

    }catch(error){
        console.error(error)
    }finally{
        setLoadingOperacao(false)
    }
}

    const saidas = operacoes.filter(
        op => op.tipo === 'saida'
    ).length
    const devolucoes = operacoes.filter(
        op => op.tipo === 'devolucao'
    ).length

    return (

        <Box>
            {/* KPIs */}
            <Grid
                container
                spacing={2}
                mb={3}
            >
                <KpiCard
                    titulo="Operações"
                    valor={total}
                    icon={<InventoryIcon color="primary" />}
                />
                <KpiCard
                    titulo="Saídas"
                    valor={saidas}
                    icon={<LocalShippingIcon color="success" />}
                />
                <KpiCard
                    titulo="Devoluções"
                    valor={devolucoes}
                    icon={<KeyboardReturnIcon color="warning" />}
                />
            </Grid>
            <Paper sx={{ p:3 }}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Histórico de Operações
                </Typography>
                <Divider sx={{ my:2 }} />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                operacoes.map(op => (
                                    <TableRow
                                        key={op.id}
                                        hover
                                    >
                                        <TableCell>
                                            #{op.id}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={op.tipo}
                                                color={
                                                    op.tipo === 'saida'
                                                        ? 'primary'
                                                        : 'secondary'
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {op.cliente ?? '-'}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                op.data_operacao
                                                    ?
                                                        new Date(
                                                            op.data_operacao
                                                    ).toLocaleString()
                                                    :
                                                        '-'
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                label={op.status}
                                                color={
                                                    op.status === 'finalizada'
                                                        ? 'success'
                                                        : 'warning'
                                                }
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <Tooltip
                                                title="Visualizar"
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        abrirOperacao(op.id)
                                                    }
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {
                operacaoSelecionada && (
                    <OperacaoDetalhesDialog
                        open={true}
                        operacao={operacaoSelecionada}
                        onClose={() =>
                            setOperacaoSelecionada(null)
                        }
                    />
                )
            }
        </Box>
    )
}

function KpiCard({

    titulo,
    valor,
    icon

}: any) {

    return (
        <Grid size={{ xs:12, md:4 }}>
            <Paper
                sx={{
                    p:3,
                    height:'100%'
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography
                            color="text.secondary"
                        >
                            {titulo}
                        </Typography>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            {valor}
                        </Typography>
                    </Box>
                    {icon}
                </Box>
            </Paper>
        </Grid>
    )
}
