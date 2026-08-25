import {
    Avatar
} from '@mui/material'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import BuildIcon from '@mui/icons-material/Build'
import ErrorIcon from '@mui/icons-material/Error'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

type Props = {
    estado?: string
}

export default function TimelineIcon({
    estado
}: Props) {

    const getConfig = () => {

        switch (estado) {

            case 'cadastrado':
                return {
                    color: '#1976d2',
                    icon: <AddCircleIcon />
                }

            case 'disponivel':
                return {
                    color: '#2e7d32',
                    icon: <CheckCircleIcon />
                }

            case 'alugado':
                return {
                    color: '#1565c0',
                    icon: <LocalShippingIcon />
                }

            case 'devolvido':
                return {
                    color: '#00897b',
                    icon: <AutorenewIcon />
                }

            case 'manutencao':
                return {
                    color: '#ed6c02',
                    icon: <BuildIcon />
                }

            case 'danificado':
                return {
                    color: '#d32f2f',
                    icon: <ErrorIcon />
                }

            default:
                return {
                    color: '#757575',
                    icon: <HelpOutlineIcon />
                }

        }

    }

    const config = getConfig()

    return (

        <Avatar
            sx={{
                width: 46,
                height: 46,
                bgcolor: config.color,
                color: '#fff',
                boxShadow: 3
            }}
        >

            {config.icon}

        </Avatar>

    )

}
