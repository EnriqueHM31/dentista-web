// layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Navegacion from "@/components/Navegacion";
import Footer from "@/components/Footer";
import { SocialesProvider } from "@/provider/Sociales";

export default function PublicPages() {
    return (
        <>
            <SocialesProvider>
                <Navegacion />
                <Outlet />
                <Footer />
            </SocialesProvider>
        </>
    );
}
