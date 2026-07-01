import { useEffect, useState } from 'react'
import UsuarioDialog from '../../components/usuarios/UsuarioDialog'
import useUsuarios from '../../hooks/useUsuarios'
import api from '../../services/api'

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

  const [usuarios,setUsuarios]=useState<Usuario[]>([])
  const [openNovo, setOpenNovo] = useState(false)
  const {
    criarUsuario
  } = useUsuarios()

  useEffect(()=>{

    const obtenerUsuarios=async()=>{

      try{

        const response=await api.get(
          '/usuarios'
        )

        setUsuarios(response.data)

      }catch(error){

        console.error(error)

      }

    }

    obtenerUsuarios()

  },[])

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
    field:'lugar',
    headerName:'Lugar',
    flex:1
  },

  {
    field:'tipo_usuario',
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
  }
  ]

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
          onClick={() => { setOpenNovo(true)}}
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
  onClose={() => setOpenNovo(false)}
  onSalvar={criarUsuario}
/>
    </Box>

  )

}
