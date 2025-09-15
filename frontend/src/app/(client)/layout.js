import Footer from "@/components/footer";
import Header from "@/components/header";

export default function CLientLayout({ children }) {
  return (
    <div>
      <div className="fixed top-2 inset-x-[4%] md:inset-x-[3%] z-50">
        <Header />
      </div>
      <div className="w-full h-18 lg:h-20 block" />
      <main className="px-[4%] md:px-[3%]">{children}</main>
      <div className="px-[2%] md:px-[2.5%] pb-4">
        <Footer />
      </div>
    </div>
  );
}
