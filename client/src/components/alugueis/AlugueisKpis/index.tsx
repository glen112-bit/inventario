import Grid from '@mui/material/Grid'
import {
  Paper,
  Typography,
  Box
} from '@mui/material'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import HandshakeIcon from '@mui/icons-material/Handshake'
import PeopleIcon from '@mui/icons-material/People'
import BuildIcon from '@mui/icons-material/Build'
import WarningIcon from '@mui/icons-material/Warning'

type Props = {
  ativos:number
  reservados:number
  retornados:number
  cancelados:number
  onFiltro:(status:string)=>void
}

export default function AlugueisKpis({
  ativos,
  reservados,
  retornados,
  cancelados,
  onFiltro
}: Props) {

  const cards = [
    {
      titulo:'Ativos',
      valor:ativos,
      filtro:'ativo',
      icon:<PeopleIcon />,
      color:'#8b5cf6'
    },
    {
      titulo:'Reservados',
      valor:reservados,
      filtro:'reservado',
      icon:<PeopleIcon />,
      color:'#8b5cf6'
    },
    {
      titulo:'Retornados',
      valor:retornados,
      filtro:'retornado',
      icon:<HandshakeIcon />,
      color:'#10b981'
    },
    {
      titulo:'Cancelados',
      valor:cancelados,
      filtro:'cancelado',
      icon:<HandshakeIcon />,
      color:'#10b981'
    }
  ]

  return (

    <Grid
      container
      spacing={3}
      mb={4}
    >

      {cards.map(card => (

        <Grid
          key={card.titulo}
          size={{
            xs:12,
            sm:6,
            md:4,
            lg:2.4
          }}
        >

          <Paper
            onClick={() =>
              onFiltro(
                card.filtro
              )
            }
            sx={{
              p:3,
              borderRadius:4,
              cursor:'pointer',
              transition:'0.2s',
              '&:hover':{
                transform:'translateY(-2px)',
                border:`1px solid ${card.color}`
              }
            }}
          >

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >

              <Box>
            <Typography
              color="text.secondary"
            >
              {card.titulo}
            </Typography>

            <Typography
              variant="h4"
            >
              {card.valor}
            </Typography>
              </Box>

              <Box
                sx={{
                  width:48,
                  height:48,
                  borderRadius:2,
                  background:`${card.color}20`,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  color:card.color
                }}
              >
                {card.icon}
              </Box>

            </Box>
          </Paper>

        </Grid>

      ))}

    </Grid>

  )

}
