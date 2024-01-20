import './App.css';
import { Button, Paper } from '@mui/material';
import InputArea from './components/InputArea/InputArea'
import ResultArea from './components/ResultArea/ResultArea'
import { useRef, useState } from 'react';

function App() {
  const inputStateRef: any = useRef()
  const [isResultShow, setIsResultShow] = useState(false)
  const [inputData, setInputData] = useState({round1Data: [], round2Data: []})

  const getInputData = () => {
    setInputData(inputStateRef.current?.getData())
    setIsResultShow(true)
  }
  return (
    <div className="App">
      <Paper variant="outlined" sx={{ my: 5, mx: [5, 10, 20], p: 3}}>
        <InputArea ref={inputStateRef}/>
      </Paper>
      <ResultArea isResultShow={isResultShow} setIsResultShow={setIsResultShow} inputData={inputData}/>
      <Button variant="contained" sx={{ mb: '16px' }}onClick={getInputData}>Show Result</Button>
    </div>
  );
}

export default App;
