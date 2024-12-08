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
function generate(element: React.ReactElement<unknown>) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const PlayerList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Jogadores
          </Typography>
          <PlayerList>
            <List dense={dense}>
              {generate(
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBoxIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Player name"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </PlayerList>
    </Box>
  );
}