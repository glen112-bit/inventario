import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material'

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
}

export default function SettingsCard({
  title,
  description,
  icon,
  onClick
}: Props) {

  return (

    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        height: 180,
        borderRadius: 4,
        background: '#111827',
        border: '1px solid rgba(255,255,255,.08)',
        transition: '.25s',
        display: 'flex',
        alignItems: 'center',

        '&:hover': {
          transform: 'translateY(-6px)',
          borderColor: '#1976d2',
          boxShadow: '0 12px 24px rgba(0,0,0,.35)'
        }
      }}
    >

      <CardContent
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 2
        }}
      >

        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="h6"
          fontWeight={700}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>

      </CardContent>

    </Card>

  )

}
