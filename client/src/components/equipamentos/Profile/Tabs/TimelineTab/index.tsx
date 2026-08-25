import {
  Box,
  Typography
} from '@mui/material'

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab'

import TimelineHeader from '../../timeline/TimelineHeader'
import TimelineEvento from '../../timeline/TimelineEvento'

type Props={
  historico:any[]
}

export default function TimelineTab({
  historico
}:Props){

  return(

    <Box>

      <TimelineHeader
        historico={historico}
      />

      {

        historico?.length===0

          ?

            <Box
              py={8}
              textAlign="center"
            >

              <Typography
                variant="h6"
                color="text.secondary"
              >

                Nenhum evento encontrado.

              </Typography>

            </Box>

            :

            <Timeline
              position="right"
              sx={{
                p:0,
                m:0
              }}
            >

              {

                historico.map(evento=>(

                  <TimelineItem
                    key={evento.id}
                  >

                    <TimelineSeparator>

                      <TimelineDot
                        color="primary"
                      />

                      <TimelineConnector/>

                    </TimelineSeparator>

                    <TimelineContent>

                      <TimelineEvento
                        evento={evento}
                      />

                    </TimelineContent>

                  </TimelineItem>

                ))

              }

            </Timeline>

      }

    </Box>

  )

}
