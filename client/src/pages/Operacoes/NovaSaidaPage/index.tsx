import { useEffect, useRef, useState } from 'react';
import api from '../../../services/api'
import { QrReader } from 'react-qr-reader'

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CameraswitchIcon from '@mui/icons-material/Cameraswitch'

import {
    Stack,
    IconButton,
    CircularProgress
} from '@mui/material'
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material'

export default function NovaSaidaPage() {

  const inputRef = useRef<HTMLInputElement>(null)
  const [clientes, setClientes] = useState([])
  const [clienteId, setClienteId] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [operacaoId, setOperacaoId] = useState<number | null>(null)
  const [qr, setQr] = useState('')

 const [pedido,setPedido]=useState([])
 const [escaneados,setEscaneados]=useState<any[]>([])

const [camera,setCamera]=useState<'environment'|'user'>(
    'environment'
)

const [loadingScan,setLoadingScan]=useState(false)

  useEffect(() => {
    carregarClientes()
  }, [])

  useEffect(() => {
    inputRef.current?.focus()
  }, [operacaoId])

  const carregarClientes = async () => {
    const { data } = await api.get('/clientes')
    setClientes(data)
  }

  const iniciarSaida = async () => {
    const usuario = JSON.parse(
      localStorage.getItem('usuario') || '{}'
    )
  
    const { data } = await api.post(
      '/operacoes',
      {
        tipo: 'saida',
        cliente_id: clienteId,
        usuario_id: usuario.id,
        observacoes
      }
    )
    setOperacaoId(data.operacao_id)
  }

const lerQRCode = async (codigo?:string)=>{

    const valor=codigo ?? qr

    if(!valor.trim()) return

    if(loadingScan) return

    try{

        setLoadingScan(true)

        const usuario=JSON.parse(
            localStorage.getItem('usuario')||'{}'
        )

        const {data}=await api.post(

            `/operacoes/${operacaoId}/scan`,

            {
                qr:valor,
                usuario_id:usuario.id
            }

        )

        setEscaneados(prev=>{

            if(
                prev.some(
                    item=>
                    item.equipamento_id===
                    data.equipamento.equipamento_id
                )
            ){
                return prev
            }

            return[
                data.equipamento,
                ...prev
            ]

        })

        setQr('')

    }catch(error:any){

        alert(
            error.response?.data?.error ??
            'Erro ao ler QR'
        )

    }finally{

        setLoadingScan(false)

        inputRef.current?.focus()

    }

}



  const finalizar = async () => {
    await api.put(
      `/operacoes/${operacaoId}/finalizar`
    )
    alert('Saída registrada.')
    setOperacaoId(null)
    setEquipamentos([])
  }
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Nova Saída
      </Typography>
      <Paper sx={{ p:4 }}>
        {
          !operacaoId &&
          <Grid container spacing={2}>
            <Grid size={{ xs:12 }}>
              <TextField
                select
                fullWidth
                label="Cliente"
                value={clienteId}
                onChange={(e)=>
                  setClienteId(
                    e.target.value
                  )
                }
              >
                {
                  clientes.map((c:any)=>(
                    <option
                      key={c.id}
                      value={c.id}
                    >
                      {c.nome}
                    </option>
                  ))
                }
              </TextField>
            </Grid>
            <Grid size={{ xs:12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações"
                value={observacoes}
                onChange={(e)=>
                  setObservacoes(
                    e.target.value
                  )
                }
              />
            </Grid>
            <Grid size={{ xs:12 }}>
              <Button
                variant="contained"
                onClick={iniciarSaida}
              >
                Iniciar Operação
              </Button>
            </Grid>
          </Grid>
        }
        {
          operacaoId &&
          <>
            <Typography
              variant="h6"
              mb={2}
            >
              Escaneie os QR Codes
            </Typography>
<Paper
    sx={{
        p:2,
        mb:3,
        borderRadius:3
    }}
>

    <Stack
        direction="row"
        justifyContent="space-between"
        mb={2}
    >

        <Typography
            fontWeight={700}
        >

            Scanner

        </Typography>

        <IconButton
            onClick={()=>
                setCamera(
                    camera==='environment'
                    ?'user'
                    :'environment'
                )
            }
        >

            <CameraswitchIcon/>

        </IconButton>

    </Stack>

    <QrReader

        constraints={{
            facingMode:camera
        }}

        scanDelay={600}

        onResult={(result)=>{

            if(result){

                lerQRCode(
                    result.getText()
                )

            }

        }}

        containerStyle={{
            width:'100%'
        }}

    />

</Paper>
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
            <Divider sx={{my:3}}/>
            <Typography
              fontWeight={700}
            >
              Equipamentos
            </Typography>
<Divider sx={{my:3}}/>

<Typography
    variant="h6"
>

    Escaneados ({escaneados.length})

</Typography>

{
    loadingScan &&

    <Box
        display="flex"
        justifyContent="center"
        mt={2}
    >

        <CircularProgress/>

    </Box>

}
            <List>
              {
                escaneados.map(eq=>(
                  <ListItem
                    key={eq.equipamento_id}
                  >
                    <ListItemText
                      primary={
                        eq.codigo_interno
                      }
                      secondary={
                        `${eq.marca} ${eq.modelo}`
                      }
                    />
                  </ListItem>
                ))
              }
            </List>
            <Button
              variant="contained"
              color="success"
              onClick={finalizar}
            >
              Finalizar Saída
            </Button>
          </>
        }
      </Paper>
    </Box>
  )
}
