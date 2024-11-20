import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary text-white w-full h-screen p-3 py-4 flex items-start justify-center">
        {children}
      </body>
    </html>
  );
}
