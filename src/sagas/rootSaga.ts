import {all, AllEffect} from "redux-saga/effects"
import { ApplicationSaga } from "./ApplicationSaga"
import { RateSaga } from './RateSaga'

export default function* rootSaga(): IterableIterator<AllEffect<any>> {
  yield all([
    (new ApplicationSaga()).watch(),
	(new RateSaga()).watch()	
  ])
}
