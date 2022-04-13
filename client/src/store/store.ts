import { configureStore } from '@reduxjs/toolkit'
import { changeFilter } from '../reducer/changeFilter'

const store = configureStore({
    reducer: {
        changeFilter,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store