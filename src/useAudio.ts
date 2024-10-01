import { useEffect, useRef } from 'react';
import { Audio, AudioPropType, AudioType } from 'ts-audio';

export type AudioOptions = AudioPropType;

function useAudio(options: AudioOptions) {
  const audio = useRef<AudioType | null>(null);

  useEffect(() => {
    audio.current = Audio(options);
    return () => {
      audio.current?.stop();
      audio.current = null;
    };
  }, [options]);

  return audio.current;
}

export default useAudio;
