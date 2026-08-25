import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../../services/api'

type Props = {
    children: React.ReactNode
}

export default function SetupGuard({
    children
}: Props) {

    const [loading, setLoading] = useState(true)
    const [setupRequired, setSetupRequired] =
        useState(false)

    useEffect(() => {

        const verificar = async () => {

            try {

                const { data } =
                    await api.get('/setup/status')

                setSetupRequired(
                    data.setupRequired
                )

            } catch (error) {

                console.error(
                    'Erro verificando setup:',
                    error
                )

            } finally {

                setLoading(false)

            }

        }

        verificar()

    }, [])

    if (loading) {
        return null
    }

    if (setupRequired) {

        return (
            <Navigate
                to="/registrar-admin"
                replace
            />
        )

    }

    return children
}
