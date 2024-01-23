import './App.css';
import { Button, Paper } from '@mui/material';
import InputArea from './components/InputArea/InputArea'
import ResultArea from './components/ResultArea/ResultArea'
import { useRef, useState } from 'react';
import { calculateResult } from './apis'

function App() {
  const inputStateRef: any = useRef()
  const [isResultShow, setIsResultShow] = useState(false)
  const [resultData, setResultData] = useState({sortedResult: [], pairResult: []})

  const getResult = async() => {
    const { data } = await calculateResult(inputStateRef.current?.getData())
    setResultData(data)
    setIsResultShow(true)
  }
  return (
    <div className="App">
      <Paper variant="outlined" sx={{ my: 5, mx: [5, 10, 20], p: 3}}>
        <InputArea ref={ inputStateRef }/>
      </Paper>
      <ResultArea isResultShow={isResultShow} setIsResultShow={ setIsResultShow } resultData={resultData}/>
      <Button variant="contained" sx={{ mb: '16px' }} onClick={ getResult }>Show Result</Button>
    </div>
  );
}

export default App;
