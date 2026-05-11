import GuestNavbar from "./components/GuestNavbar";
import GuestHero from "./components/GuestHero";
import GuestAbout from "./components/GuestAbout";
import GuestProduct from "./components/GuestProduct";
import GuestTestimonial from "./components/GuestTestimonial";
import GuestFooter from "./components/GuestFooter";

export default function GuestPage() {
  return (
    <div className="font-sans" style={{ background: "#f8f9fa", color: "#1a1a2e" }}>
      <GuestNavbar />
      <GuestHero />
      <GuestAbout />
      <GuestProduct />
      <GuestTestimonial />
      <GuestFooter />
    </div>
  );
}