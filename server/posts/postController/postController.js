import postService from '../postService/postService.js'

class PostController {
    async getPost(req, res) {
        console.log("getpost");
        const postFromDB = await postService.getPost(req.body)
        return res.json(postFromDB)
    }
    async addPost(req, res) {

        await postService.addPost(req.body.post, req.files)
        return res.json("ADD POST")
    }
    async updatePost(req, res) {
        // console.log(req);
        await postService.updatePost(req.body, req.files)
        return res.json("UPDATE POST")
    }
    async deletePost(req, res) {
        await postService.deletePost(req.body)
        return res.json("DELETE POST")
    }
}

export default new PostController()