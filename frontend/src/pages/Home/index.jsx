import React from 'react';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/partials/Button';

import { PageArea } from './styled';

const Page = () => {
    return (
        <PageContainer>
            <PageArea>
                <PageTitle>Technical challenge</PageTitle>
                <Button text="CHALLENGE 1" route="/challenge1" />
                <Button text="CHALLENGE 2" route="/challenge2" />
                <Button text="CHALLENGE 3" route="/challenge3" />
                <Button text="CHALLENGE 4" route="/challenge4" />
                <Button text="CHALLENGE 5" route="/challenge5" />
                <Button text="CHALLENGE 6" route="/challenge6" />
                <Button text="CHALLENGE 7" route="/challenge7" />
            </PageArea>
        </PageContainer>
    );
};

export default Page;
