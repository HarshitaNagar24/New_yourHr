import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

// create context for authentication
export const AuthContext = createContext();

// Create a provider Context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        // Function to fetch the current user from the server
        const fetchUser = async () => {
            try {
                const response = await axios.get('/user/current-user', {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                    } 
            });
            setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null); // Reset user state on error
            }
        };
        // Fetch user when component mounts
        fetchUser();
    },[]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
          {children}
        </AuthContext.Provider>
    );
}