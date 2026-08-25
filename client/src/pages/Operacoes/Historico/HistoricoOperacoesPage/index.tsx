import { useEffect, useState } from 'react'
import api from '../../../../services/api'
import OperacaoDetalhesDialog from '../../../../components/operacoes/OperacaoDetalhesDialog'

import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'

export default function HistoricoOperacoesPage() {

  const [operacoes, setOperacoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const [operacao, setOperacao] = useState<any>(null)

  useEffect(() => {
    carregarOperacoes()
  }, [])

  const carregarOperacoes = async () => {
    try {
      const { data } = await api.get('/operacoes')
      setOperacoes(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const abrirOperacao = async(id:number)=>{
    const {data}=await api.get(`/operacoes/${id}`)
    setOperacao(data)
    setOpen(true)
  }

  const corStatus = (status: string) => {
    switch (status) {
      case 'aberta':
        return 'warning'
      case 'finalizada':
        return 'success'
      default:
        return 'default'
    }
  }

  const corTipo = (tipo: string) => {
    switch (tipo) {
      case 'saida':
        return 'primary'
      case 'devolucao':
        return 'secondary'
      default:
        return 'default'
    }
  }

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Histórico de Operações
      </Typography>

      <Paper sx={{ p:3 }}>
        {
          loading ?
            (
              <Box
                display="flex"
                justifyContent="center"
                p={5}
              >
                <CircularProgress />
              </Box>
          )
          :
            (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Usuário</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Equipos</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    operacoes.map((op:any)=>(
                      <TableRow key={op.id} hover>
                        <TableCell>
                          #{op.id}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={op.tipo}
                            color={corTipo(op.tipo)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {op.cliente ?? '-'}
                        </TableCell>
                        <TableCell>
                          {op.usuario ?? '-'}
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
                          {op.total_itens}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={op.status}
                            color={corStatus(op.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Visualizar">
                            <IconButton
                              onClick={() => abrirOperacao(op.id)}
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
          )
        }
      </Paper>
      <OperacaoDetalhesDialog
        open={open}
        operacao={operacao}
        onClose={() => {
          setOpen(false)
          setOperacao(null)
        }}
      />
    </Box>

  )

}
