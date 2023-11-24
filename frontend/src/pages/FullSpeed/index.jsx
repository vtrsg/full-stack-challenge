import React, { useState } from 'react';

import { PageArea } from './styled';

import HelloMessage from '../../components/HelloMessage';
import Button from '../../components/partials/Button';
import PageTitle from '../../components/PageTitle';

const Page = () => {
    const [speed, setSpeed] = useState(0);
    const [acceleration, setAcceleration] = useState(0);
    const [show, setShow] = useState(false);

    const handleButtonClick = (e) => {
        e.preventDefault();
        setShow(true);
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
                    <HelloMessage name={speed} />
                    <Button text="Go home" route="/" />
                </>
            )}
        </PageArea>
    );
};

export default Page;
