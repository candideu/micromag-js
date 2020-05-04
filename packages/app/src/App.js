import React from 'react';
import ReactDOM from 'react-dom';

import Container from './components/Container';

class App {
    constructor(options = {}) {
        this.options = {
            locale: 'en',
            ...options,
        };

        this.element = null;
    }

    getProps() {
        return this.options;
    }

    render(el = null) {
        if (el !== null) {
            this.element = el;
        }

        if (this.element === null) {
            throw new Error('You must specify a render element');
        }

        const appProps = this.getProps();
        const appElement = React.createElement(Container, appProps);
        ReactDOM.render(appElement, this.element);
    }
}

export default App;
