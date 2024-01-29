import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect" // For additional matchers
import InputArea from "./InputArea"

describe("InputArea component", () => {
	test("renders without crashing", () => {
		render(<InputArea />)
		expect(screen.getByText(/Round 1/i)).toBeInTheDocument()
		expect(screen.getByText(/Round 2/i)).toBeInTheDocument()
	})

	test("adds a match to Round 1 when the \"Add\" button is clicked", () => {
		render(<InputArea />)
    
		const initialMatchesCount = screen.getAllByText(/MATCH/i).length

		fireEvent.click(screen.getByTestId("add-btn-1"))

		const updatedMatchesCount = screen.getAllByText(/MATCH/i).length

		expect(updatedMatchesCount).toBe(initialMatchesCount + 1)
	})

	test("adds a match to Round 2 when the \"Add\" button is clicked", () => {
		render(<InputArea />)
    
		const initialMatchesCountRound2 = screen.getAllByText(/MATCH/i).length

		fireEvent.click(screen.getByTestId("add-btn-2"))

		const updatedMatchesCountRound2 = screen.getAllByText(/MATCH/i).length

		expect(updatedMatchesCountRound2).toBe(initialMatchesCountRound2 + 1)
	})

	test("deletes a match from Round 1 when the \"Delete\" button is clicked", () => {
		render(<InputArea />)
    
		const initialMatchesCountRound1 = screen.getAllByTestId("delete-btn-round1").length

		fireEvent.click(screen.getAllByTestId("delete-btn-round1")[0])

		const updatedMatchesCountRound1 = screen.getAllByTestId("delete-btn-round1").length

		expect(updatedMatchesCountRound1).toBe(initialMatchesCountRound1 - 1)

	})

	test("deletes a match from Round 2 when the \"Delete\" button is clicked", () => {
		render(<InputArea />)
    
		const initialMatchesCountRound2 = screen.getAllByTestId("delete-btn-round2").length

		fireEvent.click(screen.getAllByTestId("delete-btn-round2")[0])

		const updatedMatchesCountRound2 = screen.getAllByTestId("delete-btn-round2").length

		expect(updatedMatchesCountRound2).toBe(initialMatchesCountRound2 - 1)

	})

	test("edit players with an index other than 0.", () => {
		render(<InputArea />)

		const p = screen.getByTestId("1-p1-round1-text-field-score").querySelector("input")
		fireEvent.change(p, { target: { value: 12 } })
		expect(p.value).toBe("12")
	})

	test("updates player1 name in Round 1 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p1-round1-text-field-name").querySelector("input")
		fireEvent.change(p, { target: { value: "John Doe" } })
		expect(p.value).toBe("John Doe")

	})

	test("updates player1 score in Round 1 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p1-round1-text-field-score").querySelector("input")
		fireEvent.change(p, { target: { value: 12 } })
		expect(p.value).toBe("12")
	})

	test("updates player2 name in Round 1 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p2-round1-text-field-name").querySelector("input")
		fireEvent.change(p, { target: { value: "John Doe" } })
		expect(p.value).toBe("John Doe")
	})

	test("updates player2 score in Round 1 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p2-round1-text-field-score").querySelector("input")
		fireEvent.change(p, { target: { value: 12 } })
		expect(p.value).toBe("12")
	})

	test("updates player1 name in Round 2 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p1-round2-text-field-name").querySelector("input")
		fireEvent.change(p, { target: { value: "John Doe" } })
		expect(p.value).toBe("John Doe")
	})

	test("updates player1 score in Round 2 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p1-round2-text-field-score").querySelector("input")
		fireEvent.change(p, { target: { value: 12 } })
		expect(p.value).toBe("12")
	})

	test("updates player2 name in Round 2 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p2-round2-text-field-name").querySelector("input")
		fireEvent.change(p, { target: { value: "John Doe" } })
		expect(p.value).toBe("John Doe")
	})

	test("updates player2 score in Round 2 when input value changes", () => {
		render(<InputArea />)

		const p = screen.getByTestId("0-p2-round2-text-field-score").querySelector("input")
		fireEvent.change(p, { target: { value: 12 } })
		expect(p.value).toBe("12")
	})
})