import React, { Fragment, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { nanoid } from 'nanoid';
import { Card, Grid, Paper, TextField, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function App() {
  const [round1Data, setRound1Data] = useState([] as any[])
  const [round2Data, setRound2Data] = useState([] as any[])
  const updateChange = (e: any, id: string, attr: string) => {
    const newData = [...round1Data]
    const index = newData.findIndex(part => part.id === id)
    newData[index][attr] = e.target.value
    setRound1Data(newData)
  }

  const deleteMatch = (e: any, id: string) => {
    const newData = [...round1Data]
    const index = newData.findIndex(part => part.id === id)
    newData.splice(index, 1)
    setRound1Data(newData)
  }
  return (
    <div className="App">
      <Paper variant="outlined" sx={{ my: 5, mx: 20, p: 3}}>
        <Grid container>
        <Grid item xs={12} sm={6} sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)'}}>
          <Typography variant="h6" gutterBottom>Round 1</Typography>
            {round1Data.map((match, index) => (
              <Card key={match.id}  sx={{ mr: '24px', mb: '24px', position: 'relative'}}>
              <CloseOutlinedIcon
                color="action"
                sx={{ cursor: 'pointer'}}
                style={{position: 'absolute', right: '24px', top: '18px'}}
                onClick={(e) => deleteMatch(e, match.id)}
              />
              <p style={{marginBottom: '10px', fontWeight: 'bold', fontSize: '18px'}}>MATCH {index + 1}</p>
              <div>
                <div style={{marginBottom: '16px'}}>
                  <div>Player1:</div>
                    <TextField
                      required
                      label="Player name"
                      variant="standard"
                      sx={{ mx: 2}}
                      onChange={(e) => updateChange(e, match.id, 'name')}
                    />
                    <TextField
                      required
                      label="Player score"
                      variant="standard"
                      type="number"
                      sx={{ mx: 2}}
                      onChange={(e) => updateChange(e, match.id, 'score')}
                    />
                    {/* {round1Data[index].name} */}
                </div>
                <div style={{marginBottom: '16px'}}>
                  <div>Player2:</div>
                    <TextField
                      required
                      label="Player name"
                      variant="standard"
                      sx={{ mx: 2}}
                      onChange={(e) => updateChange(e, match.id, 'name')}
                    />
                    <TextField
                      required
                      label="Player score"
                      variant="standard"
                      type="number"
                      sx={{ mx: 2}}
                      onChange={(e) => updateChange(e, match.id, 'score')}
                    />
                    {/* {round1Data[index].name} */}
                </div>
              </div>
              </Card>
            ))}
          <AddCircleRoundedIcon
            color="primary"
            sx={{ cursor: 'pointer'}}
            onClick={() => setRound1Data([...round1Data, {id: nanoid(), players:[]}])}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>Round 2</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
