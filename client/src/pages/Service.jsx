import { useAuth } from "../store/auth";

export const Service = () => {
  const { services } = useAuth();
  console.log(services);

  return (
    <section
      className="min-h-screen px-6 py-12"
      style={{
        background: "linear-gradient(90deg, #0700b8 0%, #00ff88 100%)",
      }}
    >
      {/* Heading */}
      <div className="container text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Services
        </h1>
      </div>

      {/* Services Grid */}
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        {services && services.length > 0 ? (
          services.map((curEle, idx) => (
            <div
              key={idx}
              className="service-card bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <h2 className="font-bold text-xl text-yellow-300 mb-2">
                {curEle.service}
              </h2>
              <p className="text-gray-100 mb-3">{curEle.description}</p>
              <p className="text-cyan-200 font-medium mb-1">
                💲 Price: ${curEle.price}
              </p>
              <p className="text-green-300">👨‍💻 Provider: {curEle.provider}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-200 text-center text-lg">
            No services available
          </p>
        )}
      </div>
    </section>
  );
};
