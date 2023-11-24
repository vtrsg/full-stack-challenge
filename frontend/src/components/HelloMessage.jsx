import React from 'react';
import PropTypes from 'prop-types';

const HelloMessage = ({ name }) => {
    return (
        <h2>
            <b>Hello, {name}!</b>
        </h2>
    );
};

HelloMessage.propTypes = {
    name: PropTypes.string.isRequired,
};

export default HelloMessage;
