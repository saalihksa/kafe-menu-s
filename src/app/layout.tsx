import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cappadocia Coffee & Bakery",
  description: "Doğal malzemeler ve özel kahvelerle hazırlanan eşsiz lezzetler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased bg-[var(--background)] font-sans overflow-x-hidden w-full`}
      >
        {children}
        {/* Fixed Instagram Icon */}
        <a 
          href="https://www.instagram.com/cappadociacoffeebakery/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[var(--accent)] hover:bg-[var(--primary)] transition-colors duration-300 flex items-center justify-center text-white shadow-lg hover:scale-110 transform transition-transform"
        >
          <i className="fab fa-instagram text-2xl"></i>
        </a>
      </body>
    </html>
  );
}
