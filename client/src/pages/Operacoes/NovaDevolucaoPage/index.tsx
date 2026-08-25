import { useEffect, useRef, useState } from 'react'
import api from '../../../services/api'

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Grid,
  MenuItem
} from '@mui/material'

export default function NovaDevolucaoPage() {

  const inputRef = useRef<HTMLInputElement>(null)

  const [operacoes, setOperacoes] = useState<any[]>([])
  const [operacaoId, setOperacaoId] = useState('')

  const [qr, setQr] = useState('')

  const [equipamentos, setEquipamentos] = useState<any[]>([])

  const [estadoRetorno, setEstadoRetorno] =
    useState('disponivel')

  useEffect(() => {

    carregarOperacoes()

  }, [])

  useEffect(() => {

    inputRef.current?.focus()

  }, [operacaoId])

  const carregarOperacoes = async () => {

    try {

      const { data } = await api.get(
        '/operacoes'
      )

      setOperacoes(
        data.filter(
          (o: any) =>
            o.tipo === 'saida' &&
            o.status === 'finalizada'
        )
      )

    } catch (error) {

      console.error(error)

    }

  }

  const lerQRCode = async () => {

    if (!qr.trim()) return

    try {

      const usuario = JSON.parse(
        localStorage.getItem('usuario') || '{}'
      )

      const { data } = await api.post(

        `/operacoes/${operacaoId}/devolver`,

        {

          qr,

          usuario_id: usuario.id,

          estado_retorno: estadoRetorno

        }

      )

      setEquipamentos(prev => [
        data.equipamento,
        ...prev
      ])

      setQr('')

      inputRef.current?.focus()

    } catch (error: any) {

      alert(
        error.response?.data?.error
      )

      setQr('')

      inputRef.current?.focus()

    }

  }

  const finalizar = async () => {

    await api.put(
      `/operacoes/${operacaoId}/finalizar`
    )

    alert('Devolução concluída.')

    setEquipamentos([])

    setOperacaoId('')

  }

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Nova Devolução
      </Typography>

      <Paper sx={{ p:4 }}>

        <Grid
          container
          spacing={2}
        >

          <Grid size={{ xs:12 }}>

            <TextField

              select

              fullWidth

              label="Operação"

              value={operacaoId}

              onChange={(e)=>

                setOperacaoId(
                  e.target.value
                )

              }

            >

              {

                operacoes.map((o:any)=>(

                  <MenuItem

                    key={o.id}

                    value={o.id}

                  >

                    #{o.id} - {o.cliente}

                  </MenuItem>

                ))

              }

            </TextField>

          </Grid>

          {

            operacaoId &&

            <>

              <Grid size={{ xs:8 }}>

                <TextField

                  inputRef={inputRef}

                  fullWidth

                  label="QR Code"

                  value={qr}

                  onChange={(e)=>

                    setQr(
                      e.target.value
                    )

                  }

                  onKeyDown={(e)=>{

                    if(e.key==='Enter'){

                      lerQRCode()

                    }

                  }}

                />

              </Grid>

              <Grid size={{ xs:4 }}>

                <TextField

                  select

                  fullWidth

                  label="Estado"

                  value={estadoRetorno}

                  onChange={(e)=>

                    setEstadoRetorno(
                      e.target.value
                    )

                  }

                >

                  <MenuItem value="disponivel">
                    Disponível
                  </MenuItem>

                  <MenuItem value="manutencao">
                    Manutenção
                  </MenuItem>

                  <MenuItem value="danificado">
                    Danificado
                  </MenuItem>

                </TextField>

              </Grid>

            </>

          }

        </Grid>

        <Divider sx={{ my:4 }}/>

        <Typography
          variant="h6"
          mb={2}
        >
          Equipamentos Recebidos
        </Typography>

        <List>

          {

            equipamentos.map((eq:any)=>(

              <ListItem
                key={eq.equipamento_id}
                divider
              >

                <ListItemText

                  primary={
                    eq.codigo_interno
                  }

                  secondary={
                    `${eq.marca} ${eq.modelo}`
                  }

                />

                <Chip

                  color="success"

                  label={estadoRetorno}

                />

              </ListItem>

            ))

          }

        </List>

        {

          operacaoId &&

          <Button

            sx={{ mt:3 }}

            variant="contained"

            color="success"

            onClick={finalizar}

          >

            Finalizar Devolução

          </Button>

        }

      </Paper>

    </Box>

  )

}
