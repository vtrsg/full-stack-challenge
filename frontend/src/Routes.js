import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SubmitForm from './pages/SubmitForm';

const routes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/challenge1" element={<SubmitForm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default routes;
