import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { Header } from "./components/Header";
import { StorefrontPage } from "./pages/StorefrontPage";
import { WishlistPage } from "./pages/WishlistPage";

export default function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(53,80,122,0.14),_transparent_30%),linear-gradient(135deg,_#f8f5ee_0%,_#faf9f6_50%,_#f3efe8_100%)] text-ink">
          <Header />
          <main className="pb-16">
            <Routes>
              <Route path="/" element={<StorefrontPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </WishlistProvider>
  );
}
