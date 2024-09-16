'use client';

import { useRef, useEffect } from 'react'
import 'dotenv/config';
import DailyIframe from '@daily-co/daily-js';

export function LiveView({ url }: { url: string }) {
  const callFrameRef = useRef<any>(null);

  useEffect(() => {
    console.log('LiveView useEffect triggered with URL:', url);

    const createAndJoinCall = async () => {
      const container = document.getElementById('daily-video-container');
      if (!container) {
        console.error('Video container element not found');
        return;
      }

      try {
        console.log('Attempting to create DailyIframe');
        callFrameRef.current = DailyIframe.createFrame(container, {
          iframeStyle: {
            width: '100%',
            height: '100%',
            border: '0',
          },
          showLeaveButton: true,
        });

        console.log('DailyIframe created, attempting to join call');
        await callFrameRef.current.join({ url: url });
        console.log('Successfully joined call');
      } catch (error) {
        console.error('Error creating or joining DailyIframe:', error);
      }
    };

    // Delay the creation of DailyIframe to ensure the DOM is ready
    setTimeout(createAndJoinCall, 100);

    return () => {
      if (callFrameRef.current) {
        console.log('Cleaning up DailyIframe instance');
        callFrameRef.current.destroy();
      }
    };
  }, [url]);


  return (
    <div>
      <div className="flex justify-center items-center w-full">
          <p className='text-center max-w-2xl'>For demo purposes we are using the Mistral API which can lead to large latencies. You can read our blog post on how to reduce these latencies deploying a function-calling compatible model locally on Cerebrium</p>
          <p className='text-center max-w-2xl'>Demo works best when in a quiet environment</p>
        </div>
      <div className="flex justify-center items-center w-full p-4 md:p-6">
        <div className="relative w-3/4 aspect-video rounded-lg overflow-hidden" id="daily-video-container">
        </div>
      </div>
    </div>
  )
}