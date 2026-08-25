import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert
} from '@mui/material'

export default function SetupAdminPage() {

    const navigate = useNavigate()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const criarAdmin = async () => {

        setError('')

        if (!nome.trim()) {
            setError('Informe o nome.')
            return
        }

        if (!email.trim()) {
            setError('Informe o email.')
            return
        }

        if (!password) {
            setError('Informe a senha.')
            return
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.')
            return
        }

        try {

            setLoading(true)

            await api.post(
                '/setup/admin',
                {
                    nome,
                    email,
                    telefone,
                    password
                }
            )

            alert(
                'Administrador criado com sucesso!'
            )

            navigate('/login', {
                replace: true
            })

        } catch (error: any) {

            console.error(error)

            setError(
                error.response?.data?.error ||
                'Não foi possível criar o administrador.'
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
                bgcolor: '#0f172a',
                p: 2
            }}
        >

            <Paper
                elevation={10}
                sx={{
                    width: '100%',
                    maxWidth: 460,
                    p: 4,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    mb={1}
                >
                    Configuração inicial
                </Typography>

                <Typography
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Crie o primeiro administrador do sistema
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Nome"
                    margin="normal"
                    value={nome}
                    onChange={(e) =>
                        setNome(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    label="Telefone"
                    margin="normal"
                    value={telefone}
                    onChange={(e) =>
                        setTelefone(e.target.value)
                    }
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Senha"
                    margin="normal"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
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
                    size="large"
                    sx={{ mt: 3 }}
                    disabled={loading}
                    onClick={criarAdmin}
                >
                    {loading
                        ? 'Criando administrador...'
                        : 'Criar administrador'}
                </Button>

            </Paper>

        </Box>
    )
}
