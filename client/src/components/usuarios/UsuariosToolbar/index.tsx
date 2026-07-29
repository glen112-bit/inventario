import {
  Box,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material'

import RefreshIcon from '@mui/icons-material/Refresh'

type Props = {
  textoBusca: string
  setTextoBusca: (value: string) => void

  rolFiltro: string
  setRolFiltro: (value: string) => void

  estadoFiltro: string
  setEstadoFiltro: (value: string) => void

  onAtualizar: () => void
}

export default function UsuariosToolbar({

  textoBusca,
  setTextoBusca,

  rolFiltro,
  setRolFiltro,

  estadoFiltro,
  setEstadoFiltro,

  onAtualizar

}: Props) {

  return (

    <Box mb={3}>

      <Grid container spacing={2}>

        <Grid size={{ xs: 12, md: 6 }}>

          <TextField
            fullWidth
            label="Buscar usuário"
            placeholder="Nome ou telefone..."
            value={textoBusca}
            onChange={(e)=>
              setTextoBusca(e.target.value)
            }
          />

        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>

          <TextField
            select
            fullWidth
            label="Perfil"
            value={rolFiltro}
            onChange={(e)=>
              setRolFiltro(e.target.value)
            }
          >

            <MenuItem value="">
              Todos
            </MenuItem>

            <MenuItem value="admin">
              Administrador
            </MenuItem>

            <MenuItem value="operador">
              Operador
            </MenuItem>

            <MenuItem value="cliente">
              Cliente
            </MenuItem>

          </TextField>

        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>

          <TextField
            select
            fullWidth
            label="Estado"
            value={estadoFiltro}
            onChange={(e)=>
              setEstadoFiltro(e.target.value)
            }
          >

            <MenuItem value="">
              Todos
            </MenuItem>

            <MenuItem value="true">
              Ativos
            </MenuItem>

            <MenuItem value="false">
              Inativos
            </MenuItem>

          </TextField>

        </Grid>

        <Grid
          size={{ xs: 12, md: 2 }}
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
          }}
        >

          <Tooltip title="Atualizar">

            <IconButton
              color="primary"
              onClick={onAtualizar}
            >

              <RefreshIcon />

            </IconButton>

          </Tooltip>

        </Grid>

      </Grid>

    </Box>

  )

}
