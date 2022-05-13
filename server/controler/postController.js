import postService from '../service/postService.js'

class PostController {
    async getPost(req, res) {
        const postFromDB = await postService.getPost(req.body)
        return res.json(postFromDB)
    }
    async addPost(req, res) {
        await postService.addPost(req.body.post, req.files)
        return res.json("ADD POST")
    }

    async deletePost(req, res) {
        const totalPage = await postService.deletePost(req.body.id, req.body.filter)
        return res.json(totalPage)
    }
}

export default new PostController()