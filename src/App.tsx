import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { PublicRoutes } from './infrastructure/routes'
import { FormBuilder } from './components/FormBuilder/FormBuilder'
import { FormTester } from './components/FormTester/FormTester'
import { Home } from './components/Common/Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PublicRoutes.Home} element={<Home />}></Route>
                <Route
                    path={PublicRoutes.FormBuilder}
                    element={<FormBuilder />}
                ></Route>
                <Route
                    path={PublicRoutes.FormTester}
                    element={<FormTester />}
                ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
