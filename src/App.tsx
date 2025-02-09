import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from "react";
import "./App.css";
import GroupsIcon from '@mui/icons-material/Groups';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import Paper from '@mui/material/Paper';
import PlayersScreen from './components/pages/Players';
import QueueScreen from './components/pages/Queue';
import RegisterPlayerScreen from './components/pages/RegisterPlayer';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PlayingScreen from './components/pages/PlayingScreen';

type Page = 'players' | 'queue' | 'register-player' | 'playing'

const App: React.FC = () => {
  // const ref = React.useRef<HTMLDivElement>(null);
  // const [value, setValue] = React.useState('recents');
  const ref = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState<Page>('players');

  return (
    <div className="App" style={{ width: "100vw" , height: "100vh", position: 'fixed' }} ref={ref}>
      {page === 'players' && <PlayersScreen/>}
      {page === 'queue' && <QueueScreen/>}
      {page === 'register-player' && <RegisterPlayerScreen/>}
      {page === 'playing' && <PlayingScreen/>}
      <Paper sx={{ position: 'fixed', bottom: 75, width: '100vw' }} elevation={3}>
        <BottomNavigation
          showLabels
          value={page}
          onChange={(_event, newValue) => {
            console.log({ newValue });
            
            setPage(newValue);
          }}
        >
          <BottomNavigationAction label="Jogadores" icon={<GroupsIcon />} value={'players'} />
          <BottomNavigationAction label="Fila" icon={<PeopleIcon />}  value={'queue'} />
          <BottomNavigationAction label="Jogando" icon={<SportsVolleyballIcon />}  value={'playing'} />
          <BottomNavigationAction label="Cadastrar" icon={<PersonAddAlt1Icon />}  value={'register-player'} />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default App;
