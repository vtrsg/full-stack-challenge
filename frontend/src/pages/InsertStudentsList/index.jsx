import React, { useState } from 'react';
import Button from '../../components/partials/Button';
import { PageArea } from './styled';
import PageTitle from '../../components/PageTitle';

const Page = () => {
    const [students, setStudents] = useState(
        '[{"name": "", "email": "", "grade": 0}]'
    );
    const [average, setAverage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const parsedAlunos = JSON.parse(students);
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedAlunos),
            });

            const data = await response.json();
            setAverage(data.average_grades);
            setError(null);
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
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={10}
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
                    placeholder="Insert the list of students in JSON format..."
                />
                <Button text="Submit" type="submit" />
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {average !== null && <p>Average grade: {average}</p>}
        </PageArea>
    );
};

export default Page;
