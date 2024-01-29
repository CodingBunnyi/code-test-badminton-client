import React from "react"
import "./MatchCard.css"

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { Card, TextField } from "@mui/material"
import { RoundData } from "../../../type"

type Props = {
  roundName: string
  match: RoundData,
  index: number,
  roundData: RoundData[],
  setRoundData: React.Dispatch<React.SetStateAction<RoundData[]>>,
  deleteRoundMatch: (
    _e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string,
    roundData: RoundData[],
    setRoundData: React.Dispatch<React.SetStateAction<RoundData[]>>
  ) => void,
  updateRoundChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string,
    attr: string,
    playerIndex: number,
    roundData: RoundData[],
    setRoundData: React.Dispatch<React.SetStateAction<RoundData[]>>
  ) => void,
}
const MatchCard = ({
	roundName,
	match,
	index,
	roundData,
	setRoundData,
	deleteRoundMatch,
	updateRoundChange
}: Props) => {
	return (
		<Card
			key={ match.id }
			className={ roundName === "round1" ? "matchCardLeft" : "matchCardRight" }
		>
			<CloseOutlinedIcon
				data-testid={ "delete-btn-" + roundName }
				color="action"
				className="closeIcon"
				onClick={ (e) => deleteRoundMatch(e, match.id, roundData, setRoundData) }
			/>
			<p className='matchTitle'>MATCH { index + 1 }</p>
			<div>
				<div className="playerDiv">
					<div>Player1:</div>
					<TextField
						required
						label="Player name"
						data-testid={ index + "-p1-" + roundName + "-text-field-name" }
						variant="standard"
						sx={ { mx: 2, mt: "5px" } }
						onChange={ (e) =>
							updateRoundChange(e, match.id, "name", 0, roundData, setRoundData) }
						defaultValue={ match.players[0].name }
						size="small"
					/>
					<TextField
						required
						label="Player score"
						variant="standard"
						data-testid={ index + "-p1-" + roundName + "-text-field-score" }
						type="number"
						sx={ { mx: 2, mt: "5px" } }
						onChange={ (e) => 
							updateRoundChange(e, match.id, "score", 0, roundData, setRoundData) }
						defaultValue={ match.players[0].score }
						size="small"
					/>
				</div>
				<div className="playerDiv">
					<div>Player2:</div>
					<TextField
						required
						label="Player name"
						variant="standard"
						data-testid={ index + "-p2-" + roundName + "-text-field-name" }
						sx={ { mx: 2, mt: "5px" } }
						onChange={ (e) => 
							updateRoundChange(e, match.id, "name", 1, roundData, setRoundData) }
						defaultValue={ match.players[1].name }
						size="small"
					/>
					<TextField
						required
						label="Player score"
						variant="standard"
						type="number"
						data-testid={ index + "-p2-" + roundName + "-text-field-score" }
						sx={ { mx: 2, mt: "5px" } }
						onChange={ (e) => 
							updateRoundChange(e, match.id, "score", 1, roundData, setRoundData) }
						defaultValue={ match.players[1].score }
						size="small"
					/>
				</div>
			</div>
		</Card>
	)
}

export default MatchCard