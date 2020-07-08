import React, { ComponentClass, FunctionComponent } from 'react'

import '../App.css'

import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createRouteNodeSelector, RouterState } from "redux-router5"
import { State as IRouteState } from "router5"

import { stylesheet } from "typestyle"

import { IStore } from "../redux/IStore"
import * as appActionCreators from "../redux/modules/appActionCreators"

import { DetailsPage } from "../pages/DetailsPage"
import { HomePage } from "../pages/HomePage"
import { Header } from './Header'

const classNames = stylesheet({
	container: {
		margin: 0,
		padding: 0,
		textAlign: "center"
	}
})

interface IStateToProps {
	route: IRouteState
}
interface IDispatchToProps {
	createApp: () => void
}

interface IProps extends IStateToProps, IDispatchToProps { }

type AnyReact = string | FunctionComponent<any> | ComponentClass<any, any>

class MainContainer extends React.Component<IProps> {
	private routerComponents: { name: string, component: AnyReact }[] = [
		{ name: 'homepage', component: HomePage },
		{ name: 'detailpage', component: DetailsPage }
	]
	constructor(props: IStateToProps & IDispatchToProps) {
		super(props)
		this.props.createApp()
	}
	render(): JSX.Element {
		const { route } = this.props
		const segment = route ? route.name.split(".")[0].toLowerCase() : undefined
		const component = this.routerComponents.find(rc => rc.name === segment)
		return (
			<section className={classNames.container}>
				<Header />
				{segment && component ? React.createElement(component.component) : <div>Not found</div>}
			</section>
		)
	}
}

const mapStateToProps = (state: Pick<IStore, "router" | "appState">): IStateToProps & Partial<RouterState> => ({
	...createRouteNodeSelector("")(state)
})

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
	return {
		createApp: () => dispatch(appActionCreators.createApp())
	}
}

const connected = connect(mapStateToProps, mapDispatchToProps)(MainContainer)

export { classNames, connected as MainContainer, MainContainer as UnconnectedApp, mapStateToProps }

