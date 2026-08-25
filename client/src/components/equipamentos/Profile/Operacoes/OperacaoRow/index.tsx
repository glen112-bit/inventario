import {
    TableRow,
    TableCell,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material'

import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import PendingIcon from '@mui/icons-material/Pending'

type Props = {
    operacao: any
    onVisualizar: (id: number) => void
}

export default function OperacaoRow({

    operacao,
    onVisualizar

}: Props) {

    const corTipo = () => {

        switch (operacao.tipo) {

            case 'saida':
                return 'primary'

            case 'devolucao':
                return 'secondary'

            default:
                return 'default'

        }

    }

    const corStatus = () => {

        switch (operacao.status) {

            case 'finalizada':
                return 'success'

            case 'aberta':
                return 'warning'

            default:
                return 'default'

        }

    }

    return (

        <TableRow hover>

            <TableCell>

                #{operacao.id}

            </TableCell>

            <TableCell>

                <Chip

                    icon={

                        operacao.tipo === 'saida'

                            ? <LocalShippingIcon />

                            : <KeyboardReturnIcon />

                    }

                    label={operacao.tipo}

                    color={corTipo()}

                    size="small"

                />

            </TableCell>

            <TableCell>

                {operacao.cliente ?? '-'}

            </TableCell>

            <TableCell>

                {

                    operacao.data_operacao

                        ?

                        new Date(
                            operacao.data_operacao
                        ).toLocaleString()

                        :

                        '-'

                }

            </TableCell>

            <TableCell>

                <Chip

                    icon={
                        operacao.status === 'finalizada'

                            ? undefined

                            : <PendingIcon />
                    }

                    label={operacao.status}

                    color={corStatus()}

                    size="small"

                />

            </TableCell>

            <TableCell align="center">

                <Tooltip
                    title="Visualizar operação"
                >

                    <IconButton
                        color="primary"
                        onClick={() =>
                            onVisualizar(
                                operacao.id
                            )
                        }
                    >

                        <VisibilityIcon />

                    </IconButton>

                </Tooltip>

            </TableCell>

        </TableRow>

    )

}
