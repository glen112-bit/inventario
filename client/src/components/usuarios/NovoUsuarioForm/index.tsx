
import React, { useState } from 'react'
import {
  TextField,
  Button,
  MenuItem
} from '@mui/material'

import Grid from '@mui/material/Grid'

type Props = {
  form:any
  setForm:any
}

export default function NovoUsuarioForm({
  form,
  setForm,
}:Props) {



  return (

    <Grid container spacing={2}>

      <Grid size={{ xs:12, md:6 }}>
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

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          label="E-mail"
          value={form.email}
          onChange={(e)=>
            setForm({
            ...form,
            email:e.target.value
          })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
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

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          type="password"
          label="Senha"
          value={form.senha}
          onChange={(e)=>
            setForm({
            ...form,
            senha:e.target.value
          })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
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
        </TextField>
      </Grid>

    </Grid>
  )

}
