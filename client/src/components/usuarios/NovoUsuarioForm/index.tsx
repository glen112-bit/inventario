
import React from 'react'
import {
  TextField,
  Button,
  MenuItem
} from '@mui/material'

import Grid from '@mui/material/Grid'

interface UsuarioForm {
  nome: string
  email: string
  telefone: string
  password: string
  confirmarSenha: string
  senhaAtual: string
  rol: string
  activo: number
}
type Props = {
  form:UsuarioForm 
  setForm: React.Dispatch<React.SetStateAction<UsuarioForm>>
  resetForm: () => void
  usuarioSelecionado?: any
}

export default function NovoUsuarioForm({
  form,
  setForm,
  resetForm,
  usuarioSelecionado
}:Props) {
  // console.log(form)
  // const [confirmarSenha, setConfirmarSenha] = useState('')
  const senhasDiferentes =
    form.confirmarSenha?.length > 0 &&
    form.password !== form.confirmarSenha


console.log("FORM:", form)

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
 onChange={(e) => {
    console.log("onChange:", e.target.value);

    setForm((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  }}
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
          <TextField
            select
            fullWidth
            label="Estado"
            value={form.activo}
            onChange={(e)=>
              setForm({
              ...form,
              activo:Number(e.target.value)
            })
            }
          >
            <MenuItem value={1}>
              Ativo
            </MenuItem>

            <MenuItem value={0}>
              Inativo
            </MenuItem>
          </TextField>

        </Grid>
      )}

    </Grid>

  )


}
