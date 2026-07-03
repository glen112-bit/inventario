import { useState } from 'react'

const initialState = {
  nome: '',
  email: '',
  telefone: '',
  password: '',
  confirmarSenha: '',
  senhaAtual: '',
  rol: 'operador',
  activo: true
}

export default function useUsuarioForm() {

  const [form, setForm] = useState(initialState)

  const resetForm = () => {
    setForm(initialState)
  }

  const updateField = (field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validate = (editando: boolean) => {

    const errors: string[] = []

    if (!editando) {

      if (!form.nome)
        errors.push('Informe Nome')

      if (!form.email)
        errors.push('Informe E-mail')

      if (!form.password)
        errors.push('Informe a senha')

      if (!form.confirmarSenha)
        errors.push('Confirme a senha')

      if (form.password !== form.confirmarSenha)
        errors.push('As senhas não coincidem')

    } else {

      if (!form.senhaAtual)
        errors.push('Informe a senha atual')

      if (
        form.password &&
        form.password !== form.confirmarSenha
      ) {
        errors.push('As senhas não coincidem')
      }

    }

    return {
      valid: errors.length === 0,
      errors
    }

  }

  const buildPayload = () => ({ ...form })

  return {
    form,
    setForm,
    resetForm,
    updateField,
    validate,
    buildPayload
  }

}
