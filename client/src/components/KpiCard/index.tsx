import { Card, CardContent, Typography, Box } from '@mui/material'

type Props = {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  onClick?: () => void
}

export default function KpiCard({
  title,
  value,
  icon,
  color = '#1976d2',
  onClick
}: Props) {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: '100%',
        height: 110,
        borderRadius: 2,
        background: '#111827',
        border: '1px solid rgba(255,255,255,.05)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all .25s ease',

        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: color,
          boxShadow: `0 10px 25px ${color}40`
      },

      '&:active': {
        transform: 'scale(.98)'
      }
      }}    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2
        }}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            fontWeight={700}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  )
}
