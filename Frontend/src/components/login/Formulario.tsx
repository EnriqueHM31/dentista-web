import { AiOutlineDingtalk } from "react-icons/ai";
import { toast } from "sonner";

export default function Formulario() {

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const { username, password } = Object.fromEntries(data);

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include", // ✅ importante para recibir cookies httpOnly
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Inicio de sesión exitoso");

            } else {
                toast.error(result.message || "Error al iniciar sesión");
            }
        } catch (error) {
            toast.error("Error de conexión con el servidor" + error + username + password);
        }
    }

    return (
        <div className="bg-transparent">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-[480px] w-full">
                    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <AiOutlineDingtalk className="text-7xl text-primary mx-auto mb-5" />
                        <h1 className="text-slate-900 text-center text-3xl font-semibold">
                            Iniciar Sesión
                        </h1>

                        <form className="mt-12 space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username" className="text-slate-900 text-sm font-medium mb-2 block">
                                    Nombre de usuario
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="username"
                                        type="text"
                                        required
                                        id="username"
                                        className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                        placeholder="Nombre de usuario"
                                        autoComplete="on"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-slate-900 text-sm font-medium mb-2 block" htmlFor="password">
                                    Contraseña
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        id="password"
                                        required
                                        className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                                        placeholder="Contraseña"
                                        autoComplete="on"
                                    />
                                </div>
                            </div>

                            <div className="mt-12">
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none cursor-pointer"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
