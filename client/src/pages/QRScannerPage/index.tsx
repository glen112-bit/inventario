import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

import api from '../../services/api'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import HomeIcon from '@mui/icons-material/Home'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import CameraswitchIcon from '@mui/icons-material/Cameraswitch'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import VisibilityIcon from '@mui/icons-material/Visibility'

import { Link } from 'react-router-dom'

import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material'

import EquipamentoProfileDialog
  from '../../components/equipamentos/Profile/EquipamentoProfileDialog'


type CameraMode = 'environment' | 'user'


export default function QRScannerPage() {

  /*
  ==========================================================
  ESTADOS
  ==========================================================
  */

  const [camera, setCamera] =
    useState<CameraMode>('environment')

  const [loading, setLoading] =
    useState(false)

  const [profile, setProfile] =
    useState<any>(null)

  const [open, setOpen] =
    useState(false)

  const [scannerReady, setScannerReady] =
    useState(false)

  const [scannerError, setScannerError] =
    useState<string | null>(null)


  /*
  ==========================================================
  REFERÊNCIAS
  ==========================================================
  */

  const scannerRef =
    useRef<Html5Qrcode | null>(null)

  const scanningRef =
    useRef(false)

  const processingRef =
    useRef(false)

  const lastCodeRef =
    useRef<string | null>(null)


  /*
  ==========================================================
  PARAR SCANNER
  ==========================================================
  */

const pararScanner = async () => {

  const scanner = scannerRef.current

  // Marcamos inmediatamente como detenido
  scanningRef.current = false
  setScannerReady(false)

  // Eliminamos la referencia antes de hacer operaciones async
  scannerRef.current = null

  if (!scanner) {
    const element = document.getElementById('qr-reader')

    if (element) {
      element.innerHTML = ''
    }

    return
  }

  try {

    await scanner.stop()

  } catch (error) {

    console.warn(
      'Erro ao parar scanner:',
      error
    )

  }

  try {

    scanner.clear()

  } catch (error) {

    console.warn(
      'Erro ao limpar scanner:',
      error
    )

  }

  // Garantía adicional
  const element =
    document.getElementById('qr-reader')

  if (element) {
    element.innerHTML = ''
  }

}


  /*
  ==========================================================
  BUSCAR EQUIPAMENTO
  ==========================================================
  */

  const buscarEquipamento = async (
    codigo: string
  ) => {

    if (!codigo) {
      return
    }

    if (processingRef.current) {
      return
    }

    /*
    Evita processar o mesmo QR repetidamente.
    */

    if (
      lastCodeRef.current === codigo
    ) {
      return
    }

    processingRef.current = true

    lastCodeRef.current = codigo

    setLoading(true)

    /*
    Para a câmera imediatamente após
    detectar o QR.

    Isso é importante:
    não precisamos continuar processando
    frames enquanto buscamos o equipamento.
    */

    await pararScanner()

    try {

      console.log(
        'QR LIDO:',
        codigo
      )

      const { data } =
        await api.get(
          `/equipamentos/qr/${encodeURIComponent(codigo)}`
        )

      console.log(
        'EQUIPAMENTO:',
        data
      )

      setProfile(data)

      setOpen(true)

    } catch (error: any) {

      console.error(
        'ERRO AO BUSCAR QR:',
        error
      )

      lastCodeRef.current = null

      setScannerError(
        error.response?.data?.error ||
        'Equipamento não encontrado.'
      )

    } finally {

      setLoading(false)

      processingRef.current = false

    }

  }


  /*
  ==========================================================
  INICIAR SCANNER
  ==========================================================
  */

const iniciarScanner = async () => {

  /*
  Evita dos inicializaciones simultáneas.
  */
  if (scanningRef.current) {
    return
  }

  const element =
    document.getElementById('qr-reader')

  if (!element) {
    console.error(
      'Elemento #qr-reader não encontrado'
    )
    return
  }

  /*
  Si existe una instancia anterior,
  eliminarla completamente.
  */
  if (scannerRef.current) {
    await pararScanner()
  }

  /*
  Limpieza física del contenedor.
  */
  element.innerHTML = ''

  setScannerError(null)

  try {

    const scanner =
      new Html5Qrcode('qr-reader')

    scannerRef.current = scanner

    await scanner.start(

      {
        facingMode: camera
      },

      {
        fps: 10,

        qrbox: {
          width: 280,
          height: 280
        },

        aspectRatio: 1,

        disableFlip: false
      },

      async decodedText => {

        if (processingRef.current) {
          return
        }

        await buscarEquipamento(
          decodedText
        )

      },

      () => {
        // Erro normal durante búsqueda de QR
      }

    )

    /*
    Es posible que durante el await
    el componente haya sido desmontado
    o haya cambiado la cámara.
    */
    if (!scannerRef.current) {

      try {
        await scanner.stop()
      } catch {}

      try {
        scanner.clear()
      } catch {}

      return
    }

    scanningRef.current = true

    setScannerReady(true)

    console.log(
      'QR SCANNER INICIADO:',
      camera
    )

  } catch (error) {

    console.error(
      'ERRO AO INICIAR QR:',
      error
    )

    scannerRef.current = null
    scanningRef.current = false

    setScannerReady(false)

    setScannerError(
      'Não foi possível acessar a câmera.'
    )

  }

}


  /*
  ==========================================================
  TROCAR CÂMERA
  ==========================================================
  */

const trocarCamera = () => {

  if (loading) {
    return
  }

  lastCodeRef.current = null
  processingRef.current = false

  setCamera(current =>
    current === 'environment'
      ? 'user'
      : 'environment'
  )

}


  /*
  ==========================================================
  FECHAR PERFIL
  ==========================================================
  */

const fecharPerfil = async () => {

  setOpen(false)

  lastCodeRef.current = null
  processingRef.current = false

  /*
  Dejamos que el Dialog termine de desmontarse.
  */
  setTimeout(() => {

    iniciarScanner()

  }, 300)

}


  /*
  ==========================================================
  INICIALIZAÇÃO
  ==========================================================
  */

  // useEffect(() => {
//
    // let ativo = true
//
    // const iniciar = async () => {
//
      // if (!ativo) {
        // return
      // }
//
      // await iniciarScanner()
//
    // }
//
    // iniciar()


    /*
    Cleanup:
    quando sair da página, a câmera
    é completamente desligada.
    */

    // return () => {
//
      // ativo = false
//
      // pararScanner()
//
    // }
//
  // }, [])


  /*
  ==========================================================
  TROCA DE CÂMERA
  ==========================================================
  */

  // useEffect(() => {

    /*
    Na primeira montagem não precisamos
    reiniciar.

    A troca de câmera será feita pelo botão.
    */

  // }, [camera])

useEffect(() => {

  let cancelado = false

  const iniciar = async () => {

    /*
    Pequeño delay para permitir que React
    termine el render.
    */
    await new Promise(resolve =>
      setTimeout(resolve, 100)
    )

    if (cancelado) {
      return
    }

    await iniciarScanner()

  }

  iniciar()

  return () => {

    cancelado = true

    pararScanner()

  }

}, [camera])
  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (

    <Box>

      {/* ==================================================
          HEADER
      ================================================== */}

      <AppBar
        position="static"
        elevation={0}
        color="inherit"
        sx={{
          mb: 3,
          borderRadius: 3,
          border: '1px solid #E5E7EB'
        }}
      >

        <Toolbar>

          <QrCodeScannerIcon
            color="primary"
            sx={{
              mr: 2
            }}
          />

          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              flexGrow: 1
            }}
          >
            Scanner QR
          </Typography>


          <Button
            component={Link}
            to="/"
            startIcon={
              <HomeIcon />
            }
          >
            Home
          </Button>


          <Button
            component={Link}
            to="/operacoes/saida"
            startIcon={
              <LocalShippingIcon />
            }
            variant="contained"
            sx={{
              ml: 2
            }}
          >
            Saída
          </Button>


          <Button
            component={Link}
            to="/operacoes/devolucao"
            startIcon={
              <KeyboardReturnIcon />
            }
            color="success"
            variant="contained"
            sx={{
              ml: 2
            }}
          >
            Devolução
          </Button>

        </Toolbar>

      </AppBar>


      {/* ==================================================
          TÍTULO
      ================================================== */}

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Scanner QRCode
      </Typography>


      {/* ==================================================
          ERRO
      ================================================== */}

      {scannerError && (

        <Alert
          severity="error"
          sx={{
            mb: 3
          }}
          onClose={() =>
            setScannerError(null)
          }
        >
          {scannerError}
        </Alert>

      )}


      {/* ==================================================
          SCANNER
      ================================================== */}

      <Paper
        sx={{
          p: 3,
          borderRadius: 4
        }}
      >

        <Box
          sx={{
            width: '100%',
            maxWidth: 700,
            mx: 'auto'
          }}
        >

          <Box
            sx={{
              width: '100%',
              minHeight: 350,
              borderRadius: 3,
              overflow: 'hidden',
              background: '#000',
              position: 'relative'
            }}
          >

            <div
              id="qr-reader"
              style={{
                width: '100%'
              }}
            />

            {!scannerReady &&
              !scannerError &&
              !loading && (

              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#000'
                }}
              >

                <Stack
                  alignItems="center"
                  spacing={2}
                >

                  <CircularProgress />

                  <Typography
                    color="white"
                  >
                    Iniciando câmera...
                  </Typography>

                </Stack>

              </Box>

            )}

          </Box>

        </Box>


        {/* ==================================================
            TROCAR CÂMERA
        ================================================== */}

        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >

          <Button
            variant="outlined"
            startIcon={
              <CameraswitchIcon />
            }
            onClick={
              trocarCamera
            }
            disabled={loading}
          >
            Cambiar cámara
          </Button>

        </Box>

      </Paper>


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading && (

        <Box
          mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >

          <CircularProgress />

          <Typography>
            Buscando equipamento...
          </Typography>

        </Box>

      )}


      {/* ==================================================
          RESULTADO
      ================================================== */}

      {profile && (

        <Paper
          sx={{
            mt: 3,
            p: 3,
            borderRadius: 4
          }}
        >

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {profile.equipamento?.codigo_interno}
          </Typography>


          <Typography>

            {profile.equipamento?.marca}

            {' '}

            {profile.equipamento?.modelo}

          </Typography>


          <Stack
            direction="row"
            spacing={1}
            mt={2}
          >

            <Chip
              label={
                profile.equipamento?.estado_actual
              }
              color="primary"
            />

          </Stack>


          <Button
            sx={{
              mt: 3
            }}
            variant="contained"
            startIcon={
              <VisibilityIcon />
            }
            onClick={() =>
              setOpen(true)
            }
          >
            Ver Perfil
          </Button>

        </Paper>

      )}


      {/* ==================================================
          PERFIL
      ================================================== */}

      <EquipamentoProfileDialog

        open={open}

        equipamento={
          profile?.equipamento
        }

        historico={
          profile?.historico ?? []
        }

        analytics={
          profile?.analytics
        }

        operacoes={
          profile?.operacoes ?? []
        }

        onClose={
          fecharPerfil
        }

      />

    </Box>

  )

}
