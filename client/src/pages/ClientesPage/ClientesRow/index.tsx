import {
  TableRow,
  TableCell,
  Chip
} from '@mui/material'

type Props = {
  cliente: any
}

export default function ClienteRow({
  cliente
}: Props) {

  return (

    <TableRow hover>

      <TableCell>
        {cliente.nome}
      </TableCell>

      <TableCell>
        {cliente.email}
      </TableCell>

      <TableCell>
        {cliente.telefone}
      </TableCell>

      <TableCell align="center">
        {cliente.total_alugueis ?? 0}
      </TableCell>

      <TableCell align="center">
        {cliente.total_equipamentos ?? 0}
      </TableCell>

      <TableCell align="center">
        {cliente.total_complementos ?? 0}
      </TableCell>

      <TableCell>
        {cliente.cidade || '-'}
      </TableCell>

      <TableCell>

        <Chip
          label={cliente.activo ? 'Activo' : 'Inactivo'}
          color={cliente.activo ? 'success' : 'error'}
          size="small"
        />

      </TableCell>

    </TableRow>

  )

}
