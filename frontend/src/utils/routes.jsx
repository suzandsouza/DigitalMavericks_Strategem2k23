import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import App from "../App"
import PatientRegistrationFrom from "../components/Patient/PatientRegistrationFrom"
export const routers= [
    {
        path:"/",
        element:<App/>,
        children : [
            {
                index : true,
                element : <Home />
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
            }
            
        ]
    }
]