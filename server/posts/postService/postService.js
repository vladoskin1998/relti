import Post from '../postModel/post.js'
import fileService from '../../fileService/fileService.js'

class PostService {
    async getPost(filter) {

        const { number, street, price, rentOrBuy, select } = filter

        // console.log("number--->", number, "street--->", street, "price---->", price, "rentOrBuy---->", rentOrBuy);
        // console.log(select);
        ///////// 
        let query = {
            street: street ? { $regex: street } : { $exists: true, $ne: null },
            price: price?.toPrice && price?.fromPrice
                ? { $gte: price?.toPrice, $lte: price?.fromPrice }
                : { $exists: true, $ne: null },
            rentOrBuy: { $in: rentOrBuy },
        };

     //   console.log(query);
        //////////////////////////////////
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

        const jpost = JSON.parse(post)

        let images = []
        for (let key in files) {
            images.push(files[key])
        }

        const newPost = {
            ...jpost,
            images: images.map(image => fileService.saveFile(image))
        }

        const addToDB = await new Post(newPost)
        await addToDB.save()
        return
    }

    async updatePost(post, { images }) {

        const newPost = {
            ...post,
            images: images.map(image => fileService.saveFile(image))
        }

        delete newPost.id

        await Post.findByIdAndUpdate(post.id, newPost)

        return
    }
    async deletePost(id) {
        await Post.deleteOne({ id })
        return
    }
}

export default new PostService()