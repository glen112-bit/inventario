
import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  MenuItem
} from '@mui/material'

import Grid from '@mui/material/Grid'

type Props = {
  form: any
  setForm: any
  resetForm: void
  usuarioSelecionado?: any
}

export default function NovoUsuarioForm({
  form,
  setForm,
  resetForm,
  usuarioSelecionado
}:Props) {
console.log(form)
  // const [confirmarSenha, setConfirmarSenha] = useState('')
  const senhasDiferentes =
    form.confirmarSenha?.length > 0 &&
    form.password !== form.confirmarSenha



  return (

    <Grid container spacing={2}>

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          label=" Novo Nome"
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
          label="Novo E-mail"
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
          label="Novo Telefone"
          autoComplete="new-password"
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
          label="Nova Senha"
          value={form.password}
          onChange={(e)=>
              setForm({
                ...form,
                password:e.target.value
              })
          }
        />
      </Grid>

      <Grid size={{ xs:12, md:6 }}>
        <TextField
          fullWidth
          type="password"
          label="Repetir Senha"
          value={form.confirmarSenha}
          error={senhasDiferentes}
          helperText={
            senhasDiferentes
              ? 'As senhas não coincidem'
              : ''
          }
          onChange={(e)=>
              setForm({
                ...form,
                confirmarSenha: e.target.value
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
      {usuarioSelecionado && (

        <Grid size={{ xs:12 }}>
          <TextField
            fullWidth
            type="password"
            label="Senha atual para confirmar"
            value={form.senhaAtual}
            onChange={(e) =>
            setForm({
              ...form,
                senhaAtual: e.target.value
            })
            }
        />
          </Grid>

      )}

        </Grid>

  )


}
