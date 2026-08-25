import {

  Grid,
  Paper,
  Typography,
  Chip

} from '@mui/material'

export default function InformacoesTab({

  equipamento

}:any){

  return(

    <Grid container spacing={2}>

      <Grid size={{xs:12,md:6}}>

        <Paper sx={{p:2}}>

          <Typography>Código</Typography>

          <Typography fontWeight={700}>

            {equipamento.codigo_interno}

          </Typography>

        </Paper>

      </Grid>

      <Grid size={{xs:12,md:6}}>

        <Paper sx={{p:2}}>

          <Typography>Estado</Typography>

          <Chip

            label={equipamento.estado_actual}

            color="success"

          />

        </Paper>

      </Grid>

      <Grid size={{xs:12,md:4}}>

        <Paper sx={{p:2}}>

          Marca

          <br/>

          {equipamento.marca}

        </Paper>

      </Grid>

      <Grid size={{xs:12,md:4}}>

        <Paper sx={{p:2}}>

          Modelo

          <br/>

          {equipamento.modelo}

        </Paper>

      </Grid>

      <Grid size={{xs:12,md:4}}>

        <Paper sx={{p:2}}>

          Série

          <br/>

          {equipamento.numero_serie}

        </Paper>

      </Grid>

      <Grid size={{xs:12}}>

        <Paper sx={{p:2}}>

          QR Code

          <br/>

          {equipamento.qr_code}

        </Paper>

      </Grid>

    </Grid>

  )

}
