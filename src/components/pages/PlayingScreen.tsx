import { ImageList, ImageListItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function PlayingScreen() {
  const teamA = [1, 3, 5, 7, 9, 11]
  const teamB = [2, 4, 6, 8, 10, 12]
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Time A
      </Typography>
      <ImageList cols={3} rowHeight={100}>
        {teamA.map((item) => (
          <ImageListItem key={item}>
            <div style={{ width: 100, height: 100, backgroundColor: '#3366ff', marginLeft: 5, marginBottom: 5 }}>
              <h3>{item}</h3>
              <h6>Player Name</h6>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Time B
      </Typography>
      <ImageList cols={3} rowHeight={100}>
        {teamB.map((item) => (
          <ImageListItem key={item}>
            <div style={{ width: 100, height: 100, backgroundColor: '#ff704d', marginLeft: 5, marginBottom: 5  }}>
              <h3>{item}</h3>
              <h6>Player Name</h6>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}