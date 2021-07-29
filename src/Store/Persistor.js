import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducer from './reducer'

const config = {
    key:'ofreshgrocery',
    storage
}

const persistreducer = persistReducer(config, reducer)

export const store = createStore(persistreducer)

export const persistor = persistStore(store)