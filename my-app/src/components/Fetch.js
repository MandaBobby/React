import React, { useState, useEffect } from 'react';

const Fetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const todos = await response.json();
                setData(todos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Fetch;
