import React, { useMemo, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
const ResultArea = ({isResultShow, setIsResultShow, inputData}) => {
  const [playerMatchMap, setPlayerMatchMap] = useState(new Map())
  const result = useMemo(() => {
    const {round1Data, round2Data } = inputData
    let matches = [...round1Data, ...round2Data]
    const playerMatchMapTemp = new Map()
    // calculate the winner and score dif of each match
    matches = matches.map(match => {
      const player1 = match.players[0]
      const player2 = match.players[1]
      const scoreDiff = player1.score - player2.score
      player1.win = scoreDiff > 0 ? 1 : 0
      player2.win = scoreDiff < 0 ? 1 : 0
      player1.scoreDiff = scoreDiff
      player2.scoreDiff = -scoreDiff

      // save matched players
      if (playerMatchMapTemp.has(player1.name)) {
        playerMatchMapTemp.set(player1.name, playerMatchMapTemp.get(player1.name).add(player2.name))
      } else {
        playerMatchMapTemp.set(player1.name, new Set([player2.name]))
      }
      if (playerMatchMapTemp.has(player2.name)) {
        playerMatchMapTemp.set(player2.name, playerMatchMapTemp.get(player2.name).add(player1.name))
      } else {
        playerMatchMapTemp.set(player2.name, new Set([player1.name]))
      }
      setPlayerMatchMap(playerMatchMapTemp)
      return match
    })

    // merge player infos
    let matchPlayers = matches.map(match => match.players)
    const playerInfo = []
    for (const matchPlayer of matchPlayers) {
      playerInfo.push(...matchPlayer)
    }

    // create a playerInfoMap to store pPoint and sPoint of each player
    const playerInfoMap = new Map()
    for (const player of playerInfo) {
      playerInfoMap.set(player.name,
        {
          pPoint: playerInfoMap.has(player.name) ? (playerInfoMap.get(player.name).pPoint + player.win) : player.win,
          sPoint: playerInfoMap.has(player.name) ? (playerInfoMap.get(player.name).sPoint + player.scoreDiff) : player.scoreDiff,
        })
    }
    // return as a array
    return Array.from(playerInfoMap, ([name, value]) => ({ name, ...value }));
  },[inputData])

  const sortedResult = useMemo(() => {
    let rank = 1
    let sortedResult = result.sort((a, b) => {
      if (a.pPoint !== b.pPoint) {
        return b.pPoint - a.pPoint;
    }
    return b.sPoint - a.sPoint;
    })
    sortedResult = sortedResult.map(result => ({...result, rank: rank++}))
    return sortedResult
  }, [result])

  const pairResult = useMemo(() => {
    // 下一轮的配对结果
    const matchPairs = [];
    // 记录已经配对过的选手
    const pairedPlayers = new Set()
    for (let i = 0; i < sortedResult.length; i++) {
      if (!pairedPlayers.has(i)) {
        // 选择与当前选手排名差不超过10且未被配对过并为交手过的对手
        for (let j = i + 1; j < sortedResult.length; j++) {
          if (!pairedPlayers.has(j) &&
            Math.abs(sortedResult[i].rank - sortedResult[j].rank) <= 10 &&
            !playerMatchMap.get(sortedResult[i].name)?.has(sortedResult[j].name)
          ) {
            // 将配对信息添加到结果数组中
            matchPairs.push({ player1: sortedResult[i].name, player2: sortedResult[j].name })
            // 标记这两名选手已经被配对过
            pairedPlayers.add(i);
            pairedPlayers.add(j);
            // 找到合适的对手后跳出内层循环
            break;
          }
        }
      }
    }
    return matchPairs
  },[sortedResult, playerMatchMap])

  const columns: GridColDef[] = [
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'name', headerName: 'Player Name', width: 150 },
    { field: 'pPoint', headerName: 'Primary Points', width: 150, align: 'center' },
    { field: 'sPoint', headerName: 'Secondary Points', width: 150, align: 'center' },
  ];
  return(
    <Dialog
      // sx={{width: '500px'}}
      open={isResultShow}
      onClose={() => setIsResultShow(false)}
      maxWidth='md'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Result"}</DialogTitle>
      <DialogContent>
        <DataGrid
          rows={sortedResult}
          columns={columns}
          getRowId ={(row) => row.name}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
        <Typography variant="h6" sx={{ mt: '16px'}}>Next Round</Typography>
        {pairResult.map((info, index) => (
          <p key={index}>{info.player1} VS {info.player2}</p>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsResultShow(false)}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ResultArea