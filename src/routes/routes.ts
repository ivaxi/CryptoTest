import {ConnectedComponent} from "react-redux"
import {Action} from "redux"
import {actions} from "redux-router5"

interface IRoute {
  name: RoutablePages
  path: string
}
export type RoutablePages = "homePage" | "detailPage"

type RouteConfig = Record<RoutablePages, Omit<IRoute, "name">>

function getProperty<T, K extends keyof T>(obj: T, key: K) {
	return obj[key]  
  }

export type RoutePageMap = Record<RoutablePages, ConnectedComponent<any, any>>
type RouteNavigate = Record<RoutablePages, (...params: any[]) => Action>

const config: RouteConfig = {
  detailPage: {path: "/details/:param"},
  homePage: {path: "/"}
}


export function getRoutes(baseUrl: string = ""): Record<RoutablePages, IRoute> {
  const routeKeys  = Object.keys(config as RouteConfig) as RoutablePages[]
	return routeKeys
    .map((key) => ({
      name: key,
      path: baseUrl + config[key].path //getProperty<RouteConfig, RoutablePages>(config, key)/
    }))
    .reduce((a, c) => ({...a, [c.name]: c}), {} as any)
}

function getNavigateAction<T extends {[key: string]: any}>(routeName: RoutablePages, params?: T): Action {
  return actions.navigateTo(routeName, params)
}

const routes = getRoutes()

export const navigate: RouteNavigate = {  
  detailPage: (id: number) => getNavigateAction(routes.detailPage.name, {id}),
  homePage: () => getNavigateAction(routes.homePage.name)
}
