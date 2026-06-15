import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Box,
  Button,
  Chip
} from '@mui/material'

import Inventory2Icon from '@mui/icons-material/Inventory2'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  equipamentos:any[]
  categorias:any[]
  localizacoes:any[]
  onEditar:(equipamento:any)=>void
}

export default function EquipamentosTable({
  equipamentos,
  categorias,
  localizacoes,
  onEditar
}:Props) {

  const getCategoriaNome = (
    id:number
  ) => {

    const categoria =
      categorias.find(
        c => c.id === id
      )

    return categoria?.nombre || '-'

  }

  const getLocalizacaoNome = (
    id:number
  ) => {

    const localizacao =
      localizacoes.find(
        l => l.id === id
      )

    return localizacao?.nombre || '-'

  }

  const getEstadoLabel = (
    estado:string
  ) => {

    switch(estado){

      case 'disponivel':
        return 'Disponível'

      case 'alugado':
        return 'Alugado'

      case 'manutencao':
        return 'Manutenção'

      case 'danificado':
        return 'Danificado'

      default:
        return estado

    }

  }

  return (

    <TableContainer>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              Equipamento
            </TableCell>

            <TableCell>
              Série
            </TableCell>

            <TableCell>
              Categoria
            </TableCell>

            <TableCell>
              Marca
            </TableCell>

            <TableCell>
              Localização
            </TableCell>

            <TableCell>
              Valor
            </TableCell>

            <TableCell>
              Status
            </TableCell>

            <TableCell align="center">
              Ações
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {equipamentos.map(
            equipamento => (

              <TableRow
                hover
                key={
                  equipamento.equipamento_id
                }
              >

                <TableCell>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >

                    <Avatar>

                      <Inventory2Icon />

                    </Avatar>

                    <Typography
                      fontWeight={600}
                    >
                      {equipamento.marca} {equipamento.modelo}
                    </Typography>

                  </Box>

                </TableCell>

                <TableCell>
                  {equipamento.numero_serie}
                </TableCell>

                <TableCell>
                  {
                    getCategoriaNome(
                      equipamento.categoria_id
                    )
                  }
                </TableCell>

                <TableCell>
                  {equipamento.marca}
                </TableCell>

                <TableCell>
                  {
                    getLocalizacaoNome(
                      equipamento.ubicacion_id
                    )
                  }
                </TableCell>

                <TableCell>

                  R$ {
                    Number(
                      equipamento.valor
                    ).toLocaleString(
                      'pt-BR',
                      {
                        minimumFractionDigits:2
                      }
                    )
                  }

                </TableCell>

                <TableCell>

                  <Chip
                    size="small"
                    variant="outlined"
                    label={
                      getEstadoLabel(
                        equipamento.estado_actual
                      )
                    }
                  />

                </TableCell>

                <TableCell align="center">

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() =>
                      onEditar(
                        equipamento
                      )
                    }
                  >
                    Editar
                  </Button>

                </TableCell>

              </TableRow>

            )
          )}

        </TableBody>

      </Table>

    </TableContainer>

  )

}
