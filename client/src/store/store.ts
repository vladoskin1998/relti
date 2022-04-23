import { configureStore } from '@reduxjs/toolkit'
import { ChangeFilter } from '../reducer/changeFilter'
import { AddPost } from '../reducer/addPost'

const store = configureStore({
    reducer: {
        ChangeFilter,
        AddPost,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store