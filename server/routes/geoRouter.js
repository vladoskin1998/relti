import { Router } from 'express'
import GeoController from '../controller/geoController.js'

const GeoRouter = new Router()

GeoRouter.get('/get-cities', GeoController.getCities)

GeoRouter.get('/get-areas', GeoController.getAreas)

GeoRouter.get('/get-street', GeoController.getStreet)

export default GeoRouter