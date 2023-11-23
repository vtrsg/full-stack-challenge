import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ButtonArea } from './styled';

const Button = ({ text, route, onClick, type }) => {
    const buttonProps = route ? { as: NavLink, to: route } : { type, onClick };

    return (
        <ButtonArea as={route && NavLink} {...buttonProps}>
            {text}
        </ButtonArea>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    route: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
};

export default Button;
