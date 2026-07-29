import {
  Box,
  Typography,
  Button
} from '@mui/material'

import PersonAddIcon from '@mui/icons-material/PersonAdd'

type Props = {
  onNovo: () => void
}

export default function UsuariosHeader({
  onNovo
}: Props) {

  return (

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}
    >

      <Box>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Usuários
        </Typography>

        <Typography
          color="text.secondary"
        >
          Cadastro e gerenciamento de usuários do sistema
        </Typography>

      </Box>

      <Button
        variant="contained"
        startIcon={<PersonAddIcon />}
        onClick={onNovo}
      >
        Novo Usuário
      </Button>

    </Box>

  )

}
