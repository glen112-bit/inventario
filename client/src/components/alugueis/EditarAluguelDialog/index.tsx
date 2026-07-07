import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Paper
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AluguelForm from '../AluguelForm'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  aluguel: any
  clientes: any[]
  equipamentos: any[]
  onSalvar: (dados:any) => void
}

export default function EditarAluguelDialog({
  open,
  onClose,
  aluguel,
  clientes,
  equipamentos,
  onSalvar
}: Props) {

  const [form, setForm] = useState({
    cliente_id: '',
    fecha_salida: '',
    fecha_retorno: '',
    observacoes: '',
    equipamentos: [] as number[]
  })

  useEffect(() => {

    if (!aluguel) return

      setForm({
        cliente_id: aluguel.cliente_id || '',
        fecha_salida: aluguel.fecha_salida?.substring(0,10) || '',
        fecha_retorno: aluguel.fecha_retorno?.substring(0,10) || '',
        observacoes: aluguel.observacoes || '',
        equipamentos:
          aluguel.equipamentos?.map(
            (e:any) => e.equipamento_id
        ) || []
      })

  }, [aluguel])

  const equipamentosSelecionados = equipamentos.filter(
    eq => form.equipamentos.includes(
      eq.equipamento_id
    )
  )

  if (!aluguel) return null
    const removerEquipamento = (
      equipamentoId:number
    ) => {

      setForm(prev => ({
        ...prev,
        equipamentos: prev.equipamentos.filter(
          id => id !== equipamentoId
        )
      }))

    }
    return (

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
      >

        <DialogTitle>
          Editar Aluguel #{aluguel.id}
        </DialogTitle>

<DialogContent>

  <AluguelForm
    form={form}
    setForm={setForm}
    clientes={clientes}
    equipamentos={equipamentos}
  />

</DialogContent>

        <DialogActions>

          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() =>{
              const dados = {
                id: aluguel.id,
                ...form
              }
              onSalvar(dados)
              onClose()
            }
            }
          >
            Salvar
          </Button>

        </DialogActions>

      </Dialog>

    )
}
