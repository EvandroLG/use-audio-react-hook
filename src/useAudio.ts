import { useEffect, useMemo, useRef } from 'react';
import { Audio, AudioPropType, AudioType } from 'ts-audio';

export type AudioOptions = AudioPropType;

function useAudio(options: AudioOptions): AudioType {
  const audio = useRef<AudioType | null>(Audio(options));
  const memoizedOptions = useMemo(
    () => options,
    [
      options.file,
      options.volume,
      options.loop,
      options.autoPlay,
      options.preload,
    ]
  );

  useEffect(() => {
    audio.current = Audio(memoizedOptions);

    return () => {
      audio.current?.stop();
      audio.current = null;
    };
  }, [memoizedOptions]);

  if (!audio.current) {
    audio.current = Audio(options);
  }

  return audio.current;
}

export default useAudio;
