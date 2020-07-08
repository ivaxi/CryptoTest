import * as React from 'react'

import { IgrFinancialChart } from 'igniteui-react-charts'
import { IgrFinancialChartModule } from 'igniteui-react-charts'
import { IgrLegend } from 'igniteui-react-charts'
import { IgrLegendModule } from 'igniteui-react-charts'


import { ICurrencyValue } from '../models/currencyValue'
import { convertDataToStockItem } from '../models/stockItem'

IgrFinancialChartModule.register()
IgrLegendModule.register()

export interface IChartProps{
	data?:ICurrencyValue
}
export default class ChartComponent extends React.Component<IChartProps, any> {

    public data: any[] = []
    public chart: IgrFinancialChart | undefined = undefined
    public legend: IgrLegend| undefined = undefined

    constructor(props: any) {
        super(props)

        this.onChartRef = this.onChartRef.bind(this)
        this.onLegendRef = this.onLegendRef.bind(this)
        this.state = { chartType: "Auto" }
    }
	
    public render(): JSX.Element {
		if(!this.props.data) return <div>No data</div>
		const data = convertDataToStockItem(this.props.data)
		const dateBoundaries = [data[0], data[data.length-1]]
        return (
            <div className="igContainer" >
                <div className="igLegend">
                    <IgrLegend ref={this.onLegendRef}
                            orientation="Horizontal" />
                </div>
                <div className="igComponent" style={{height: "calc(100% - 25px)"}}>
                    <IgrFinancialChart
                        width="100%"
                        height="100%"
                        chartType="Bar"
                        zoomSliderType="Bar"
                        chartTitle={this.props.data.name}
                        subtitle={`from ${dateBoundaries[0].date} to ${dateBoundaries[1].date}`}
                        isToolbarVisible={true}
                        dataSource={data}
                        yAxisMode="PercentChange"
                        thickness={2} />
                </div>
            </div>
        )
    }

    public onChartRef(chart: IgrFinancialChart) {
        if (!chart) { return }

        this.chart = chart
        if (this.legend) {
            this.chart.legend = this.legend
        }
    }

    public onLegendRef(legend: IgrLegend) {
        if (!legend) { return }

        this.legend = legend
        if (this.chart) {
            this.chart.legend = this.legend
        }
    }

}
