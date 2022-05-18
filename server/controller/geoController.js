import GeoService from '../service/geoService.js'
import url from 'url'

class GeoController {

    async getCities(req, res){

        const query = url.parse(req.url, true).query;

        const cities = await GeoService.getCities(query?.city)

        return res.json({cities})

    }

    async getAreas(req, res){

        const query = url.parse(req.url, true).query;

        const areas = await GeoService.getAreas(query?.idCity, query?.area)

        return res.json({areas})

    }


    async getStreet(req, res){

        const query = url.parse(req.url, true).query;

        const streets = await GeoService.getStreet(query?.idCity, query?.street)

        return res.json({streets})

    }
}

export default new GeoController()