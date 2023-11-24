import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SubmitForm from './pages/SubmitForm';
import ReturnName from './pages/ReturnName';
import RequestReturnName from './pages/RequestReturnName';
import FullSpeed from './pages/FullSpeed';
import TextLines from './pages/TextLines';
import InsertStudent from './pages/InsertStudent';
import InsertStudentsList from './pages/InsertStudentsList';

const routes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/challenge1" element={<SubmitForm />} />
            <Route path="/challenge2" element={<ReturnName />} />
            <Route path="/challenge3" element={<InsertStudentsList />} />
            <Route path="/challenge4" element={<InsertStudent />} />
            <Route path="/challenge5" element={<RequestReturnName />} />
            <Route path="/challenge6" element={<FullSpeed />} />
            <Route path="/challenge7" element={<TextLines />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default routes;
