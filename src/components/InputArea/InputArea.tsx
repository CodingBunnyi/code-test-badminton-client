import React, { useImperativeHandle, useState } from 'react'
import './InputArea.css'

import { nanoid } from 'nanoid';
import { Card, Grid, TextField, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { mockRound1Data } from '../../mockData'
import { mockRound2Data } from '../../mockData'
const InputArea = (props: any, _ref: any) => {
  const [round1Data, setRound1Data] = useState(mockRound1Data as any[])
  const [round2Data, setRound2Data] = useState(mockRound2Data as any[])
  const updateRound1Change = (e: any, id: string, attr: string, playerIndex: number) => {
    const newData = [...round1Data]
    const index = newData.findIndex(part => part.id === id)
    newData[index].players[playerIndex][attr] = e.target.value
    setRound1Data(newData)
  }

  const deleteRound1Match = (e: any, id: string) => {
    const newData = [...round1Data]
    const index = newData.findIndex(part => part.id === id)
    newData.splice(index, 1)
    setRound1Data(newData)
  }

  const updateRound2Change = (e: any, id: string, attr: string, playerIndex: number) => {
    const newData = [...round2Data]
    const index = newData.findIndex(part => part.id === id)
    newData[index].players[playerIndex][attr] = e.target.value
    setRound2Data(newData)
  }

  const deleteRound2Match = (e: any, id: string) => {
    const newData = [...round2Data]
    const index = newData.findIndex(part => part.id === id)
    newData.splice(index, 1)
    setRound2Data(newData)
  }

  useImperativeHandle(_ref, () => ({
    getData:() => {
      return {round1Data, round2Data}
    }
  }))
  return (
  <Grid container>
    <Grid item xs={12} sm={6} className="LeftGrid">
      <Typography variant="h6" gutterBottom>Round 1</Typography>
        {round1Data.map((match, index) => (
          <Card key={match.id}  className="matchCardLeft">
            <CloseOutlinedIcon
              color="action"
              className="closeIcon"
              onClick={(e) => deleteRound1Match(e, match.id)}
            />
            <p className='matchTitle'>MATCH {index + 1}</p>
            <div>
              <div className="playerDiv">
                <div>Player1:</div>
                  <TextField
                    required
                    label="Player name"
                    variant="standard"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound1Change(e, match.id, 'name', 0)}
                    defaultValue={match.players[0].name}
                    size="small"
                  />
                  <TextField
                    required
                    label="Player score"
                    variant="standard"
                    type="number"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound1Change(e, match.id, 'score', 0)}
                    defaultValue={match.players[0].score}
                    size="small"
                  />
              </div>
              <div className="playerDiv">
                <div>Player2:</div>
                  <TextField
                    required
                    label="Player name"
                    variant="standard"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound1Change(e, match.id, 'name', 1)}
                    defaultValue={match.players[1].name}
                    size="small"
                  />
                  <TextField
                    required
                    label="Player score"
                    variant="standard"
                    type="number"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound1Change(e, match.id, 'score', 1)}
                    defaultValue={match.players[1].score}
                    size="small"
                  />
              </div>
            </div>
          </Card>
        ))}
      <AddCircleRoundedIcon
        color="primary"
        className="addBtn"
        onClick={() => 
          setRound1Data([...round1Data, {id: nanoid(), players:[{name: '', score: 0}, {name: '', score: 0}]}])
        }
      />
    </Grid>
    <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom>Round 2</Typography>
        {round2Data.map((match, index) => (
          <Card key={match.id}  className="matchCardRight">
            <CloseOutlinedIcon
              color="action"
              className="closeIcon"
              onClick={(e) => deleteRound2Match(e, match.id)}
            />
            <p className="matchTitle">MATCH {index + 1}</p>
            <div>
              <div className="playerDiv">
                <div>Player1:</div>
                  <TextField
                    required
                    label="Player name"
                    variant="standard"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound2Change(e, match.id, 'name', 0)}
                    defaultValue={match.players[0].name}
                    size="small"
                  />
                  <TextField
                    required
                    label="Player score"
                    variant="standard"
                    type="number"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound2Change(e, match.id, 'score', 0)}
                    defaultValue={match.players[0].score}
                    size="small"
                  />

              </div>
              <div className="playerDiv">
                <div>Player2:</div>
                  <TextField
                    required
                    label="Player name"
                    variant="standard"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound2Change(e, match.id, 'name', 1)}
                    defaultValue={match.players[1].name}
                    size="small"
                  />
                  <TextField
                    required
                    label="Player score"
                    variant="standard"
                    type="number"
                    sx={{ mx: 2, mt: '5px'}}
                    onChange={(e) => updateRound2Change(e, match.id, 'score', 1)}
                    defaultValue={match.players[1].score}
                    size="small"
                  />
              </div>
            </div>
          </Card>
        ))}
      <AddCircleRoundedIcon
        color="primary"
        className="addBtn"
        onClick={() => 
          setRound2Data([...round2Data, {id: nanoid(), players:[{name: '', score: ''}, {name: '', score: ''}]}])
        }
      />
    </Grid>
  </Grid>
  )
}

export default React.forwardRef(InputArea)