import React from 'react';
import { useLocation } from 'react-router-dom';

const FakeHomePage = () => {
    const location = useLocation();
    const data = location.state.params;
  
    console.log(data);

    return (
        <div>
            <h1>Fake Home Page</h1>
            <p>Data received: {data}</p>
        </div>
    );
}

export default FakeHomePage;
