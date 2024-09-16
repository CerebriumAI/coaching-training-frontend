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
    <div className="w-full">
      <div className="flex flex-col justify-center items-center w-full gap-4">
          <p className='text-center max-w-2xl'>To reduce demo latencies considerably, you can read our <a href='www.cerebrium.ai/blog/how-to-build-a-real-time-ai-avatar-for-training-and-coaching' target="_blank">blog post</a> deploying a function-calling compatible model on Cerebrium</p>
          <p className='text-center max-w-2xl'>Demo works best when in a quiet environment</p>
        </div>
      <div className="flex justify-center items-center w-full p-4 md:p-6">
        <div className="relative w-3/4 aspect-video rounded-lg overflow-hidden mx-auto" id="daily-video-container">
        </div>
      </div>
    </div>
  )
}