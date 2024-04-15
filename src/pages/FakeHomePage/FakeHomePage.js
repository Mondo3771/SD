import React from 'react';
import { useParams } from 'react-router-dom';

const FakeHomePage = () => {
    const { data } = useParams();
    console.log(data);

    return (
        <div>
            <h1>Fake Home Page</h1>
            <p>Data received: {data}</p>
        </div>
    );
}

export default FakeHomePage;
