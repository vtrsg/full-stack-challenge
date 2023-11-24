import React from 'react';
import { NotFoundArea } from './styled';
import Button from '../../components/partials/Button';

const NotFound = () => {
    return (
        <NotFoundArea>
            <h1>Page not found</h1>
            <Button text="Go Home!!" route="/" />
        </NotFoundArea>
    );
};

export default NotFound;
