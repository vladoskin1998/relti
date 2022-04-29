import postService from '../postService/postService.js'

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
        await postService.deletePost(req.body.id)
        return res.json("DELETE POST")
    }
}

export default new PostController()