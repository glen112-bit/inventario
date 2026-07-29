import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button
} from '@mui/material'

import useRegistrarUsuario from '../../../hooks/useRegistrarUsuario'

export default function RegistrarUsuarioForm(){

  const {
    form,
    setForm,
    salvar
  } = useRegistrarUsuario()

  return (

    <Paper
      sx={{
        p:4,
        borderRadius:3
      }}
    >

      <Grid container spacing={2}>

        <Grid size={{xs:12,md:6}}>

          <TextField
            fullWidth
            label="Nome"
            value={form.nome}
            onChange={(e)=>
              setForm({
                ...form,
                nome:e.target.value
              })
            }
          />

        </Grid>

        <Grid size={{xs:12,md:6}}>

          <TextField
            fullWidth
            label="Telefone"
            value={form.telefone}
            onChange={(e)=>
              setForm({
                ...form,
                telefone:e.target.value
              })
            }
          />

        </Grid>

        <Grid size={{xs:12,md:6}}>

          <TextField
            fullWidth
            label="Senha"
            type="password"
            value={form.password}
            onChange={(e)=>
              setForm({
                ...form,
                password:e.target.value
              })
            }
          />

        </Grid>

        <Grid size={{xs:12,md:6}}>

          <TextField
            select
            fullWidth
            label="Perfil"
            value={form.rol}
            onChange={(e)=>
              setForm({
                ...form,
                rol:e.target.value
              })
            }
          >

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

      </Grid>

      <Button
        sx={{mt:3}}
        variant="contained"
        onClick={salvar}
      >
        Salvar
      </Button>

    </Paper>

  )

}
