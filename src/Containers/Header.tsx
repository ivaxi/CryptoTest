import * as React from "react"
import { connect } from "react-redux"
import { ConnectedLink } from "react-router5"
import { IStore } from "../redux/IStore"
import { getRoutes } from "../routes/routes"
import { State } from 'router5'
import Paper from '@material-ui/core/Paper'
import { Maybe } from "../helpers/generics"

import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',			
		},
		link: {
			lineHeight: '50px',			
			display: 'flex',
			height: '50px'
		},
		icon: {
			fontSize: '30px'
		}
		
	}),
)

interface IStateToProps {
	currentRoute: Maybe<State>
}

const Header = (props: IStateToProps) => {
		const routes = getRoutes()
		const classes = useStyles()
		const { currentRoute } = props
		if (!currentRoute) return <div>No current route</div>
		return (
			<Paper className={classes.root} elevation={2} >
				{currentRoute.name == routes.detailPage.name && (
						<ConnectedLink 							
							routeName={routes.homePage.name}
							className={classes.link}>							
								<span className={classes.icon}><ChevronLeftIcon /></span><span>Currencies</span>
						</ConnectedLink>
				)}
			</Paper>
		)
}


function mapStateToProps(state: Pick<IStore, "appState" | "router">): IStateToProps {
	return {
		currentRoute: state.router.route
	}
}
const connected = connect(mapStateToProps)(Header)


export { connected as Header, Header as UnconnectedHeader, mapStateToProps }
