import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import App from "../App"
import AuthPatient from "../components/Patient/AuthPatient"
import PatientRegistrationFrom from "../components/Patient/PatientRegistrationFrom"
import LandingPage from "../components/LandingPage"
export const routers= [
    {
        path:"/",
        element:<App/>,
        children : [
            {
                index : true,
                element : <LandingPage />
            },
            {
                path  : "/login",
                element : <Login/>
            },
            {
                path : "/signup",
                element : <Signup/>
            },
            {
                path : "/appointment",
                element : <PatientRegistrationFrom/>
            },
            {
                path : `/auth/:name`,
                element : <AuthPatient/>
            },
            {
                path : `/dashboard`,
                element : <Home/>
            }
            
            
        ]
    }
]