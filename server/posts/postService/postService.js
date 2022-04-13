import Post from '../postModel/post.js'
import fileService from '../../fileService/fileService.js'

class PostService {
    async getPost(filter) {

        const { number, street, price, date } = filter


        console.log(number, street, price, date);

        var query = {
            street: street ? {$in:  street} : { $exists: true, $ne: null },
            price: price ? { $gte: price.toPrice, $lte: price.fromPrice } : { $exists: true, $ne: null },
            date: date ?  { $gte: date.toDate, $lte: date.fromDate } : { $exists: true, $ne: null },
        };

        const options = {
            page: number,
            limit: 4,
            sort: { _id: -1 },
        };


        const getFromDB = await Post.paginate(query, options, function (err, result) {

            if (err) {
            throw err}

            const {docs, totalPages} = result

            return {docs, totalPages}
        });

        return getFromDB
    }
    async addPost(post, file ) {

        const newPost = {
            ...post,
            images: file?.images.map(image => fileService.saveFile(image))
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