import Cities from '../model/cities.js'
import Areas from '../model/areas.js'
import Streets from '../model/street.js'

class GeoService {

    async getCities(citySearch) {

        try {
            const option = {}

            if (citySearch) {
                option.cityName = { $regex: citySearch.toLowerCase() }
            }

            const cities = await Cities.find(option).limit(15)
            return cities.length ? cities : [{ _id: '', cityName: citySearch }]

        } catch (error) {
            console.log(error)
        }

    }


    async getAreas(idCity, area) {

        try {
            const option = {}

            if (idCity) {
                option.idCity = idCity
            }

            if (area) {
                option.areaName = { $regex: area.toLowerCase() }
            }

            const areas = await Areas.find(option).limit(15)

            return areas.length ? areas : [{ areaName: area, _id: idCity }]

        } catch (error) {
            console.log(error)
        }



    }


    async getStreet(idCity, street) {
        

        try {

            const option = {}

            if (idCity) {
                option.idCity = idCity
            }

            if (street) {
                option.streetName = { $regex: street.toLowerCase() }
            }

            const streets = await Streets.find(option).limit(15)

            return streets.length ? streets : [{ streetName: street, _id: idCity }]

        } catch (error) {
            console.log(error)
        }




    }

}

export default new GeoService()