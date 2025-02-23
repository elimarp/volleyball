import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Player } from '../../software/types.index';
import { getAllPlayers, setAllPlayers } from '../../software/player/get-player';
import { addPlayerToQueue, removePlayerFromQueue } from '../../software/queue/queue';
import { Button } from '@mui/material';

function generatePlayerList(players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>) {
  return players.map((player, index) =>
    React.cloneElement(<ListItem
      secondaryAction={
        <IconButton onClick={(props) => {
          // toggle check in
          console.log('#', player.id);
          players[index].isCheckedIn = !player.isCheckedIn
          setPlayers([...players]);
          if(players[index].isCheckedIn)  {
            addPlayerToQueue(players[index].id)
          } else {
            removePlayerFromQueue(players[index].id)
          }
        }}>
          <CheckCircleIcon color={player.isCheckedIn ? 'success' : 'disabled'} />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <AccountBoxIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={player.name}
        secondary={`# ${player.id.toString().padStart(2, '0')} | ⚡ ${player.rating} | 🏆 ${player.session.gamesWon} | ❌ ${player.session.gamesLost}`}
      />
    </ListItem>, {
      key: player.id,
    }),
  );
}

const PlayerList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function PlayersScreen() {
  const [players, setPlayers] = React.useState<Player[]>(getAllPlayers())

  const handleExport = () => {
    const players = getAllPlayers()
    window.open(encodeURI(`https://wa.me/5511914169534?text=${JSON.stringify(players)}`), "_blank")
  }

  React.useEffect(() => {
    setAllPlayers(players)
    console.log(getAllPlayers());
    
  }, [players])

  return (
    <div style={{ paddingBottom: 50 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Jogadores
      </Typography>
      <Box sx={{ flexGrow: 1, maxWidth: 752, height: '75vh', overflowY: 'auto'} } >
        <PlayerList>
          <List dense={false}>
            {generatePlayerList(players, setPlayers)}
          </List>
        </PlayerList>
        <Button variant="outlined" color="secondary" onClick={handleExport} style={{ margin: 20 }}>
          Exportar relatório
        </Button>
      </Box>
      
    </div>
  );
}