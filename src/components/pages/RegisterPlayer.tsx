import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { createPlayer, getNextPlayerId } from '../../software/player/create-player';

export default function RegisterPlayerScreen() {
  const [playerName, setPlayerName] = React.useState("");
  const [playerNumber, setPlayerNumber] = React.useState(getNextPlayerId());
  const [playerCheckedIn, setPlayerCheckedIn] = React.useState(true);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Cadastrar Jogador
      </Typography>
      <TextField id="name" label="Nome" variant="outlined" style={{ margin: 10}} value={playerName} onChange={(event) => setPlayerName(event.target.value)}/>
      <TextField id="number" label="Número" variant="outlined" type='number' value={playerNumber} style={{ margin: 10}} /> {/** onChange={(event) => setPlayerNumber(Number(event.target.value))} */}
      <FormControlLabel style={{ margin: 10}} control={<Checkbox value={playerCheckedIn} onChange={(event) => setPlayerCheckedIn(event.target.checked)} />} label="CHECK IN?" />
      <Button variant="contained" size='large' style={{ margin: 10}} onClick={(event) => {
        console.log({ playerName, playerNumber, playerCheckedIn });
        
        const success = createPlayer({
          id: playerNumber,
          name: playerName,
          checkingIn: playerCheckedIn,
        })

        if(success) {
          setPlayerName('')
          setPlayerNumber(getNextPlayerId())
        }
      }}>CADASTRAR</Button>
    </Box>
  )
}