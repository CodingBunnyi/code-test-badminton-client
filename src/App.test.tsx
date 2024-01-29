import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { calculateResult } from './apis'

jest.mock('./apis', () => ({
  calculateResult: jest.fn(),
}));

describe('App component', () => {
  beforeEach(() => {
    // Mock the API function before each test
    (calculateResult as jest.Mock).mockResolvedValue({ data: { sortedResult: [], pairResult: [] } });
  });

  test('renders App component', () => {
    render(<App />);

    // Check if round titles are rendered
    const el1 = screen.getByText(/Round 1/i);
    expect(el1).toBeInTheDocument();
    const el2 = screen.getByText(/Round 2/i);
    expect(el2).toBeInTheDocument();

    // Check if the "Show Result" button is rendered
    const showResultButton = screen.getByText(/Show Result/i);
    expect(showResultButton).toBeInTheDocument();

    // Check if the "Cleat All" button is rendered
    const showClearButton = screen.getByText(/Clear All/i);
    expect(showClearButton).toBeInTheDocument();

    // Check if the result area is initially hidden
    const resultArea = screen.queryByTestId('result-area');
    expect(resultArea).not.toBeInTheDocument();
  });

  test('click clear all button to clear the default data', () => {
    render(<App />);
    const initialMatches = screen.queryAllByText(/MATCH/i)[0];
    expect(initialMatches).toBeInTheDocument();

    const showClearButton = screen.getByText(/Clear All/i);
    fireEvent.click(showClearButton)

    const updatedMatches = screen.queryByText(/MATCH/i);
    expect(updatedMatches).not.toBeInTheDocument();
  })

  test('clicking "Show Result" button triggers API call and updates state', async () => {
    render(<App />);
    
    const testData =  { sortedResult: [
            { name: 'John', rank: 1, pPoint: 20, sPoint: 10 },
            { name: 'Jane', rank: 2, pPoint: 18, sPoint: 12 },
          ], pairResult: [] }
    
    const showResultButton = screen.getByText('Show Result');

    // Mock the API call with the test data
    (calculateResult as jest.Mock).mockResolvedValueOnce({ data: testData });

    // Trigger the button click
    fireEvent.click(showResultButton)

    // Wait for the asynchronous API call to complete
    await waitFor(async() => await expect(calculateResult).toHaveBeenCalled());

    // Check if the result area is now visible with the updated state
    await waitFor(() => {
      const resultArea = screen.getByTestId('result-area');
      expect(resultArea).toBeInTheDocument();
    })
  });
})
