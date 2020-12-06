import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure( { adapter: new Adapter() } );

class cookie {
    constructor() {
        this.store = {}
    }

    clear () {
        this.store = {}
    }

    load ( key ) {
        return this.store[ key ] || null
    }

    setCookie ( key, value ) {
        this.store[ key ] = value
    }

    removeCookie ( key ) {
        delete this.store[ key ]
    }
}

Object.defineProperty( window, 'cookie', {
    value: new cookie()
} );