'use client'

import { LiveView } from "@/components/LiveView";
import Splash from "./Splash";
import { useState } from "react";
import Header from "../components/ui/header";
const showSplashPage = process.env.NEXT_PUBLIC_SHOW_SPLASH;


export default function Home() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  
  

  if (showSplash && streamUrl === null) {
    return <Splash handleReady={(url) => setStreamUrl(url)} />;
  }


  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="text-center mb-8">
      </div>
      {streamUrl && <LiveView url={streamUrl} />}
    </main>
  );
}
