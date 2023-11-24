import React, { useState } from 'react';
import Button from '../../components/partials/Button';
import { PageArea } from './styled';
import PageTitle from '../../components/PageTitle';

const Page = () => {
    const [text, setText] = useState('');
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <PageArea>
            <PageTitle>Challenge 7 - List Lines</PageTitle>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={10}
                    value={text}
                    onChange={handleChange}
                    placeholder="Enter text:"
                />
                <Button text="Submit" type="submit" />
            </form>

            {response && (
                <div>
                    <ul>
                        {response.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </PageArea>
    );
};

export default Page;
