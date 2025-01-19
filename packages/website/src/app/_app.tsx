import { AppProps } from "next/app"; // Importing the AppProps type from Next.js
import { ToastProvider } from "@radix-ui/react-toast";
import { JSX } from "react";

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ToastProvider swipeDirection="right">
      <Component {...pageProps} />
      <ToastViewport />
    </ToastProvider>
  );
}

// ToastViewport Component for consistent placement
function ToastViewport(): JSX.Element {
  return <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" />;
}
