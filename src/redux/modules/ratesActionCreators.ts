import {createAction} from "typesafe-actions"
import {createAsyncActions} from "./baseModule"
import { ICryptocurrency } from "../../models/currency"
import { ICurrencyValue } from '../../models/currencyValue'
import { IDetailsRequest, IMapRequest } from '../../api/RateApi'
import { Maybe } from '../../helpers/generics'


export const initRates = createAction("RATES/INIT_RATES")<IMapRequest>()

export const getDetails = createAction("RATES/GETCURRENCYDETAIL")<IDetailsRequest>()

export const setMapRequestParams = createAction("RATES/SETMAPPARAMS")<IMapRequest>()

export const detailsClear = createAction("RATES/DETAILSCLEAR")()

export const setDetailsCurrencyData = createAction("RATES/SETDETAILSDATA")<Maybe<ICurrencyValue>>()

export const updateDetailsRequest = createAction("RATES/UPDATEDETAILSREQUEST")<Maybe<IDetailsRequest>>()


//POOLING ACTIONS

export const startPooling = createAction("RATES/POOL_START")()

export const stopPooling = createAction("RATES/POOL_START")()

export const startListPooling = createAction("RATES/LISTPOOL_START")()

export const stopListPooling = createAction("RATES/LISTPOOL_STOP")()

export const startDetailPooling = createAction("RATES/DETAILPOOL_START")()

export const stopDetailPooling = createAction("RATES/DETAILPOOL_STOP")()


export const loadCurrencyMap = createAsyncActions(
  "RATES/LOAD_CURRENCYMAP",
  "RATES/LOAD_CURRENCYMAP_PENDING",
  "RATES/LOAD_CURRENCYMAP_FULFILLED",
  "RATES/LOAD_CURRENCYMAP_REJECTED"
)<null, null, ICryptocurrency[] | undefined, null>()

export const loadRates = createAsyncActions(
	"RATES/LOAD_RATES",
	"RATES/LOAD_RATES_PENDING",
	"RATES/LOAD_RATES_FULFILLED",
	"RATES/LOAD_RATES_REJECTED"
  )<null, null, ICurrencyValue[] | undefined, null>()

  export const loadHistoryData = createAsyncActions(
	"RATES/LOAD_HISTORY",
	"RATES/LOAD_HISTORY_PENDING",
	"RATES/LOAD_HISTORY_FULFILLED",
	"RATES/LOAD_HISTORY_REJECTED"
  )<null, null, ICurrencyValue | undefined, null>()

 export const loadOHLCVHistorycalData = createAsyncActions(
	"RATES/LOAD_OHLCV_HISTORY",
	"RATES/LOAD_OHLCV_HISTORY_PENDING",
	"RATES/LOAD_OHLCV_HISTORY_FULFILLED",
	"RATES/LOAD_OHLCV_HISTORY_REJECTED"
  )<null, null, ICurrencyValue | undefined, null>()

  