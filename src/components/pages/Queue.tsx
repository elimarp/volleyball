import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { getQueue } from '../../software/queue/queue';
import { Queue } from '../../software/types.index';
import { getAllPlayers } from '../../software/player/get-player';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { addTeamToCourt } from '../../software/court/court';

function generateQueue(playersQueue: Queue, setPlayersQueue: React.Dispatch<React.SetStateAction<Queue>>) {
  const allPlayers = getAllPlayers()
  return playersQueue.map((playerId, index) => {
    const player = allPlayers.find(item => item.id === playerId)!
    return React.cloneElement(<>
    { index === 6 ? <Divider textAlign='center'>☝️ próximo time</Divider> : ''}
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountBoxIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${player.name}   #${player.id.toString().padStart(2, '0')}`}
        secondary={`⏳ ${player.session.gamesWaiting} | 🏐 ${player.session.gamesPlayed}`}
      />
    </ListItem></>, {
      key: player.id,
    })
  });
}

const PlayerList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function QueueScreen() {
  const [playersQueue, setPlayersQueue] = React.useState<Queue>(getQueue())
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnterCourt = () => {
    handleClose()

    addTeamToCourt()
    setPlayersQueue(getQueue())
  };

  console.log(playersQueue);

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Fila &nbsp;
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Entrar em quadra
        </Button>
      </Typography>
      <Box sx={{ flexGrow: 1, maxWidth: 752, height: '75vh', overflowY: 'auto'} } >
        <PlayerList>
          <List dense={false}>
            {generateQueue(playersQueue, setPlayersQueue)}
          </List>
        </PlayerList>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Entrar em quadra?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
            Os 6 primeiros jogadores da fila entrarão em quadra.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEnterCourt} color="primary" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
