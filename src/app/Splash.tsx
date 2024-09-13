import React, { useState} from "react";
import { Book, Rocket, Loader2 } from "lucide-react";

import CerebriumLogo from "@/app/assets/logos/cerebrium.png";
import TavusLogo from "@/app/assets/logos/tavus.svg";
import CartesiaLogo from "@/app/assets/logos/cartesia.svg"
import MistralLogo from "@/app/assets/logos/mistral.png"

import { Button } from "@/components/ui/button";

type SplashProps = {
  handleReady: (url: string) => void;
};

const Splash: React.FC<SplashProps> = ({ handleReady }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDemoType, setSelectedDemoType] = useState<string>("sales-training");



  const fetchStreamUrl = () => {
    handleReady("testing");

    // setIsLoading(true);
    // fetch(`${process.env.NEXT_PUBLIC_CEREBRIUM_URL}/create_room`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CEREBRIUM_AUTH_TOKEN}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({})
    // })
    //   .then(async response => {
    //     if (response.status === 200) {
    //       const data = await response.json();
    //       handleReady(data.result.url);
    //     } else {
    //       throw new Error('Failed to fetch stream URL');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching stream URL:', error);
    //     setError("We are at capacity at the moment. Please try again later!");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

  };

  return (
    <main className="w-full h-full flex items-center justify-center bg-primary-200 p-4 bg-[length:auto_50%] lg:bg-auto bg-colorWash bg-no-repeat bg-right-top">
      <div className="flex flex-col gap-8 lg:gap-12 items-center max-w-full lg:max-w-3xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-balance text-center">Train and onboard employees seamlessly
        </h1>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-primary-400">Brought to you by:</span>
          <div className="flex flex-row gap-6 bg-white rounded-full py-4 px-8 items-center">
            <a href="https://www.cerebrium.ai/" target="_blank">
              <img
                src={CerebriumLogo.src}
                alt="Cerebrium.ai"
                className="max-h-[22px]"
              />
            </a>
            <a href="https://tavus.io/" target="_blank">
              <img src={TavusLogo.src} alt="Tavus" className="max-h-[22px]" />
            </a>
            <a href="https://cartesia.ai/" target="_blank">
              <img src={CartesiaLogo.src} alt="Cartesia" className="max-h-[22px]" />
            </a>
            <a href="https://mistral.ai/" target="_blank">
              <img src={MistralLogo.src} alt="Mistral" className="max-h-[22px]" />
            </a>
          </div>
        </div>

        <div className="max-w-full lg:max-w-2xl flex flex-col gap-6 text-center">
          <p className="lg:text-lg text-primary-600">
            Generative AI unlocks many use cases for us to respond to questions and situations dynamically very intelligently
            but there are many scenarios where a text based solution is not suitable.

            What if we could could create realistic, human-like situations in order to train and onboard teams to perform better
            - recreating real life scenerios?
          </p>
          <p className="lg:text-lg text-primary-600">
          In this demo, you can chose whether you would like to be interviewed or taught to be better at sales all achieved through Carter - our assistant. 
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-semibold">Pick simulation</h3>
      <div className="flex flex-row gap-6">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="sales-training"
            name="demo-type"
            value="sales-training"
            className="form-radio h-4 w-4 text-purple-600"
            checked={selectedDemoType === "sales-training"}
            onChange={(e) => setSelectedDemoType(e.target.value)}
          />
          <label htmlFor="sales-training" className="text-sm font-medium text-gray-700">
            Sales Training
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="interview-prep"
            name="demo-type"
            value="interview-prep"
            className="form-radio h-4 w-4 text-purple-600"
            checked={selectedDemoType === "interview-prep"}
            onChange={(e) => setSelectedDemoType(e.target.value)}
          />
          <label htmlFor="interview-prep" className="text-sm font-medium text-gray-700">
            Interview Prep
          </label>
        </div>
      </div>
        </div>

        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </Button>
        ) : (
          <Button onClick={fetchStreamUrl}>Start Demo</Button>
        )}
        {error && (
          <div className="text-red-500 mb-4">
            Error: {error}
          </div>
        )}

        <div className="h-[1px] bg-primary-300 w-full" />

        <footer className="flex flex-col lg:flex-row lg:gap-2">
          <Button asChild className="text-purple-600 hover:text-purple-700 bg-transparent">
        <a
              href="https://github.com/CerebriumAI/examples/tree/master/27-ecommerce-live-stream"
            >
              <Book className="size-6" />
              View source code
            </a>
          </Button>
          <Button asChild className="text-purple-600 hover:text-purple-700 bg-transparent">
            <a
              href="https://www.cerebrium.ai/blog/building-a-real-time-shopping-assistant-turn-live-video-into-instant-purchases"
            >
              <Rocket className="size-6" />
              Deploy your own
            </a>
          </Button>
        </footer>
      </div>
    </main>
  );
};

export default Splash;
