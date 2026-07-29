import { useState } from 'react'
import api from '../services/api'

export default function useRegistrarUsuario(){

  const [form,setForm] = useState({

    nome:'',
    telefone:'',
    password:'',
    rol:'operador'

  })

  const salvar = async()=>{

    try{

      await api.post('/usuarios',form)

      alert('Usuário cadastrado com sucesso!')

      setForm({

        nome:'',
        telefone:'',
        password:'',
        rol:'operador'

      })

    }catch(error){

      console.error(error)

      alert('Erro ao cadastrar usuário.')

    }

  }

  return{

    form,
    setForm,
    salvar

  }

}
