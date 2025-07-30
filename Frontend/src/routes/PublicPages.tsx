// layouts/PublicLayout.tsx
import Footer from "@/components/Footer";
import Navegacion from "@/components/Navegacion";
import { SocialesProvider } from "@/provider/Sociales";
import { Outlet } from "react-router-dom";

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
