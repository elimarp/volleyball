import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { getCourt } from '../../software/court/court';
import { getAllPlayers } from '../../software/player/get-player';
import * as React from 'react';
import { Court } from '../../software/types.index';
import { endGame } from '../../software/game/game';
import { balanceCourtTeams } from '../../software/court/balance-court-teams';

export default function CourtScreen() {
  const [open, setOpen] = React.useState(false);
  const [mergeTeamsOpen, setMergeTeamsOpen] = React.useState(false);
  const [switchPlayersOpen, setSwitchPlayersOpen] = React.useState(false);
  const [winningTeamTemp, setWinningTeamTemp] = React.useState<keyof Court['teams'] | null>(null);
  const [courtState, setCourtState] = React.useState(getCourt());
  const [replacingPlayerId, setReplacingPlayerId] = React.useState(0);

  const allPlayers = getAllPlayers()

  const handleDoubleClick = (playerId: number) => () => {
    setSwitchPlayersOpen(true)
  }
  
  const handleClickOpen = (winningTeam: keyof Court['teams']) => () => {
    setWinningTeamTemp(winningTeam);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleswitchPlayersClose = () => {
    setSwitchPlayersOpen(false);
  };

  const handleMergeTeamsClick = () => {
    setMergeTeamsOpen(true);
  };

  const handleMergeTeamsClose = () => {
    setMergeTeamsOpen(false);
  };
  const handleMergeTeams = () => {
    handleMergeTeamsClose();

    balanceCourtTeams()
    setCourtState(getCourt())
  };

  const handleEndGame = () => {
    handleClose()
    endGame(winningTeamTemp!)

    setWinningTeamTemp(null)
    setCourtState(getCourt())
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752, display: 'flex', flexDirection: 'column'}}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Time A &nbsp;
        <Button variant="outlined" color="primary" onClick={handleClickOpen('a')}>
          Venceu a partida
        </Button>
      </Typography>
      <ImageList cols={3} rowHeight={120}>
        {courtState.teams.a.map((playerId) => {
          const player = allPlayers.find(item => item.id === playerId)!
          return (<ImageListItem key={playerId} onDoubleClick={handleDoubleClick(playerId)} >
            <div style={{ width: 120, height: 120, backgroundColor: '#3366ff', marginLeft: 5, marginBottom: 5 }}>
              <p style={{ color: 'black', margin: 2, fontWeight: 'bold' }}>#{player.id} <span style={{ color: '#333', fontWeight: 'normal'}}>({player.rating})</span></p>
              <h3>{player.name}</h3>
            </div>
          </ImageListItem>)
        })}
      </ImageList>
      <Button variant="outlined" color="secondary" onClick={handleMergeTeamsClick}>
        ⚖️ Balancear Equipes
      </Button>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Time B &nbsp;
        <Button variant="outlined" color="error" onClick={handleClickOpen('b')}>
          Venceu a partida
        </Button>
      </Typography>
      <ImageList cols={3} rowHeight={120}>
        {courtState.teams.b.map((playerId) => {
          const player = allPlayers.find(item => item.id === playerId)!
          return (<ImageListItem  onDoubleClick={handleDoubleClick(playerId)} key={playerId}>
            <div style={{ width: 120, height: 120, backgroundColor: '#ff704d', marginLeft: 5, marginBottom: 5 }}>
              <p style={{ color: 'black', margin: 2, fontWeight: 'bold' }}>#{player.id} <span style={{ color: '#333', fontWeight: 'normal'}}>({player.rating})</span></p>
              <h3>{player.name}</h3>
            </div>
          </ImageListItem>)
        })}
      </ImageList>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Encerrar Partida"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
            <span style={{ color: winningTeamTemp === 'a' ? '#3366ff' : '#ff704d', fontWeight: 'bold' }}>Time {winningTeamTemp?.toUpperCase()}</span> venceu a partida?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEndGame} color="primary" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={mergeTeamsOpen}
        onClose={handleMergeTeamsClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Mesclar Equipes?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
            Deseja equilibrar as equipes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMergeTeamsClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleMergeTeams} color="primary" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={switchPlayersOpen}
        onClose={handleswitchPlayersClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Trocar Edmar por:"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description"> 
            Trocar Edmar por
          </DialogContentText> */}
          <TextField id="name" label="Nome" variant="outlined" style={{ margin: 10}} value={replacingPlayerId} onChange={(event) => setReplacingPlayerId(Number(event.target.value))}/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMergeTeamsClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleMergeTeams} color="primary" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}