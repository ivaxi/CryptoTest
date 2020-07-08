import React from "react"

import { getRoutes, navigate } from '../routes/routes'
import { Link } from "react-router5"


import { TablePagination } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"

import { ValueLabel } from "../components/ValueLabel"
import { ICryptocurrency } from '../models/currency'
import { stylesheet } from 'typestyle'


const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	tableImage: {
		height: 50
	},
	imageSrc: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: "cover",
		backgroundPosition: "center 40%"
	},
	activeLink: {
	  textDecoration: "underline",
	  cursor: "pointer"
	},
})


interface IDetailComponentProps {
	currencies: ICryptocurrency[]
	selectedId: number | undefined
	start: number
	limit: number
	onItemSelected: (id: number) => void
	onPaging: (params: {start: number, limit: number}) => void
}
export const CurrencyTable = (props: IDetailComponentProps) => {

	const { currencies, onItemSelected, selectedId, start, limit, onPaging } = props
	
	const routes = getRoutes()

	const classes = useStyles()
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(limit)

	const handleChangePage = (event: unknown, newPage: number) => {
		onPaging({start: newPage == 0 ? 1 : newPage * limit, limit})
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const itemsOnPage: number = +event.target.value
		onPaging({start: 1, limit: itemsOnPage})
		setRowsPerPage(itemsOnPage)
		setPage(0)		
	}
	
	return (
		<React.Fragment>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Symbol</TableCell>
							<TableCell align="left">Currency name</TableCell>
							<TableCell align="left">Capitalization</TableCell>
							<TableCell align="center">Price</TableCell>
							<TableCell align="right">Volue (24h)</TableCell>
							<TableCell align="right">Change (24h)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currencies.map((row, ind) => {
							const isItemSelected = selectedId != undefined ? selectedId == row.id : false
							return (
								<TableRow key={row.id}  selected={isItemSelected}>
									<TableCell align="left">
										<Link routeName={routes.detailPage.name} routeParams={{param: row.symbol}} className={classes.activeLink}>{row.symbol}</Link>
									</TableCell>
									<TableCell onClick={() => onItemSelected(row.id)} className={classes.activeLink} component="td" align="left" scope="row">{row.name}</TableCell>
									<TableCell component="td" align="right" scope="row">
										<ValueLabel currencyId={row.id} field={"market_cap"} />
									</TableCell>
									<TableCell component="td" align="right" scope="row">
										<ValueLabel currencyId={row.id} field={"price"} />
									</TableCell>
									<TableCell component="td" align="right" scope="row">
										<ValueLabel currencyId={row.id} field={"volume_24h"} />
									</TableCell>
									<TableCell component="td" align="right" scope="row">
										<ValueLabel currencyId={row.id} field={"percent_change_24h"} inColor={true} />
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>

			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 15, 20]}
				component="div"
				count={100}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</React.Fragment>
	)
}


