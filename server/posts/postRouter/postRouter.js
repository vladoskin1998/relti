import { Router } from 'express'
import authUserRole from '../../auth/authMiddleware/authUserRole.js'
import postController from '../postController/postController.js'
//import authAccess from './auth/authMiddleware/authAccess.js'

const postRouter = new Router()

postRouter.post('/get-post', postController.getPost)

postRouter.post('/add-post', 
//authUserRole(['ADMIN']),
postController.addPost)

postRouter.delete('/delete-post', 
//authUserRole(['ADMIN']), 
postController.deletePost)

export default postRouter