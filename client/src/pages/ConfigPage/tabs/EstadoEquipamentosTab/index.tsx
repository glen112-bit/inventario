import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'

export default function EstadoEquipamentosTab() {
  const [rows, setRows] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [equipamentoSelecionado, setEquipamentoSelecionado] =
    useState<any>(null)
  const [estadoAtual, setEstadoAtual] =
    useState('')
  const [observacao, setObservacao] =
    useState('')

  useEffect(() => {
    carregar()
  }, [])

  const carregar = async () => {
  try {
    const response = await axios.get(
      '/api/inventario'
    )
    setRows(
      response.data.map(
        (item: any) => ({
          id: item.equipamento_id,
          ...item
        })
      )
    )

  } catch (error: any) {
    console.error('ERRO API:')
    console.error(error)

  }
}

  const abrirEdicao = (row: any) => {

    setEquipamentoSelecionado(row)

    setEstadoAtual(
      row.estado_actual
    )

    setObservacao('')

    setOpen(true)

  }

  const salvarEstado = async () => {

    if (!equipamentoSelecionado)
      return

    try {

      await axios.put(
        `/api/config/equipamentos/${equipamentoSelecionado.equipamento_id}/estado`,
        {
          estado_actual: estadoAtual,
          observacao
        }
      )
      setRows(prev =>
        prev.map(item =>
          item.equipamento_id === equipamentoSelecionado.equipamento_id
            ? {
                ...item,
                estado_actual: estadoAtual
              }
            : item
        )
      )
      setOpen(false)
      setEquipamentoSelecionado(null)
      setObservacao('')
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [

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
      field: 'valor',
      headerName: 'Valor',
      flex: 1,

      valueFormatter: (value: any) =>
        value
          ? `R$ ${Number(value).toLocaleString('pt-BR')}`
          : '-'
    },

    {
      field: 'estado_actual',
      headerName: 'Estado',
      flex: 1,

      renderCell: (params: any) => {

        const estado =
          params.value

        return (

          <Box
            sx={{
              px: 1.5,
              py: .5,
              borderRadius: .5,
              fontSize: 8,
              fontWeight: 600,
              background:
                estado === 'disponivel'
                  ? '#dcfce7'
                  : estado === 'alugado'
                  ? '#fef3c7'
                  : estado === 'manutencao'
                  ? '#fee2e2'
                  : '#e5e7eb',
              color:
                estado === 'disponivel'
                  ? '#166534'
                  : estado === 'alugado'
                  ? '#92400e'
                  : estado === 'manutencao'
                  ? '#991b1b'
                  : '#374151'
            }}
          >
            {estado}
          </Box>

        )

      }

    },

    {
      field: 'acoes',
      headerName: 'Ações',
      width: 140,

      renderCell: (params: any) => (

        <Button
          variant="contained"
          size="small"
          onClick={() =>
            abrirEdicao(
              params.row
            )
          }
        >
          Editar
        </Button>

      )

    }

  ]

  return (

    <>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >

        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSizeOptions={[
            10,
            25,
            50,
            100
          ]}
        />

      </Paper>

      <Dialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle>
          Alterar Estado
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Código"
            value={
              equipamentoSelecionado?.codigo_interno || ''
            }
            disabled
          />

          <TextField
            fullWidth
            margin="normal"
            label="Equipamento"
            value={
              equipamentoSelecionado
                ? `${equipamentoSelecionado.marca} ${equipamentoSelecionado.modelo}`
                : ''
            }
            disabled
          />

          <FormControl
            fullWidth
            margin="normal"
          >

            <InputLabel>
              Estado
            </InputLabel>

            <Select
              value={estadoAtual}
              label="Estado"
              onChange={(e) =>
                setEstadoAtual(
                  e.target.value
                )
              }
            >

              <MenuItem value="disponible">
                Disponível
              </MenuItem>

              <MenuItem value="alquilado">
                Alugado
              </MenuItem>

              <MenuItem value="mantenimiento">
                Manutenção
              </MenuItem>

              <MenuItem value="baixa">
                Baixa
              </MenuItem>

            </Select>

          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Observação"
            value={observacao}
            onChange={(e) =>
              setObservacao(
                e.target.value
              )
            }
          />

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() =>
              setOpen(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={salvarEstado}
          >
            Salvar
          </Button>

        </DialogActions>

      </Dialog>

    </>
  )
}
