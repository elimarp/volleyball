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
import { getLocalStoragePlayers, setLocalStoragePlayers } from '../../utils/player';

interface Player {
  name: string
  number: number,
  isCheckedIn: boolean
}

function generatePlayerList(players: Player[], setPlayers: React.Dispatch<React.SetStateAction<Player[]>>) {
  return players.map((player, index) =>
    React.cloneElement(<ListItem
      secondaryAction={
        <IconButton onClick={(props) => {
          // toggle check in
          console.log('#', player.number);
          players[index].isCheckedIn = !player.isCheckedIn
          setPlayers([...players]);
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
        secondary={'# ' + player.number.toString().padStart(2, '0')}
      />
    </ListItem>, {
      key: player.number,
    }),
  );
}

const PlayerList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function PlayersScreen() {
  const [players, setPlayers] = React.useState<Player[]>(getLocalStoragePlayers())

  React.useEffect(() => {
    setLocalStoragePlayers(players)    
  }, [players])

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Jogadores
      </Typography>
      <Box sx={{ flexGrow: 1, maxWidth: 752, height: '75vh', overflowY: 'auto'} } >
            <PlayerList>
              <List dense={false}>
                {generatePlayerList(players, setPlayers)}
              </List>
            </PlayerList>
      </Box>
    </div>
  );
}

// TODO: add player button