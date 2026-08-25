import {
    Box,
    Typography,
    Chip
} from '@mui/material'

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import BuildRoundedIcon from '@mui/icons-material/BuildRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'

type Props={
    estado:string
    ultimaAtualizacao?:string
}

export default function EquipamentoStatus({
    estado,
    ultimaAtualizacao
}:Props){

    const status=getStatus(estado)

    return(

        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                bgcolor:"rgba(255,255,255,.08)",
                backdropFilter:"blur(10px)",
                border:"1px solid rgba(255,255,255,.12)",
                borderRadius:2,
                px:2,
                py:1,
                minHeight:190
            }}
        >

            <Box
                sx={{
                    width:72,
                    height:62,
                    borderRadius:"50%",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    bgcolor:status.background,
                    color:"#fff",
                    mb:2
                }}
            >
                {status.icon}
            </Box>

            <Chip
                label={status.titulo}
                sx={{
                    bgcolor:status.background,
                    color:"#fff",
                    fontWeight:700,
                    mb:1
                }}
            />

            <Typography
                variant="subtitle1"
                fontWeight={700}
                color="white"
            >
                {status.descricao}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    mt:1,
                    opacity:.8,
                    textAlign:"center",
                    color:"rgba(255,255,255,.8)"
                }}
            >
                {status.detalhe}
            </Typography>

            {ultimaAtualizacao && (

                <Typography
                    variant="caption"
                    sx={{
                        mt:3,
                        color:"rgba(255,255,255,.65)"
                    }}
                >
                    Atualizado<br/>
                    {new Date(
                        ultimaAtualizacao
                    ).toLocaleString()}
                </Typography>

            )}

        </Box>

    )

}

function getStatus(estado:string){

    switch(estado){

        case "disponivel":

            return{
                titulo:"DISPONÍVEL",
                descricao:"Pronto para uso",
                detalhe:"Equipamento liberado para aluguel",
                background:"#16a34a",
                icon:<CheckCircleRoundedIcon sx={{fontSize:42}}/>
            }

        case "alugado":

            return{
                titulo:"ALUGADO",
                descricao:"Em operação",
                detalhe:"Equipamento está com cliente",
                background:"#2563eb",
                icon:<LocalShippingRoundedIcon sx={{fontSize:42}}/>
            }

        case "manutencao":

            return{
                titulo:"MANUTENÇÃO",
                descricao:"Fora de operação",
                detalhe:"Em manutenção técnica",
                background:"#ea580c",
                icon:<BuildRoundedIcon sx={{fontSize:42}}/>
            }

        case "danificado":

            return{
                titulo:"DANIFICADO",
                descricao:"Necessita reparo",
                detalhe:"Aguardando avaliação",
                background:"#dc2626",
                icon:<ErrorRoundedIcon sx={{fontSize:42}}/>
            }

        default:

            return{
                titulo:"DESCONHECIDO",
                descricao:"Sem informações",
                detalhe:"Estado não informado",
                background:"#64748b",
                icon:<HelpOutlineRoundedIcon sx={{fontSize:42}}/>
            }

    }

}
