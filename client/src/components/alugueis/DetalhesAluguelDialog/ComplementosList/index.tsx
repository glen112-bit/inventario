import {
  Box,
  Typography,
  Paper
} from '@mui/material'

import ComplementoCard from '../ComplementoCard'

type Props = {
  complementos?: any[]

  onEditar?:(complemento:any)=>void
  onExcluir?:(complemento:any)=>void
  onFinalizar?:(complemento:any)=>void
  onPdf?:(complemento:any)=>void
}

export default function ComplementosList({

  complementos = [],

  onEditar,
  onExcluir,
  onFinalizar,
  onPdf

}: Props) {

  return (

    <Box mt={4}>

      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
      >
        Complementos
      </Typography>

      {

        complementos.length === 0 ? (

          <Paper
            variant="outlined"
            sx={{
              p:4,
              borderRadius:2,
              textAlign:'center'
            }}
          >

            <Typography
              color="text.secondary"
            >
              Este aluguel ainda não possui complementos.
            </Typography>

          </Paper>

        ) : (

          complementos.map(complemento => (

            <ComplementoCard

              key={complemento.id}

              complemento={complemento}

              onEditar={onEditar}

              onExcluir={onExcluir}

              onFinalizar={onFinalizar}

              onPdf={onPdf}

            />

          ))

        )

      }

    </Box>

  )

}
