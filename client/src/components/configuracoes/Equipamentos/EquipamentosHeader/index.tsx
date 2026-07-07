import { Box, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type Props = {
  onNovo: () => void
}

export default function EquipamentosHeader({
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
          Equipamentos
        </Typography>

        <Typography color="text.secondary">
          Cadastro e gerenciamento de equipamentos
        </Typography>

      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onNovo}
      >
        Novo Equipamento
      </Button>

    </Box>

  )

}
