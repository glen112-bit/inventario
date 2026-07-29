import {
  Box,
  Typography,
  Button
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

type Props = {
  rol?: string
  onNovo: () => void
}

export default function ClientesHeader({
  rol,
  onNovo
}: Props) {

  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >

      <Box>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          Clientes
        </Typography>

        <Typography color="text.secondary">
          Gestão de clientes e empresas
        </Typography>

      </Box>

      {(rol === 'admin' || rol === 'operador') && (

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onNovo}
        >
          Novo Cliente
        </Button>

      )}

    </Box>

  )

}
