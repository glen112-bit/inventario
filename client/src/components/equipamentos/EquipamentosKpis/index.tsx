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
  total:number
  disponiveis:number
  alugados:number
  manutencao:number
  danificados:number
  onFiltro:(status:string)=>void
}


export default function EquipamentosKpis({
  total,
  disponiveis,
  alugados,
  manutencao,
  danificados,
  onFiltro
}:Props){

  const cards = [
    {
      titulo:'Total',
      valor:total,
      filtro:'',
      icon:<Inventory2Icon />,
      color:'#3b82f6'
    },
    {
      titulo:'Disponíveis',
      valor:disponiveis,
      filtro:'disponivel',
      icon:<HandshakeIcon />,
      color:'#10b981'
    },
    {
      titulo:'Alugados',
      valor:alugados,
      filtro:'alugado',
      icon:<PeopleIcon />,
      color:'#8b5cf6'
    },
    {
      titulo:'Manutenção',
      valor:manutencao,
      filtro:'manutencao',
      icon:<BuildIcon />,
      color:'#f59e0b'
    },
    {
      titulo:'Danificados',
      valor:danificados,
      filtro:'danificados',
      icon:<WarningIcon />,
      color:'#ef4444'
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
              onFiltro(card.filtro)
            }
            sx={{
              cursor:'pointer',
              p:3,
              borderRadius:4,
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
              {card.valor || 0}
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
