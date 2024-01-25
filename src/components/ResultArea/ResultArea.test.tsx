import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultArea from './ResultArea';

// Example test data
const mockResultData = {
  sortedResult: [
    { rank: 1, name: 'Player1', pPoint: 10, sPoint: 5 },
  ],
  pairResult: [
    { player1: 'PlayerA', player2: 'PlayerB' },
  ],
};

describe('ResultArea Component', () => {
  test('initial result dialog is hidden', () => {
    render(<ResultArea isResultShow={false} setIsResultShow={() => {}} resultData={mockResultData} />);
    const resultArea = screen.queryByTestId('result-area');
    expect(resultArea).not.toBeInTheDocument();
  });

  test('result dialog is rendered', () => {
    render(<ResultArea isResultShow={true} setIsResultShow={() => {}} resultData={mockResultData} />);
    const resultArea = screen.queryByTestId('result-area');
    expect(resultArea).toBeInTheDocument();
  });

  test('should close dialog when OK button is clicked', async () => {
    const setIsResultShowMock = jest.fn();

    render(
      <ResultArea
        isResultShow={true}
        setIsResultShow={setIsResultShowMock}
        resultData={mockResultData}
      />
    );

    // Check if the dialog is open
    expect(screen.getByTestId('result-area')).toBeInTheDocument();

    // Click the OK button
    fireEvent.click(screen.getByTestId('ok-btn'));

    // Check if closeDialog function is called
    expect(setIsResultShowMock).toHaveBeenCalledWith(false);
  });
});