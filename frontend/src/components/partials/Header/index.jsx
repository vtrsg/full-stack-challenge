import React from 'react';
import { HeaderArea } from './styled';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/" component={NavLink}>
                        <span className="logoName">Full stack challenge</span>
                    </Link>
                </div>
            </div>
        </HeaderArea>
    );
};

export default Header;
