import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Store from './components/Store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Store>
        <App />
    </Store>
);