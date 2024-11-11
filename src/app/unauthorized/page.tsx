// src/pages/unauthorized.tsx (or app/unauthorized.tsx if using the app directory structure)

import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">
          Sorry, only admins can assign tasks. If you believe you should have access to this functionality, please contact your admin to assign tasks to you.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          If you are the admin, please make sure your role is correctly set in the system.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
