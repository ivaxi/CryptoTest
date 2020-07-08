import * as React from "react"

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'

import {connect} from "react-redux"
import {IStore} from "../redux/IStore"
import { ICurrencyValue, ICurrencyPair } from '../models/currencyValue'


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		positiveLabel: {
			color: "#12a500"
		},
		negativeLabel: {
			color: "#ff0000"
		},
		neutralLabel: {
			
		}
	}),
)

interface IStateToProps {
	values: ICurrencyValue[]  
	
}

interface IProps extends IStateToProps{
	currencyId: number
	field: keyof ICurrencyPair
	inColor?: boolean
 }
  

const ValueLabel = (props: IProps) => {
	const {values, currencyId, field, inColor} = props
	
	const classes = useStyles()
	const theme = useTheme()
	

	if(values && values[currencyId]) {
		const value =	values[currencyId].quote["USD"][field] 

		const coloredClasses = [classes.negativeLabel, classes.neutralLabel, classes.positiveLabel]
		let colorClass = classes.neutralLabel
		if( inColor) {
			colorClass = coloredClasses[Math.sign(value as number)+1]
		} 
		
		const roundUp = Math.round((value as number + Number.EPSILON) * 10000) / 10000
		return <span className={colorClass}>{roundUp}</span>
	} else {
		return <span>{""}</span>
	}
  
}

 
function mapStateToProps(state: Pick<IStore, "rateState">): IStateToProps {
  return {
	  values: state.rateState.rates
  }
}

const connected = connect(mapStateToProps)(ValueLabel)
export {connected as ValueLabel, mapStateToProps}
