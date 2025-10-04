// export const Error = () =>{
//     return <h1>Page Not Found</h1>
// }

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-center p-6">
      {/* Animated heading */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-6xl font-extrabold text-red-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-2xl font-semibold text-gray-800"
      >
        Page Not Found
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 text-gray-600"
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
        <Link
          to="/register"
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Report Problem
        </Link>
      </motion.div>
    </div>
  );
};

