import { useEffect, useState } from 'react'
import UsuarioDialog from '../../components/usuarios/UsuarioDialog'
// import UsuariosTable from '../../components/usuarios/UsuariosTable'
import useUsuarios from '../../hooks/useUsuarios'
import api from '../../services/api'
import useUsuarioForm from '../../hooks/useUsuarioForm'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar
} from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef } from '@mui/x-data-grid'

import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'

type Usuario = {
  id:number
  nome:string
  email:string
  cargo:string
  tipo_usuario:string
  telefone:string
  activo:number
  created_at:string
}

export default function UsuariosPage(){

  const [ usuarioSelecionado, setUsuarioSelecionado ] = useState<Usuario | null>(null)
  const [ openNovo, setOpenNovo ] = useState(false)


  const {
    usuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario: removerUsuario,
    carregarUsuarios,
  } = useUsuarios()


const editarUsuario = (usuario: Usuario) => {

  setUsuarioSelecionado(usuario)

  setOpenNovo(true)

  }

  const excluirUsuario = async (id: number) => {
    if (!window.confirm(
      'Deseja excluir Usuario?'
    )) return
    await removerUsuario(id)
    await carregarUsuarios()
  }

  const columns:GridColDef[]=[
    {
      field:'nome',
      headerName:'Usuario',
      flex:1,
      renderCell:(params)=>(
        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Avatar>
            <PersonIcon/>
          </Avatar>
          {params.value}
        </Box>
      )
    },

    {
      field:'email',
      headerName:'Email',
      flex:1.5
    },


    {
      field:'rol',
      headerName:'Tipo',
      flex:1,
      renderCell:(params)=>{

        const color=
          params.value==='admin'
          ? 'error'
          : params.value==='subadmin'
          ? 'warning'
          : 'primary'

        return(
          <Chip
            label={params.value}
            color={color}
          />
        )

      }
    },

    {
      field:'activo',
      headerName:'Estado',
      flex:1,
      renderCell:(params)=>(
        <Chip
          label={params.value ? 'Activo':'Inactivo'}
          color={params.value ? 'success':'default'}
        />
      )
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 130,
      sortable: false,
      renderCell: (params) => (

        <>
          <IconButton
            color="primary"
            onClick={() => editarUsuario(params.row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => excluirUsuario(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>

      )
    }
  ]
// useEffect(() => {
//
  // console.log('usuarioSelecionado:', usuarioSelecionado)
//
// }, [usuarioSelecionado])
  return(

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
            Usuarios
          </Typography>

          <Typography
            color="text.secondary"
          >
            Administración de usuarios del sistema
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {

            // console.log("DESPUÉS DE RESET:", form)

            setUsuarioSelecionado(null)

            setOpenNovo(true)

          }}
        >
          Novo Usuario
        </Button>

      </Box>

      <Paper
        sx={{
          height:650,
          borderRadius:1,
          overflow:'hidden'
        }}
      >

        <DataGrid
          rows={usuarios}
          columns={columns}
          pageSizeOptions={[10,25,50,100]}
          disableRowSelectionOnClick
        />

      </Paper>
      
        <UsuarioDialog
          open={openNovo}
          onClose={() => {
            setOpenNovo(false)

            setUsuarioSelecionado(null)

          }}
          usuarioSelecionado={usuarioSelecionado}
          criarUsuario={criarUsuario}
          atualizarUsuario={atualizarUsuario}
          carregarUsuarios={carregarUsuarios}
        />
      
    </Box>

  )

}
