import React, { useImperativeHandle, useState } from 'react'
import './InputArea.css'

import { nanoid } from 'nanoid';
import { Grid, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { mockRound1Data } from '../../mockData'
import { mockRound2Data } from '../../mockData'
import { InputAreaRef, RoundData } from '../../type';
import MatchCard from './components/MatchCard';

type InputAreaProps = {
  // Define component props here
}
const InputArea: React.ForwardRefRenderFunction<InputAreaRef, InputAreaProps> = (_props, _ref) => {
  const [round1Data, setRound1Data] = useState<RoundData[]>(mockRound1Data)
  const [round2Data, setRound2Data] = useState<RoundData[]>(mockRound2Data)

  const updateRoundChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    attr: string,
    playerIndex: number,
    roundData: RoundData[],
    setRoundData: React.Dispatch<React.SetStateAction<RoundData[]>>
  ) => {
    const newData = [...roundData]
    const index = newData.findIndex(part => part.id === id)
    newData[index].players[playerIndex][attr] = e.target.value
    setRoundData(newData)
  }

  const deleteRoundMatch = (
    _e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string,
    roundData: RoundData[],
    setRoundData: React.Dispatch<React.SetStateAction<RoundData[]>>
  ) => {
    const newData = [...roundData]
    const index = newData.findIndex(part => part.id === id)
    newData.splice(index, 1)
    setRoundData(newData)
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
          <MatchCard
            roundName='round1'
            match={match}
            index={index}
            roundData={round1Data}
            setRoundData={setRound1Data}
            deleteRoundMatch={deleteRoundMatch}
            updateRoundChange={updateRoundChange}
          />
        ))}
      <AddCircleRoundedIcon
        data-testid="add-btn-1"
        color="primary"
        className="addBtn"
        onClick={() => 
          setRound1Data([
            ...round1Data,
            {
              id: nanoid(),
              players:[{name: '', score: ''}, {name: '', score: ''}]
            }
          ])
        }
      />
    </Grid>
    <Grid item xs={12} sm={6}>
    <Typography variant="h6" gutterBottom>Round 2</Typography>
        {round2Data.map((match, index) => (
          <MatchCard
            roundName='round2'
            match={match}
            index={index}
            roundData={round2Data}
            setRoundData={setRound2Data}
            deleteRoundMatch={deleteRoundMatch}
            updateRoundChange={updateRoundChange}
          />
        ))}
      <AddCircleRoundedIcon
        data-testid="add-btn-2"
        color="primary"
        className="addBtn"
        onClick={() => 
          setRound2Data([
            ...round2Data,
            {
              id: nanoid(), players:[{name: '', score: ''}, {name: '', score: ''}]
            }
          ])
        }
      />
    </Grid>
  </Grid>
  )
}

export default React.forwardRef(InputArea)