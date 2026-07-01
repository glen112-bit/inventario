import { useState } from 'react'

const initialState = {
    nome: '',
    email: '',
    telefone: '',
    password: '',
    rol: 'operador',
    ativo: true
}

export default function useUsuarioForm() {

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

    if(!form.nome)
      errors.push(
        'Informe Nome'
      )

    if(!form.email)
      errors.push(
        'Informe E-mail'
      )

    if(!form.senha)
      errors.push(
        'Informe a Senha'
      )

    return {
      valid:
        errors.length === 0,
      errors
    }

  }

  const buildPayload = () => ({...form})


  return {
    form,
    setForm,
    resetForm,
    updateField,
    validate,
    buildPayload
  }

}
