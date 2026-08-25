import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button
} from '@mui/material'

export default function AceitarConvitePage() {

  const { token } = useParams()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const aceitarConvite = async () => {

    if (!nome || !password) {
      alert('Nome e senha são obrigatórios')
      return
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    try {

      setLoading(true)

      await api.post(`/convites/${token}/aceitar`, {
        nome,
        telefone,
        password
      })

      alert('Usuário criado com sucesso.')

      navigate('/login')

    } catch (error: any) {

      console.error(error)

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Erro ao aceitar convite'
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#111827'
      }}
    >

      <Paper
        sx={{
          width: 420,
          p: 4,
          borderRadius: 2
        }}
      >

        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          mb={3}
        >
          Criar sua conta
        </Typography>

        <TextField
          fullWidth
          label="Nome"
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <TextField
          fullWidth
          label="Telefone"
          margin="normal"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Senha"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          type="password"
          label="Confirmar senha"
          margin="normal"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}
          onClick={aceitarConvite}
        >
          {loading
            ? 'Criando conta...'
            : 'Aceitar convite'}
        </Button>

        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate('/login')}
        >
          Voltar ao login
        </Button>

      </Paper>

    </Box>
  )
}
