import { Router } from 'express'
import authUserRole from '../midlleware-server/authUserRole.js'
import postController from '../controler/postController.js'

const postRouter = new Router()

postRouter.post('/get-post', postController.getPost)

postRouter.post('/add-post', authUserRole(['ADMIN']), postController.addPost)

postRouter.post('/delete-post', authUserRole(['ADMIN']), postController.deletePost)

export default postRouter