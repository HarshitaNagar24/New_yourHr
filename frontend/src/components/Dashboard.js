import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard({user}) {
    const [users , setUsers] = useState([]);
    console.log(user)

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const res = await axios.get('/admin/resumes',{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }});
                    setUsers(res.data);
            } catch (error) {
                console.error(error.response.data);  
            }
        };
        if (user && user.role === 'ADMIN') {
            fetchUser();
        }
    },[user]);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">User Resumes</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-600">Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">{user.name}</td>
                                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">{user.email}</td>
                                <td className="py-3 px-4 border-b border-gray-300 text-sm text-gray-700">
                                    {user.resume ? (
                                        <a href={`http://localhost:8000/${user.resume}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a>
                                    ) : (
                                        <span className="text-gray-500">No resume uploaded</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default Dashboard