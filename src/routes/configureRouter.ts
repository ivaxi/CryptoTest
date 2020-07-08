import createRouter, {Router} from "router5"
import browserPlugin from "router5-plugin-browser"
import {MiddlewareFactory} from "router5/dist/types/router"
import { getRoutes, RoutablePages } from './routes'

export function configureRouter(baseUrl: string = ""): Router {
  const routes = getRoutes(baseUrl)
  const routesKeys: RoutablePages[] = Object.keys(routes) as RoutablePages[]
  const router = createRouter(routesKeys.map((key) => routes[key]))
  router.usePlugin(browserPlugin({useHash: false}))

  const middlewares: MiddlewareFactory[] = []

  router.useMiddleware(...middlewares)

  return router
}
