import { Card, CardContent, Typography, Box } from '@mui/material'

export default function KpiCard({
  title,
  value,
  icon,
  color = '#1976d2'
}) {

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 4,
        background: '#111827',
        border: '1px solid rgba(255,255,255,.05)',
        transition: '.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: color
        }
      }}
    >
      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              mt={1}
            >
              {value}
            </Typography>

          </Box>

          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              background: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color
            }}
          >
            {icon}
          </Box>

        </Box>

      </CardContent>

    </Card>
  )
}
