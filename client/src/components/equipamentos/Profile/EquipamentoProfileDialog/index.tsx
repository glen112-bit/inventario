import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Button,
  Box,
  Paper
} from '@mui/material'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import TimelineIcon from '@mui/icons-material/Timeline'
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'

import EquipamentoHeader from '../Header/EquipamentoHeader'

import InformacoesTab from '../tabs/InformacoesTab'
import TimelineTab from '../tabs/TimelineTab'
import AnalyticsTab from '../tabs/AnalyticsTab'
import OperacoesTab from '../tabs/OperacoesTab'

type Props = {
  open: boolean
  equipamento: any
  historico: any[]
  analytics: any
  operacoes: any[]
  onClose: () => void
}

export default function EquipamentoProfileDialog({
  open,
  equipamento,
  historico,
  analytics,
  operacoes,
  onClose
}: Props) {

  const [tab, setTab] = useState(0)

  /*
  ==========================================================
  RESET DA ABA AO ABRIR UM NOVO PERFIL
  ==========================================================
  */

  useEffect(() => {

    if (open) {
      setTab(0)
    }

  }, [open, equipamento?.equipamento_id])


  /*
  ==========================================================
  NÃO RENDERIZAR SE NÃO EXISTIR EQUIPAMENTO
  ==========================================================
  */

  if (!equipamento) {
    return null
  }


  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      scroll="paper"

      PaperProps={{
        sx: {
          width: '100%',
          height: '95vh',
          maxHeight: '95vh',

          borderRadius: 3,

          overflow: 'hidden',

          display: 'flex',
          flexDirection: 'column',

          backgroundColor: '#F4F7FB'
        }
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <EquipamentoHeader
        equipamento={equipamento}
        analytics={analytics}
        onClose={onClose}
      />


      {/* =====================================================
          ÁREA PRINCIPAL
      ===================================================== */}

      <Box
        sx={{
          flex: 1,

          minHeight: 0,

          display: 'flex',
          flexDirection: 'column',

          overflow: 'hidden',

          backgroundColor: '#F4F7FB'
        }}
      >


        {/* ===================================================
            TABS
        =================================================== */}

        <Box
          sx={{
            flexShrink: 0,

            borderBottom: '1px solid #E5E7EB',

            backgroundColor: '#FFFFFF',

            px: 2
          }}
        >

          <Tabs
            value={tab}

            onChange={(_, value) => {
              setTab(value)
            }}

            variant="fullWidth"

            textColor="primary"

            indicatorColor="primary"

            sx={{
              minHeight: 58,

              '& .MuiTab-root': {
                minHeight: 58,

                fontWeight: 600,

                textTransform: 'none'
              }
            }}
          >

            <Tab
              icon={
                <InfoOutlinedIcon fontSize="small" />
              }
              iconPosition="start"
              label="Informações"
            />


            <Tab
              icon={
                <TimelineIcon fontSize="small" />
              }
              iconPosition="start"
              label="Timeline"
            />


            <Tab
              icon={
                <AnalyticsOutlinedIcon fontSize="small" />
              }
              iconPosition="start"
              label="Analytics"
            />


            <Tab
              icon={
                <Inventory2OutlinedIcon fontSize="small" />
              }
              iconPosition="start"
              label="Operações"
            />

          </Tabs>

        </Box>


        {/* ===================================================
            CONTEÚDO COM SCROLL
        =================================================== */}

        <DialogContent
          sx={{
            flex: 1,

            minHeight: 0,

            overflow: 'auto',

            p: 3,

            backgroundColor: '#F4F7FB',

            '&.MuiDialogContent-root': {
              borderTop: 'none'
            }
          }}
        >

          <Paper
            elevation={0}

            sx={{
              width: '100%',

              minHeight: '100%',

              borderRadius: 3,

              border: '1px solid #E5E7EB',

              backgroundColor: '#FFFFFF',

              p: 3
            }}
          >

            {/* =================================================
                INFORMAÇÕES
            ================================================= */}

            {tab === 0 && (

              <Box>

                <InformacoesTab
                  equipamento={equipamento}
                />

              </Box>

            )}


            {/* =================================================
                TIMELINE
            ================================================= */}

            {tab === 1 && (

              <Box>

                <TimelineTab
                  historico={historico}
                />

              </Box>

            )}


            {/* =================================================
                ANALYTICS
            ================================================= */}

            {tab === 2 && (

              <Box>

                <AnalyticsTab
                  equipamento={equipamento}
                  analytics={analytics}
                />

              </Box>

            )}


            {/* =================================================
                OPERAÇÕES
            ================================================= */}

            {tab === 3 && (

              <Box>

                <OperacoesTab
                  operacoes={operacoes}
                />

              </Box>

            )}

          </Paper>

        </DialogContent>

      </Box>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <DialogActions
        sx={{
          flexShrink: 0,

          borderTop: '1px solid #E5E7EB',

          backgroundColor: '#FFFFFF',

          px: 3,

          py: 2
        }}
      >

        <Button
          variant="outlined"

          startIcon={
            <PrintOutlinedIcon />
          }

          onClick={() => {
            window.print()
          }}
        >
          Imprimir
        </Button>


        <Box
          sx={{
            flex: 1
          }}
        />


        <Button
          variant="contained"

          size="large"

          onClick={onClose}
        >
          Fechar
        </Button>

      </DialogActions>

    </Dialog>

  )
}
