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

import UsuariosTable from '../../../components/configuracoes/UsuariosTable'
import UsuarioDialog from '../../../components/configuracoes/UsuariosDialog'

import useUsuarios from '../../../hooks/useUsuarios'

export default function UsuariosPage() {

  const {
    usuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
  } = useUsuarios()

  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<any>(null)

  const usuariosFiltrados = useMemo(() => {

    const text = search.toLowerCase()

    return usuarios.filter((u:any) =>
      (u.nome ?? '').toLowerCase().includes(text) ||
      (u.email ?? '').toLowerCase().includes(text)
    )

  }, [usuarios, search])

  const novoUsuario = () => {

    setUsuarioSelecionado(null)

    setOpen(true)

  }

  const editarUsuario = (usuario:any) => {

    setUsuarioSelecionado(usuario)

    setOpen(true)

  }

  const salvarUsuario = async(dados:any) => {

    if(usuarioSelecionado){

      await atualizarUsuario(
        usuarioSelecionado.id,
        dados
      )

    }else{

      await criarUsuario(dados)

    }

    setOpen(false)

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
            Usuários
          </Typography>

          <Typography
            color="text.secondary"
          >
            Gerenciamento de usuários do sistema
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={novoUsuario}
        >
          Novo Usuário
        </Button>

      </Box>

      <Paper
        sx={{
          p:3,
          borderRadius:3
        }}
      >

        <TextField
          fullWidth
          placeholder="Pesquisar usuário..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          sx={{mb:3}}
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        />

        <UsuariosTable
          usuarios={usuariosFiltrados}
          onEditar={editarUsuario}
          onExcluir={excluirUsuario}
        />

      </Paper>

      <UsuarioDialog
        open={open}
        usuario={usuarioSelecionado}
        onClose={()=>setOpen(false)}
        onSalvar={salvarUsuario}
      />

    </Box>

  )

}
