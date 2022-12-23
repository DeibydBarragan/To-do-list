import React, {useState} from 'react';

const NavbarComponent = () => {

    const [isLogged, setLogged] = useState(false)

    return (
        <div className='navbar'>
            <div className='navbar-end'>
                <button className='btn' onClick={ () => setLogged(!isLogged) }>{ isLogged ? 'logout' : 'login' }</button>
            </div>
        </div>
    );
}

export default NavbarComponent;
