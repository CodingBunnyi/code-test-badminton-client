import React, { useImperativeHandle, useState } from 'react'
import './InputArea.css'

import { nanoid } from 'nanoid';
import { Card, Grid, TextField, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { mockRound1Data } from '../../mockData'
import { mockRound2Data } from '../../mockData'
import { InputAreaRef, RoundData } from '../../type';

interface InputAreaProps {
  // Define component props here
}
const InputArea: React.ForwardRefRenderFunction<InputAreaRef, InputAreaProps> = (_props, _ref) => {
  const [round1Data, setRound1Data] = useState<RoundData>(mockRound1Data)
  const [round2Data, setRound2Data] = useState<RoundData>(mockRound2Data)
  const updateRound1Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string, attr: string, playerIndex: number) => {
    const newData = [...round1Data]
    const index = newData.findIndex(part => part.id === id)
    newData[index].players[playerIndex][attr] = e.target.value
    setRound1Data(newData)
  }

  const deleteRound1Match = (_e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    const newData = [...round1Data]
    const index = newData.findIndex(part => part.id === id)
    newData.splice(index, 1)
    setRound1Data(newData)
  }

  const updateRound2Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string, attr: string, playerIndex: number) => {
    const newData = [...round2Data]
    const index = newData.findIndex(part => part.id === id)
    newData[index].players[playerIndex][attr] = e.target.value
    setRound2Data(newData)
  }

  const deleteRound2Match = (_e: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string) => {
    const newData = [...round2Data]
    const index = newData.findIndex(part => part.id === id)
    newData.splice(index, 1)
    setRound2Data(newData)
  }


  useImperativeHandle(_ref, () => ({
    getData:() => {
      return {round1Data, round2Data}
    },
    clearAll: () => {
      setRound1Data([])
      setRound2Data([])
    }
  }))

  return (
  <Grid container>
    <Grid item xs={12} sm={6} className="LeftGrid">
      <Typography variant="h6" gutterBottom>Round 1</Typography>
        {round1Data.map((match, index) => (
          <Card key={match.id}  className="matchCardLeft">
            <CloseOutlinedIcon
              data-testid="delete-btn-1"
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
                    data-testid={index + '_p1_round1_text_field_name'}
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
                    data-testid={index + '_p1_round1_text_field_score'}
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
                    data-testid={index + '_p2_round1_text_field_name'}
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
                    data-testid={index + '_p2_round1_text_field_score'}
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
        data-testid="add-btn-1"
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
              data-testid="delete-btn-2"
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
                    data-testid={index + '_p1_round2_text_field_name'}
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
                    data-testid={index + '_p1_round2_text_field_score'}
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
                    data-testid={index + '_p2_round2_text_field_name'}
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
                    data-testid={index + '_p2_round2_text_field_score'}
                    onChange={(e) => updateRound2Change(e, match.id, 'score', 1)}
                    defaultValue={match.players[1].score}
                    size="small"
                  />
              </div>
            </div>
          </Card>
        ))}
      <AddCircleRoundedIcon
        data-testid="add-btn-2"
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