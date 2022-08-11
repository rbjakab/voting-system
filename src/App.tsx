import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Results from './pages/results/Results';
import Voting from './pages/voting/Voting';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/voting' element={<Voting />} />
                    <Route path='/results' element={<Results />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
