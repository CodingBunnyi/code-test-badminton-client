import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Typography } from "@mui/material"
import { GetResultRes } from "../../type"

type props = {
  resultData: GetResultRes
  isResultShow: boolean
  setIsResultShow: (val: boolean) => void
}

const ResultArea = ({ isResultShow, setIsResultShow, resultData }: props) => {
	const { sortedResult, pairResult } = resultData

	const columns: GridColDef[] = [
		{ field: "rank", headerName: "Rank", width: 100 },
		{ field: "name", headerName: "Player Name", width: 150 },
		{ field: "pPoint", headerName: "Primary Points", width: 150, align: "center" },
		{ field: "sPoint", headerName: "Secondary Points", width: 150, align: "center" },
	]
	const closeDialog = () => {
		setIsResultShow(false)
	}
	return(
		<Dialog
			open={ isResultShow }
			onClose={ closeDialog }
			maxWidth='md'
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			data-testid="result-area"
		>
			<DialogTitle>{ "Result" }</DialogTitle>
			<DialogContent>
				<DataGrid
					autoHeight
					rows={ sortedResult }
					columns={ columns }
					getRowId ={ (row) => row.name }
					initialState={ {
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					} }
					pageSizeOptions={ [5, 10] }
				/>
				<Typography variant="h6" sx={ { mt: "16px" } }>Next Round</Typography>
				{ pairResult.map((info, index) => (
					<p key={ index }>{ info.player1 } VS { info.player2 }</p>
				)) }
			</DialogContent>
			<DialogActions>
				<Button data-testid="ok-btn" onClick={ closeDialog }>OK</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ResultArea