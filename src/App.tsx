import "cross-fetch/polyfill"
import * as React from "react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router5"

import { configureStore } from "./redux/configureStore"
import { configureRouter } from "./routes/configureRouter"
import rootSaga from "./sagas/rootSaga"
import { MainContainer } from "./Containers/MainContainer"


const router = configureRouter()
const store = configureStore(router)
let sagaTask = store.runSaga(rootSaga)

router.start()

export default class App extends React.Component {
	constructor(props: any, state: any) {
		super(props, state)
		console.log("FirstInit")
	}

	render(): JSX.Element {
		return (
			<div className="App">
				<Provider store={store} key="provider">
					<RouterProvider router={router}>
						<MainContainer />
					</RouterProvider>
				</Provider>
			</div>
		)
	}
}
