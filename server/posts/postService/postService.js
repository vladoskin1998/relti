import Post from '../postModel/post.js'
import fileService from '../../file-service/fileService.js'

class PostService {

    async getPost(filter) {

        const { number, street, price, rentOrBuy, select } = filter

        let query = {
            street: street ? { $regex: street } : { $exists: true, $ne: null },
            price: price?.toPrice && price?.fromPrice
                ? { $gte: price?.toPrice, $lte: price?.fromPrice }
                : { $exists: true, $ne: null },
            rentOrBuy: { $in: rentOrBuy },
        };

        const options = {
            page: number,
            limit: 4,
            sort: ['asc', 'desc'].includes(select) ? { price: select } : { date: select },
        };

        const getFromDB = await Post.paginate(query, options, function (err, result) {

            if (err) {
                throw err
            }

            const { docs, totalPages } = result

            return { docs, totalPages }
        });

        return getFromDB
    }

    async addPost(post, files) {

        try {
            const clientPost = JSON.parse(post)

            let images = []
            for (let key in files) {
                images.push(files[key])
            }

            const newPost = {
                ...clientPost,
                images: images.map(image => fileService.saveFile(image))
            }

            const addToDB = await new Post(newPost)
            await addToDB.save()
            return

        } catch (error) {
            console.log("AddPostError", error)
        }
    }

    async deletePost(id) {
       
        let { images } = await Post.findByIdAndRemove(id)
        images.map(image => fileService.deleteFile(image))
        return
    }
}

export default new PostService()