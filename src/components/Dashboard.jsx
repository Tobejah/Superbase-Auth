import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { session, signOut } = UserAuth();
    const navigate = useNavigate();
    
    console.log(session);

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <p
              onClick={handleSignOut}
              className="hover:cursor-pointer border inline-block px-4 py-3 mt-4"
            >
                Sign Out
            </p>
        </div>
    );
};

export default Dashboard;
