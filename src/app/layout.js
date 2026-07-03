import { Rozha_One, Poppins } from "next/font/google";
import "./globals.css";

const rozhaOne = Rozha_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-rozha",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "श्री गणेशोत्सव २०२६ निमंत्रण | बर्गे कुटुंब",
  description: "सस्नेह निमंत्रण! आमच्याकडे यावर्षी लाडक्या गणपती बाप्पांचे आगमन होत आहे. सहकुटुंब दर्शनासाठी आणि महाप्रसादाचा लाभ घेण्यासाठी यावे ही नम्र विनंती.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="mr" className={`${rozhaOne.variable} ${poppins.variable}`}>
      <head>
        {/* Preload critical visual assets */}
        <link rel="preload" href="/ganesha-main.png" as="image" />
        <link rel="preload" href="/map_placeholder.png" as="image" />
        <link rel="preload" href="/invitation_bg.png" as="image" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
