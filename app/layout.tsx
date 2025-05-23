import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import AuthSessionProvider from "@/components/layout/AuthSessionProvider";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "@assets/styles/global.css";
import "react-toastify/dist/ReactToastify.css"; // Important: import styles!
import { AppProvider } from "@/app/context/AppContext";

export const metadata: Metadata = {
  title: "Find Your Dream Property | PropertyFinder",
  description:
    "Explore a wide range of properties for rent and sale. Your one-stop platform for finding your perfect home or investment property.",
  keywords: [
    "property",
    "real estate",
    "buy property",
    "rent property",
    "houses for sale",
    "apartments for rent",
  ],
  authors: [{ name: "Syed Shahzaib Haider", url: "" }],
  openGraph: {
    title: "Find Your Dream Property | PropertyFinder",
    description:
      "Explore a wide range of properties for rent and sale. Your one-stop platform for finding your perfect home or investment property.",
    url: "",
    siteName: "PropertyFinder",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "PropertyFinder OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Dream Property | PropertyFinder",
    description:
      "Explore a wide range of properties for rent and sale. Your one-stop platform for finding your perfect home or investment property.",
    images: [""],
    creator: "@shahzaib1136",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthSessionProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <AppProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </AppProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </AuthSessionProvider>
  );
};

export default RootLayout;
