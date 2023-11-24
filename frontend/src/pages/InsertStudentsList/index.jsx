import React, { useState } from 'react';
import Button from '../../components/partials/Button';
import { PageArea } from './styled';
import PageTitle from '../../components/PageTitle';
import { insertStudent } from '../../services/api';

const Page = () => {
    const [students, setStudents] = useState(
        '[{"name": "", "email": "", "grade": 0}]'
    );
    const [average, setAverage] = useState(null);
    const [countStudent, setCountStudent] = useState(0);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const parsedStudents = JSON.parse(students);
            const response = await insertStudent(parsedStudents);
            setCountStudent(response.total_students);
            setAverage(response.average_grades);
            setError(null);
            setShow(true);
        } catch (error) {
            console.error('Error sending list of students:', error);
            setError(
                'Invalid data format. Please make sure to enter a valid JSON array of students.'
            );
        }
    };

    return (
        <PageArea>
            <PageTitle>Challenge 3 - Insert Student List</PageTitle>
            {!show ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        rows={10}
                        value={students}
                        onChange={(e) => setStudents(e.target.value)}
                        placeholder="Insert the list of students in JSON format..."
                    />
                    <Button text="Submit" type="submit" />
                </form>
            ) : (
                <>
                    <h3>
                        <b>
                            Average: {average} <br />
                            Total Students: {countStudent}
                        </b>
                    </h3>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button text="Go home" route="/" />
                </>
            )}
        </PageArea>
    );
};

export default Page;
