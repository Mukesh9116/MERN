// import { useAuth } from "../store/auth";  

// export const About = () => {
//   const { user } = useAuth() || {};        

//   const str = user?.username || "";        

//   return (
//     <>
//       <p>Hi {str}</p>
//       <h1>Welcome to About page.</h1>
//     </>
//   );
// };

import { useAuth } from "../store/auth";

export const About = () => {
  const { user } = useAuth() || {};
  const str = user?.username || "";

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center text-white"
      style={{
        background: "linear-gradient(90deg, #0700b8 0%, #00ff88 100%)",
      }}
    >
      {/* Greeting */}
      <p className="text-lg mb-2">
        Hi <span className="font-semibold text-yellow-300">{str}</span>
      </p>

      {/* Heading (normal white text, not gradient) */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
        I am a Full-Stack MERN Developer
      </h1>

      {/* Short Paragraphs */}
      <div className="max-w-2xl space-y-4 text-gray-100">
        <p>
          I specialize in building dynamic, responsive, and user-friendly web applications using the{" "}
          <span className="font-medium text-yellow-200">MERN stack</span> — MongoDB, Express.js, React, and Node.js.
        </p>
        <p>
          My focus is on creating seamless user experiences with clean code, modern design practices, and scalable backend systems.
        </p>
        <p>
          I enjoy transforming ideas into real-world applications that solve problems and bring value to users.
        </p>
      </div>
    </section>
  );
};



