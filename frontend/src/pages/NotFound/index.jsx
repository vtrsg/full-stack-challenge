import React from 'react';
import { NotFoundArea } from './styled';
import Button from '../../components/partials/Button';
import PageTitle from '../../components/PageTitle';

const NotFound = () => {
    return (
        <NotFoundArea>
            <PageTitle>Page not found</PageTitle>
            <Button text="Go Home!!" route="/" />
        </NotFoundArea>
    );
};

export default NotFound;
