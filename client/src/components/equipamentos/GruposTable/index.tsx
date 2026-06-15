// src/components/equipamentos/GruposTable/index.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material'

type Props = {
  grupos:any[]
  categorias:any[]
}

export default function GruposTable({
  grupos,
  categorias
}:Props){

  const getCategoriaNome = (
    categoriaId:number
  ) => {

    const categoria =
      categorias.find(
        c => c.id === categoriaId
      )

    return categoria?.nombre ??
      categoriaId

  }

  return (

    <TableContainer
      component={Paper}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Marca
            </TableCell>

            <TableCell>
              Modelo
            </TableCell>

            <TableCell>
              Categoria
            </TableCell>

            <TableCell align="center">
              Total
            </TableCell>

            <TableCell align="center">
              Disponíveis
            </TableCell>

            <TableCell align="center">
              Alugados
            </TableCell>

            <TableCell align="center">
              Manutenção
            </TableCell>

            <TableCell align="center">
              Danificados
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {grupos.map(
            grupo => (

              <TableRow
                key={`${grupo.marca}-${grupo.modelo}-${grupo.categoria_id}`}
                hover
              >

                <TableCell>
                  {grupo.marca}
                </TableCell>

                <TableCell>
                  {grupo.modelo}
                </TableCell>

                <TableCell>
                  {
                    getCategoriaNome(
                      grupo.categoria_id
                    )
                  }
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={grupo.total}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  {grupo.disponiveis}
                </TableCell>

                <TableCell align="center">
                  {grupo.alugados}
                </TableCell>

                <TableCell align="center">
                  {grupo.manutencao}
                </TableCell>

                <TableCell align="center">
                  {grupo.danificados}
                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>

    </TableContainer>

  )

}
