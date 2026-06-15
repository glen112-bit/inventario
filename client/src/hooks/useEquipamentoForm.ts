import { useState } from 'react'

const initialState = {
  categoria_id:'',
  marca_id:'',
  ubicacion_id:'',
  estado_actual:'disponivel',
  modelo:'',
  numero_serie:'',
  descripcion:'',
  valor:'',
  fecha_compra:''
}

export default function useEquipamentoForm() {

  const [form,setForm] =
    useState(initialState)

  const resetForm = () => {

    setForm(initialState)

  }

  const updateField = (
    field:string,
    value:any
  ) => {

    setForm(prev => ({
      ...prev,
      [field]:value
    }))

  }

  const validate = () => {

    const errors:string[] = []

    if(!form.categoria_id)
      errors.push(
        'Selecione uma categoria'
      )

    if(!form.modelo)
      errors.push(
        'Informe o modelo'
      )

    return {
      valid:
        errors.length === 0,
      errors
    }

  }

  const buildPayload = () => {

    return {
      ...form,
      valor:
        form.valor
          ? Number(form.valor)
          : null
    }

  }

  return {
    form,
    setForm,
    resetForm,
    updateField,
    validate,
    buildPayload
  }

}
