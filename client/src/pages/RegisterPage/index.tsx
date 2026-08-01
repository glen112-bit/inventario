
import { useState } from 'react'
import api from '../../services/api'

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    nome:'',
    email:'',
    telefone:'',
    password:'',
    confirmPassword:''
  })

  const register = async () => {
    if(user.password !== user.confirmPassword){
      alert('As senhas não coincidem')
      return
    }

    try {

      setLoading(true)

      await api.post(
        `/registrar`, {
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          password: user.password,
        }
      )
      alert('Usuario Registrado com Sucesso')

      navigate('/login')


    } catch(error:any) {
      console.error(error)
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao Regisrtar Usuario'
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <Box
      sx={{
        minHeight:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        bgcolor:'#111827'
      }}
    >

      <Paper
        sx={{
          width:420,
          p:2,
          borderRadius:2
        }}
      >

        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
        >
          Registrar Usuario
        </Typography>

        <TextField
          fullWidth
          label="Nome"
          margin="normal"
          value={user.nome}
          onChange={(e)=>
              setUser({
                ...user,
                nome: e.target.value
              })
          }
        />

        <TextField
          fullWidth
          type="email"
          label="Email"
          margin="normal"
          value={user.email}
          onChange={(e)=>
              setUser({
                ...user,
                email: e.target.value
              })
          }
        />


        <TextField
          fullWidth
          label="Telefone"
          margin="normal"
          value={user.telefone}
          onChange={(e)=>
              setUser({
                ...user,
                telefone: e.target.value
              })
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Senha"
          margin="normal"
          value={user.password}
          onChange={(e)=>
              setUser({
                ...user,
                password: e.target.value
              })
          }
        />


        <TextField
          fullWidth
          type="password"
          label="Confirmar Senhga"
          margin="normal"
          value={user.confirmPassword}
          error={
            user.confirmPassword.length > 0 &&
            user.password !== user.confirmPassword
          }
          helperText={
            user.confirmPassword.length > 0 &&
              user.password !== user.confirmPassword
                ? 'AS Senhas não coincidem'
                : ''
          }
          onChange={(e)=>
              setUser({
                ...user,
                confirmPassword: e.target.value
              })
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt:3 }}
          disabled={loading}
          onClick={register}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>

       <Button
          fullWidth
          variant="contained"
          sx={{ mt:3 }}
          disabled={loading}
         onClick={(e) => navigate('/login')}
        >
         Login
        </Button>

      </Paper>

    </Box>

  )

}
