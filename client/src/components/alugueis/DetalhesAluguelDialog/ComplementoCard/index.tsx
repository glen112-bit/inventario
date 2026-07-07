import {
  Card,
  CardHeader,
  CardContent,
  Chip,
  Stack,
  Typography,
  Divider,
  IconButton
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import ComplementoTable from '../ComplementoTable'

type Props = {
  complemento:any

  onEditar?:(complemento:any)=>void
  onExcluir?:(complemento:any)=>void
  onFinalizar?:(complemento:any)=>void
  onPdf?:(complemento:any)=>void
}

export default function ComplementoCard({

  complemento,

  onEditar,
  onExcluir,
  onFinalizar,
  onPdf

}:Props){

  const formatarData = (data?:string)=>{

    if(!data) return '-'

    return new Date(data)
      .toLocaleDateString('pt-BR')

  }

  return (

    <Card
      sx={{
        mt:3,
        borderRadius:2
      }}
    >

      <CardHeader

        title={
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Complemento #{complemento.id}
          </Typography>
        }

        subheader={

          <Stack
            direction="row"
            spacing={2}
            mt={1}
            flexWrap="wrap"
          >

            <Typography variant="body2">

              <strong>Saída:</strong>{' '}

              {formatarData(
                complemento.fecha_salida
              )}

            </Typography>

            <Typography variant="body2">

              <strong>Retorno:</strong>{' '}

              {formatarData(
                complemento.fecha_retorno
              )}

            </Typography>

            <Chip
              size="small"
              color={
                complemento.estado === 'ativo'
                  ? 'success'
                  : 'default'
              }
              label={complemento.estado}
            />

          </Stack>

        }

        action={

          <Stack direction="row">

            <IconButton
              color="primary"
              onClick={()=>
                onEditar?.(complemento)
              }
            >
              <EditIcon/>
            </IconButton>

            <IconButton
              color="secondary"
              onClick={()=>
                onPdf?.(complemento)
              }
            >
              <PictureAsPdfIcon/>
            </IconButton>

            <IconButton
              color="success"
              onClick={()=>
                onFinalizar?.(complemento)
              }
            >
              <CheckCircleIcon/>
            </IconButton>

            <IconButton
              color="error"
              onClick={()=>{

                if(
                  window.confirm(
                    `Excluir complemento #${complemento.id}?`
                  )
                ){

                  onExcluir?.(complemento)

                }

              }}
            >
              <DeleteIcon/>
            </IconButton>

          </Stack>

        }

      />

      <Divider/>

      <CardContent>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
        >
          Equipamentos adicionados neste complemento
        </Typography>

        <ComplementoTable
          equipamentos={
            complemento.equipamentos || []
          }
        />

      </CardContent>

    </Card>

  )

}
