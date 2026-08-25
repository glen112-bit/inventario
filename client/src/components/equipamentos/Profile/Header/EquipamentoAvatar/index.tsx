import {
    Avatar,
    Box,
    Typography
} from "@mui/material"

import Inventory2Icon from "@mui/icons-material/Inventory2"

type Props={
    equipamento:any
}

export default function EquipamentoAvatar({
    equipamento
}:Props){

    return(

        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1.5}
        >

            <Avatar
                variant="rounded"
                src={equipamento.foto}
                sx={{

                    width:88,
                    height:88,

                    bgcolor:"#fff",

                    color:"#1565c0",

                    border:"4px solid rgba(255,255,255,.18)",

                    boxShadow:"0 10px 30px rgba(0,0,0,.25)",

                    "& .MuiSvgIcon-root":{

                        fontSize:44

                    }

                }}
            >

                <Inventory2Icon/>

            </Avatar>

            <Typography
                variant="subtitle2"
                fontWeight={700}
                color="white"
                textAlign="center"
            >

                {equipamento.codigo_interno}

            </Typography>

        </Box>

    )

}
