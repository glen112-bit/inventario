import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

type Categoria = {
  id:number
  nombre:string
  descricao?:string
}

type Props = {
  categorias:Categoria[]
  onEditar?:(categoria:Categoria)=>void
}

export default function CategoriasTable({
  categorias,
  onEditar
}:Props){

  return (

    <Paper
      sx={{
        borderRadius:1,
        border:1
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
        overflow:'hiden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Descrição
              </TableCell>
              <TableCell align="center">
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categorias.map(categoria => (
              <TableRow
                hover
                key={categoria.id}
              >
                <TableCell>
                  {categoria.id}
                </TableCell>
                <TableCell>
                  {categoria.nome}
                </TableCell>
                <TableCell>
                  {categoria.descricao || '-'}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() =>
                      onEditar?.(
                        categoria
                      )
                    }
                  >
                    Editar
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
