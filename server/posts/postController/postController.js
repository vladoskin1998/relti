import postService from '../postService/postService.js'

class PostController {
    async getPost(req, res) {
        console.log(req);
        const postFromDB = await postService.getPost(req.body)
        return res.json(postFromDB)
    }
    async addPost(req, res) {
        console.log(req);
        await postService.addPost(req.body, req.files)
        return res.json("ADD POST")
    }
    async deletePost(req, res) {
        await postService.deletePost(req.body)
        return res.json("DELETE POST")
    }
}

export default new PostController()