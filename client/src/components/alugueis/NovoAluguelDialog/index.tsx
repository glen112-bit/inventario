import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel
} from '@mui/material'
import useAlugueis from '../../../hooks/useAlugueis'
import AluguelForm from '../AluguelForm'
import { useState } from 'react'

type Props = {
  open:boolean
  onClose:() => void
  clientes:any[]
  equipamentos:any[]
  onSalvar:(dados:any)=>void
}

export default function NovoAluguelDialog({
  open,
  onClose,
  clientes,
  equipamentos,
  onSalvar
}:Props){
  // console.log(equipamentos)
  const [form,setForm] = useState({
    cliente_id:'',
    equipamentos: [] as number[],
    fecha_salida:'',
    fecha_retorno:'',
    observacoes:''
  })
  const {
    alugueis
  } = useAlugueis()
  const limparFormulario = () => {

    setForm({
      cliente_id: '',
      fecha_salida: '',
      fecha_retorno: '',
      observacoes: '',
      equipamentos: []
    })

  }
  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Novo Aluguel
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

        <Button onClick={() => {
          limparFormulario()
          onClose()
        }}>
          Cancelar
        </Button>

        <Button
          variant="contained"
onClick={async () => {

  if (!form.cliente_id) {
    alert('Seleccione um cliente')
    return
  }

  if (!form.fecha_salida) {
    alert('Informe Data de Saída')
    return
  }

  if (form.equipamentos.length === 0) {
    alert('Seleccione um equipamento')
    return
  }

  await onSalvar(form)

  limparFormulario()

  onClose()

}}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
