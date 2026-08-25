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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const fazerLogin = async () => {

    try {

      setLoading(true)

      const response = await api.post(
        `/auth/login`,
        {
          email,
          password 
        }
      )
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
          label="Email"
          margin="normal"
          value={email}
          onChange={(e)=>
          setEmail(e.target.value)
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
        <Button
        fullWidth
        variant="contained"
          sx={{ mt:2 }}
          disabled={loading}
          onClick={(e) => navigate('/registrar')}
        >
          Registrar
        </Button>

        </Paper>

    </Box>

      )

}
