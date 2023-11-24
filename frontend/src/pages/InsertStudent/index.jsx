import React, { useState } from 'react';

import { PageArea } from './styled';

import Button from '../../components/partials/Button';
import { insertStudent } from '../../services/api';
import PageTitle from '../../components/PageTitle';

const Page = () => {
    const [data, setData] = useState({
        name: '',
        grade: '',
        email: '',
    });
    const [show, setShow] = useState(false);
    const [average, setAverage] = useState(0);
    const [countStudent, setCountStudent] = useState(0);

    const handleInsertData = async (e) => {
        e.preventDefault();

        try {
            const response = await insertStudent(data);
            setAverage(response.average_grades);
            setCountStudent(response.total_students);
            setShow(true);
        } catch (error) {
            console.error('Error when entering data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <PageArea>
            <PageTitle>Challenge 4 - Insert Students</PageTitle>
            {!show ? (
                <form onSubmit={handleInsertData}>
                    <label className="area">
                        <div className="area--title">Enter your name:</div>
                        <div className="area--input">
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Enter your email:</div>
                        <div className="area--input">
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Enter your grade:</div>
                        <div className="area--input">
                            <input
                                type="number"
                                name="grade"
                                value={data.grade}
                                onChange={handleInputChange}
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
                        <b>
                            Average: {average} <br />
                            Total Students: {countStudent}
                        </b>
                    </h2>
                    <Button text="Go home" route="/" />
                </>
            )}
        </PageArea>
    );
};

export default Page;
