import { useState, createContext, useContext } from "react"; 

//create context
const AuthContext = createContext(); 

//create a provider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({user:null, token:"", refreshToken:""});

    return(
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider}