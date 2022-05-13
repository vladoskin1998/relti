import Post from '../model/post.js'
import fileService from './fileService.js'
import PaginationDto from '../dto/paginationDto.js'
import { LIMIT_PAGE } from '../conf.js'

class PostService {

    async getPost(filter) {

        const { number, select } = filter

        const query = new PaginationDto(filter)

        // console.log(query)

        const options = {
            page: number,
            limit: LIMIT_PAGE,
            sort: ['asc', 'desc'].includes(select) ? { price: select } : { date: select },
        };

        const getFromDB = await Post.paginate(query, options, function (err, result) {

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

    async deletePost(id, filter) {
        try {

            console.log(filter)
            
            let { images } = await Post.findByIdAndRemove(id)
            images.map(image => fileService.deleteFile(image))

            const query = new PaginationDto(filter)
            const totalPages = await Post.paginate(query, { limit: LIMIT_PAGE }, (err, result) => result.totalPages);

            return { totalPages }
        } catch (error) {
            console.log("deletePost", error)
        }
    }
}

export default new PostService()