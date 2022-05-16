import { Router } from 'express'
import authUserRole from '../midlleware-server/authUserRole.js'
import postController from '../controller/postController.js'

const PostRouter = new Router()

PostRouter.post('/get-post', postController.getPost)

PostRouter.post('/add-post', authUserRole(['ADMIN']), postController.addPost)

PostRouter.post('/delete-post', authUserRole(['ADMIN']), postController.deletePost)

export default PostRouter