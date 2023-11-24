import React, { useState } from 'react';

import { PageArea } from './styled';

import Button from '../../components/partials/Button';
import PageTitle from '../../components/PageTitle';
import { sendName } from '../../services/api';

const Page = () => {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);
    const [apiResponse, setApiResponse] = useState('');

    const handleButtonClick = async (e) => {
        e.preventDefault();

        try {
            const response = await sendName(name);
            setApiResponse(response.message);
            setShow(true);
        } catch (error) {
            console.error('Request error', error);
        }
    };

    return (
        <PageArea>
            <PageTitle>Challenge 5 - "Hello, [Name] from Request"</PageTitle>
            {!show ? (
                <form onSubmit={handleButtonClick}>
                    <label className="area">
                        <div className="area--title">Enter your name:</div>
                        <div className="area--input">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <Button text="Submit" type="submit" />
                        </div>
                    </label>
                </form>
            ) : (
                <>
                    <h2>
                        <b>{apiResponse}</b>
                    </h2>
                    <Button text="Go home" route="/" />
                </>
            )}
        </PageArea>
    );
};

export default Page;
