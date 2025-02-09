import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { addLocalStoragePlayer } from '../../utils/player';

export default function RegisterPlayerScreen() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Cadastrar Jogador
      </Typography>
      <TextField id="name" label="Nome" variant="outlined" style={{ margin: 10}}/>
      <TextField id="number" label="Número" variant="outlined" type='number' style={{ margin: 10}} />
      <Button variant="contained" size='large' style={{ margin: 10}} onClick={(event) => {
        addLocalStoragePlayer({
          name: 'Murilove',
          number: 10,
          isCheckedIn: false
        })
      }}>CADASTRAR</Button>
    </Box>
  )
}