import React, { useState } from 'react';

import { PageArea } from './styled';

import HelloMessage from '../../components/HelloMessage';
import Button from '../../components/partials/Button';
import PageTitle from '../../components/PageTitle';

const Page = () => {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [email, setEmail] = useState('');
    const [average, setAverage] = useState(null);
    const [countStudent, setCountStudent] = useState(0);

    const insertStudent = async () => {
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, grade, email }),
            });

            const data = await response.json();
            setAverage(data.average_grades);
            setName('');
            setGrade('');
        } catch (error) {
            console.error('Error when inserting student:', error);
        }
    };

    return (
        <PageArea>
            <PageTitle>Challenge 4 - Insert Students</PageTitle>
            <form onSubmit={insertStudent}>
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
                    <div className="area--title">Enter your email:</div>
                    <div className="area--input">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </label>
                <label className="area">
                    <div className="area--title">Enter your note:</div>
                    <div className="area--input">
                        <input
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
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
    );
};

export default Page;
