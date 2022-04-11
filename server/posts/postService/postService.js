import Post from '../postModel/post.js'
import fileService from '../../fileService/fileService.js'

class PostService {
    async getPost(filter) {

        const { number, street, price, date } = filter

        var query = {
            street: {
                $in: street,
            },
            price: { $gte: price[0], $lte: price[1] },
            date: { $gte: date[0], $lte: date[1] },
        };

        const options = {
            page: number,
            limit: 4,
            sort: { _id: -1 },
        };


        const getFromDB = await Post.paginate(query, options, function (err, result) {

            if (err) {
                throw err
            }
            return result.docs
        });

        return getFromDB
    }
    async addPost(post, {images}) {

        console.log("post----->", images);

        const newPost = {
            ...post,
            images: images.map(image => fileService.saveFile(image))
        }
        const addToDB = await new Post(newPost)
        await addToDB.save()
        return
    }
    async deletePost(id) {
        await Post.deleteOne({ id })
        return
    }
}

export default new PostService()