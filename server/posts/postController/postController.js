import postService from '../postService/postService.js'

class PostController {
    async getPost(req, res) {
        const postFromDB = await postService.getPost(req.body)
        return res.json(postFromDB)
    }
    async addPost(req, res) {
        await postService.addPost(req.body)
        return res.json("ADD POST")
    }
    async deletePost(req, res) {
        await postService.deletePost(req.body)
        return res.json("DELETE POST")
    }
}

export default new PostController()