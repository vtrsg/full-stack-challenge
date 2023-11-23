import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonArea } from './styled';

const Button = ({ text, route }) => {
    return (
        <Link to={route} component={NavLink}>
            <ButtonArea>{text}</ButtonArea>
        </Link>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

export default Button;
