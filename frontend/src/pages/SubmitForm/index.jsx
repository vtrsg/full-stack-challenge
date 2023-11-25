import React, { useState } from 'react';

import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/partials/Button';

import { PageArea } from './styled';

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);

        setDisabled(true);
        setName('');
        setEmail('');
        setPassword('');
    };
    return (
        <PageContainer>
            <PageTitle>
                Challenge 1 - alert with the data entered into the form
            </PageTitle>
            <PageArea>
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">Name</div>
                        <div className="area--input">
                            <input
                                type="text"
                                disabled={disabled}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Email</div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Password</div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                <Button text="Go home" route="/" />
            </PageArea>
        </PageContainer>
    );
};

export default Page;
