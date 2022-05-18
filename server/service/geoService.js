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

    async addGeoData(post) {

        const { city, street } = post
        let idCity = city?.value
        console.log('post--->', post)

        if (!idCity) {
            const newCityDB = await new Cities({ cityName: city?.label })
            idCity = await newCityDB.save()

            if(post?.areas){
                const newAreaDB = await new Areas({ areaName: post.areas.label, idCity: idCity })
                await newAreaDB.save()
            }

            const newStreetDB = await new Streets({ streetName: street.label, idCity: idCity })
            await newStreetDB.save()

            return
        }

        const areaDB = await Areas.findOne({ areaName: post?.areas?.label, idCity: idCity })
        const streetDB = await Streets.findOne({ cityName: street.label, idCity: idCity })

        if (!areaDB && post?.areas) {
            const newAreaDB = await new Areas({ areaName: post?.areas?.label, idCity: idCity })
            await newAreaDB.save()
        }

        if (!streetDB) {
            const newStreetDB = await new Streets({ streetName: street.label, idCity: idCity })
            await newStreetDB.save()
        }

        return
    }

}

export default new GeoService()