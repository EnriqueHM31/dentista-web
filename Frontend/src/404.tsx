import { useNavigate } from 'react-router-dom';

export default function Error404() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    // Create an array to render 30 stars
    const stars = Array.from({ length: 30 });

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center">
            {/* Stars */}
            {stars.map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-full opacity-75 animate-twinkle"
                    style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            {/* Main Content */}
            <div className="relative z-10 text-center p-4">
                <h1 className="text-9xl font-bold mb-4">404</h1>
                <p className="text-3xl mb-6">¡Vaya! Parece que te has perdido en el espacio...</p>
                <button
                    onClick={handleGoHome}
                    className="px-6 cursor-pointer py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition text-xl"
                >
                    Volver al inicio
                </button>
            </div>

            {/* Rocket Astronaut */}
            <img
                src="https://imgs.search.brave.com/q1zLMeHklq78_Ukx0z9HdNSx72AqeFpIMChOV14qu0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MjU4LzY4MS9zbWFs/bC9jYXJ0b29uLXRv/b3RoLXdpdGgtYS1z/bWlsZS1zdGlja2Vy/LWRlc2lnbi1wbmcu/cG5n"
                alt="Astronauta en cohete"
                className="absolute bottom-10 right-10 md:w-50 xl:w-60  animate-fly"
            />

            <img
                src="https://imgs.search.brave.com/q1zLMeHklq78_Ukx0z9HdNSx72AqeFpIMChOV14qu0k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTIv/MjU4LzY4MS9zbWFs/bC9jYXJ0b29uLXRv/b3RoLXdpdGgtYS1z/bWlsZS1zdGlja2Vy/LWRlc2lnbi1wbmcu/cG5n"
                alt="Astronauta en cohete"
                className="absolute bottom-10 left-10 md:w-50 xl:w-60  animate-fly-invertido"
            />

            {/* Styles */}
            <style >{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-iteration-count: infinite;
        }
        @keyframes fly {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(-80px,-150px) rotate(-15deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }

        @keyframes fly-invertido {
                0% { transform: translate(0,0) rotate(0deg); }
                50% { transform: translate(80px,-150px) rotate(15deg); }
                100% { transform: translate(0,0) rotate(0deg); }
            }
        .animate-fly {
          animation: fly 6s ease-in-out infinite;
        }

        .animate-fly-invertido {
            animation: fly-invertido 6s ease-in-out infinite;
        }
        
      `}</style>
        </div>
    );
}
