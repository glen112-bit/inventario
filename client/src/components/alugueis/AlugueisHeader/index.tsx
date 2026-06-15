import {
  Box,
  Button,
  Typography
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

type Props = {
  onNovo: () => void
}

export default function PageHeader({
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
          Aluguéis
        </Typography>

        <Typography
          color="text.secondary"
        >
          Gestão de locações
        </Typography>

      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNovo}
      >
        Novo Aluguel
      </Button>

    </Box>

  )

}
