import { configureStore } from '@reduxjs/toolkit'
import { ChangeFilter } from '../reducer/changeFilter'
import { AddPost } from '../reducer/addPost'
import { LoaderChange } from '../reducer/loader';
import { AuthReducer } from '../reducer/auth';

const store = configureStore({
    reducer: {
        ChangeFilter,
        AddPost,
        LoaderChange,
        AuthReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store