import { useMemo, useState } from 'react'

import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

import ClientesTable from '../../../components/configuracoes/ClientesTable'
import ClienteDialog from '../../../components/configuracoes/ClienteDialog'

import useClientes from '../../../hooks/useClientes'

export default function ClientesPage() {

  const {
    clientes,
    criarCliente,
    atualizarCliente,
    excluirCliente
  } = useClientes()

  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState<any>(null)

  const clientesFiltrados = useMemo(() => {

    const text = search.toLowerCase()

    return clientes.filter((cliente: any) =>

      (cliente.nome ?? '')
        .toLowerCase()
        .includes(text)

      ||

      (cliente.empresa ?? '')
        .toLowerCase()
        .includes(text)

      ||

      (cliente.email ?? '')
        .toLowerCase()
        .includes(text)

      ||

      (cliente.telefone ?? '')
        .toLowerCase()
        .includes(text)

    )

  }, [clientes, search])

  const novoCliente = () => {

    setClienteSelecionado(null)

    setOpen(true)

  }

  
const editarCliente = (cliente:any) => {
    setClienteSelecionado(cliente)
    // setSomenteLeitura(false)
    setOpen(true)
}

  const salvarCliente = async (dados: any) => {

    try {

      if (clienteSelecionado) {

        await atualizarCliente(
          clienteSelecionado.id,
          dados
        )

      } else {

        await criarCliente(dados)

      }

      setOpen(false)

    } catch (error) {

      console.error(error)

    }

  }
const abrirDetalhes = (cliente:any) => {

  setClienteSelecionado(cliente)

  // setSomenteLeitura(true)

  setOpen(true)

}


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
            Clientes
          </Typography>

          <Typography
            color="text.secondary"
          >
            Cadastro e gerenciamento de clientes
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={novoCliente}
        >
          Novo Cliente
        </Button>

      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 3
        }}
      >

        <TextField
          fullWidth
          placeholder="Pesquisar cliente..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <ClientesTable
          clientes={clientesFiltrados}
          onEditar={editarCliente}
          onExcluir={excluirCliente}
          onDetalhes={abrirDetalhes}
        />

      </Paper>

      <ClienteDialog
        open={open}
        cliente={clienteSelecionado}
 // somenteLeitura={somenteLeitura}
        onClose={() => setOpen(false)}
        onSalvar={salvarCliente}
      />

    </Box>

  )

}
