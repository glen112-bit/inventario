import {
  Box,
  Typography,
  Button
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

type Props = {
  onNovo: () => void
}

export default function ComplementosHeader({
  onNovo
}: Props) {

  return (

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      mt={4}
    >

      <Box>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          Complementos
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Equipamentos adicionados após a criação do aluguel.
        </Typography>

      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNovo}
      >
        Novo Complemento
      </Button>

    </Box>

  )

}
