import Navbar from "@/components/wrapper/navbar";
import Footer from "@/components/wrapper/footer";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
         <Navbar />
        {children}
        <Footer />
        </>
    );
}
