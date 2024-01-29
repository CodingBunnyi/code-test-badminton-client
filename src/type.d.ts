export interface InputAreaRef {
  getData: () => { round1Data: RoundData[]; round2Data: RoundData[] };
  clearAll: () => void;
}

export type RoundData = {
  id: string,
  players: {
    name: string,
    score: string | number,
  }[]
}

export type GetResultReq = {
  round1Data: RoundData[];
  round2Data: RoundData[];
}

export type GetResultRes = {
  pairResult: {
    player1: string,
    player2: string
  }[]

  sortedResult: {
    name: string
    pPoint: number
    sPoint: number
    rank: number
  }[]
}