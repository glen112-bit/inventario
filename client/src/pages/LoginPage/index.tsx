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

export default function LoginPage() {

  const navigate = useNavigate()

  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3001/api'
  // console.log('API_URL=', API_URL)

  const fazerLogin = async () => {

    try {

      setLoading(true)

      const response = await api.post(
        `/auth/login`,
        {
          telefone,
          password 
        }
      )
      // console.log('response', response.data)
      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'usuario',
        JSON.stringify(
          response.data.usuario
        )
      )

      navigate('/')

    } catch(error:any) {
  console.log('LOGIN ERROR:', error)
  console.log('RESPONSE:', error.response)
  console.log('DATA:', error.response?.data)
      alert(
        error.response?.data?.error ||
          'Erro ao fazer login'
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
        width:400,
        p:4,
        borderRadius:4
        }}
        >

        <Typography
          variant="h5"
          mb={3}
          textAlign="center"
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Telefone"
          margin="normal"
          value={telefone}
          onChange={(e)=>
          setTelefone(e.target.value)
          }
          />

        <TextField
          fullWidth
          type="password"
          label="Senha"
          margin="normal"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <Button
        fullWidth
        variant="contained"
          sx={{ mt:2 }}
          disabled={loading}
          onClick={fazerLogin}
        >
          Entrar
        </Button>

        </Paper>

    </Box>

      )

}
