import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

type Equipo = {
  marca:string
  modelo:string
  estado:string
  descripcion:string
  localizacao:string
  valor:number
}

type Props = {
  equipos:Equipo[]
  onEditar?:(equipo:Equipo)=>void
}

export default function EquipamentosTable({
  equipos,
  onEditar
}:Props){
  return (

    <Paper
      sx={{
        borderRadius:1,
        border:'1px solid',
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
        overflow:'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              // sx={{
                // '& td': {
                  // borderBottom: 'none'
              // },
              // borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
              // }}
            >
              <TableCell>
                Marca
              </TableCell>
              <TableCell>
               Modelo 
              </TableCell>
              <TableCell>
                Estado
              </TableCell>
              <TableCell>
               Descicao 
              </TableCell>
              <TableCell>
                Localizacao
              </TableCell>
              <TableCell>
                Valor
              </TableCell>
              <TableCell>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipos.map(equipo => (
              <TableRow
                hover
                key={`${equipo.marca}-${equipo.modelo}`}
              >
                 <TableCell>
                  {equipo.marca}
                </TableCell>
                <TableCell>
                  {equipo.modelo}
                </TableCell>
                <TableCell>
                  {equipo.estado}
                </TableCell>
                <TableCell>
                  {equipo.descripcion}
                </TableCell>
                 <TableCell>
                  {equipo.localizacao}
                </TableCell>
                <TableCell>
                  {equipo.valor}
                </TableCell>
<TableCell>
  <Button
    size="small"
    onClick={() => onEditar?.(equipo)}
  >
    <EditIcon />
  </Button>
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
