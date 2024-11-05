import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './reset.css';
import './App.scss';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store.js';
import {HelmetProvider} from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App/>
            </HelmetProvider>
        </BrowserRouter>
    </Provider>
);
