import { React, useEffect, useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'

import BuildIcon from '@mui/icons-material/Build'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CategoryIcon from '@mui/icons-material/Category'
import WarningIcon from '@mui/icons-material/Warning'
import AddIcon from '@mui/icons-material/Add'

import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'

import KpiCard from '../../components/KpiCard'

type EquipamentoManutencao = {
  equipamento_id: number
  codigo_interno: string
  numero_serie: string
  marca: string
  modelo: string
  descripcion: string
  estado_actual: string
  valor: number
  fecha_compra: string
}

export default function ManutencaoPage() {

  const [equipamentos, setEquipamentos] = useState<EquipamentoManutencao[]>([])
  const [filtro, setFiltro] = useState('todos')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [movimentacoes, setMovimentacoes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const carregar = async () => {
      try{
        const response = await api.get(
          `/manutencao`
        )
        setEquipamentos(
          Array.isArray(response.data)
            ? response.data
            : []
        )
      }catch(error){
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    carregar()

  },[])

  const filtrados = equipamentos.filter(item => 
                                        `${item.codigo_interno} ${item.marca} ${item.modelo}`
  .toLowerCase()
  .includes(search.toLowerCase()) )
  const valorTotal = equipamentos.reduce(
    (acc, item) => acc + Number(item.valor || 0 ),
    0
  )
  const totalEquipamentos = equipamentos.length

  const marcas = [
    ...new Set(
      equipamentos.map(item => item.marca)
    )
  ]
  const totalMarcas = marcas.length

  let dadosExibidos = [...filtrados]

  if (filtro === 'marcas') {

    dadosExibidos.sort(
      (a, b) => a.marca.localeCompare(b.marca)
    )

  }

  if (filtro === 'fora-operacao') {

    dadosExibidos = dadosExibidos.filter(
      item => item.estado_actual === 'mantenimiento'
      || item.estado_actual === 'manutencao'
    )

  }
  if (filtro === 'valor-total') {

    dadosExibidos.sort(
      (a, b) => Number(b.valor) - Number(a.valor)
    )

  }
  const columns: GridColDef[] = [

    {
      field: 'codigo_interno',
      headerName: 'Código',
      flex: 1
    },
    {
      field: 'marca',
      headerName: 'Marca',
      flex: 1
    },
    {
      field: 'modelo',
      headerName: 'Modelo',
      flex: 1
    },
    {
      field: 'numero_serie',
      headerName: 'Série',
      flex: 1
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1,
      renderCell: params =>
        `R$ ${Number(params.value).toLocaleString('pt-BR')}`
    },
    {
      field: 'estado_actual',
      headerName: 'Status',
      flex: 1,
      renderCell: () => (
        <Chip
          label="Manutenção"
          color="error"
          size="small"
        />
      )
    }
  ]

  const rows = filtrados.map(item => ({
    id: item.equipamento_id,
    ...item
  }))

  const foraOperacao = equipamentos.filter(
    item => item.estado_actual === 'manutencao'
  ).length

  return (

    <Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Manutenção
          </Typography>

          <Typography color="text.secondary">
            Equipamentos em manutenção
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nova Manutenção
        </Button>

      </Box>

      <Grid container spacing={3} mb={3}>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Equipamentos"
            value={totalEquipamentos}
            icon={<BuildIcon />}
            color="#ef4444"
            onClick={() =>
              navigate('/manutencao/detalhes/equipamentos')
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Valor"
            value={`R$ ${valorTotal.toLocaleString('pt-BR')}`}
            icon={<AttachMoneyIcon />}
            color="#10b981"
            onClick={() =>
              navigate('/manutencao/detalhes/valor')
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Marcas Afetadas"
            value={totalMarcas}
            icon={<CategoryIcon />}
            color="#3b82f6"
            onClick={() =>
              navigate('/manutencao/detalhes/marcas')
            }
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <KpiCard
            title="Fora de Operação"
            value={foraOperacao}
            icon={<WarningIcon />}
            color="#f59e0b"
            onClick={() =>
              navigate('/manutencao/detalhes/fora-operacao')
            }
          />
        </Grid>

      </Grid>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4
        }}
      >

        <Box mb={3}>

          <TextField
            fullWidth
            label="Buscar equipamento..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50, 100 ]}
        />

      </Paper>

      <Box mt={4}>

        <Paper
          sx={{
            p: 3,
            borderRadius: 4
          }}
        >

          <Typography
            variant="h6"
            fontWeight={600}
            mb={3}
          >
            Marcas em Manutenção
          </Typography>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Marca
                </TableCell>

                <TableCell align="right">
                  Equipamentos
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {Object.entries(

                equipamentos.reduce((acc, item) => {

                  acc[item.marca] =
                    (acc[item.marca] || 0) + 1

                  return acc

                }, {} as Record<string, number>)

              ).map(([marca, quantidade]) => (

                <TableRow key={marca}>

                  <TableCell>
                    {marca}
                  </TableCell>

                  <TableCell align="right">
                    {quantidade}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              mt: 3
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
            >
              Últimas Movimentações
            </Typography>

            {movimentacoes.map((item) => (
              <Box
                key={item.id}
                sx={{
                  py: 1,
                  borderBottom:
                    '1px solid rgba(255,255,255,.08)'
                }}
              >
                <Typography fontWeight={600}>
                  {item.codigo_interno}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.estado_anterior}
                  {' → '}
                  {item.estado_novo}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {item.observacao}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Paper>

      </Box>

    </Box>

  )

}
