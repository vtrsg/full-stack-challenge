import React, { useState } from 'react';
import Button from '../../components/partials/Button';
import PageTitle from '../../components/PageTitle';
import { PageArea } from './styled';
import { sendText } from '../../services/api';

const Page = () => {
    const [inputType, setInputType] = useState('text');
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [show, setShow] = useState(false);

    const handleChangeType = (type) => {
        setInputType(type);
        setText('');
        setFile(null);
    };

    const handleChange = (e) => {
        if (inputType === 'text') {
            setText(e.target.value);
        }
    };

    const handleFileChange = (e) => {
        if (inputType === 'file') {
            const file = e.target.files[0];
            setFile(file);
            setText('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let result;

            if (inputType === 'text') {
                result = await sendText({ text: text });
            } else if (inputType === 'file' && file) {
                const formData = new FormData();
                formData.append('file', file);

                const config = {
                    headers: {
                        'Content-Disposition': `attachment; file=${file.name}`,
                    },
                };

                result = await sendText(formData, config);
            }

            setResponse(result);
            setShow(true);
        } catch (error) {
            console.error('Error when entering data:', error);
        }
    };

    return (
        <PageArea>
            <PageTitle>Challenge 7 - List Lines</PageTitle>
            {!show && (
                <div>
                    <label>
                        <input
                            type="radio"
                            value="text"
                            checked={inputType === 'text'}
                            onChange={() => handleChangeType('text')}
                        />
                        Enter Text
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="file"
                            checked={inputType === 'file'}
                            onChange={() => handleChangeType('file')}
                        />
                        Upload File
                    </label>
                </div>
            )}
            {!show ? (
                <form onSubmit={handleSubmit}>
                    {inputType === 'text' && (
                        <textarea
                            rows={10}
                            value={text}
                            onChange={handleChange}
                            placeholder="Enter text:"
                        />
                    )}
                    {inputType === 'file' && (
                        <input
                            type="file"
                            accept=".txt"
                            onChange={handleFileChange}
                        />
                    )}
                    <Button text="Submit" type="submit" />
                </form>
            ) : (
                <>
                    <div className="scroll-div">
                        {response &&
                        response.message.lines &&
                        response.message.lines.length > 0 ? (
                            <ul>
                                {response.message.lines.map((line, index) => (
                                    <li key={index}>{line}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No lines found.</p>
                        )}
                    </div>
                    <Button text="Go home" route="/" />
                </>
            )}
        </PageArea>
    );
};

export default Page;
