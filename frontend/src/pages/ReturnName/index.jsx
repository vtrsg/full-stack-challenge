import React, { useState } from 'react';

import { PageArea } from './styled';

import HelloMessage from '../../components/HelloMessage';
import Button from '../../components/partials/Button';

const Page = () => {
    const [name, setName] = useState('');
    const [show, setShow] = useState(false);

    const handleButtonClick = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <PageArea>
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
                    <HelloMessage name={name} />
                    <Button text="Go home" route="/" />
                </>
            )}
        </PageArea>
    );
};

export default Page;
