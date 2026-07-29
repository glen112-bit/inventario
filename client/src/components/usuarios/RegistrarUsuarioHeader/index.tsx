import { Box, Typography } from '@mui/material'

export default function RegistrarUsuarioHeader() {

  return (

    <Box mb={3}>

      <Typography variant="h4" fontWeight={700}>
        Registrar Usuário
      </Typography>

      <Typography color="text.secondary">
        Cadastro de novos usuários do sistema
      </Typography>

    </Box>

  )

}
