import React, { useState } from 'react';

import { PageArea } from './styled';

import Button from '../../components/partials/Button';
import PageTitle from '../../components/PageTitle';
import { sendFullSpeed } from '../../services/api';

const Page = () => {
    const [speed, setSpeed] = useState(0);
    const [acceleration, setAcceleration] = useState(0);
    const [show, setShow] = useState(false);
    const [apiResponse, setApiResponse] = useState('');

    const handleButtonClick = async (e) => {
        e.preventDefault();

        try {
            const response = await sendFullSpeed(speed, acceleration);
            setApiResponse(response.message);
            setShow(true);
        } catch (error) {
            console.error('Request error', error);
        }
    };

    return (
        <PageArea>
            <PageTitle>Challenge 6 - Full Speed</PageTitle>
            {!show ? (
                <form onSubmit={handleButtonClick}>
                    <label className="area">
                        <div className="area--title">
                            Enter the current speed:
                        </div>
                        <div className="area--input">
                            <input
                                type="number"
                                value={speed}
                                onChange={(e) => setSpeed(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Put the acceleration:</div>
                        <div className="area--input">
                            <input
                                type="number"
                                value={acceleration}
                                onChange={(e) =>
                                    setAcceleration(e.target.value)
                                }
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
