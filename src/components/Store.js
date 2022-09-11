import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../modules/acceptReducer';

const store = createStore(rootReducer);

function Store({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
};

export default Store;