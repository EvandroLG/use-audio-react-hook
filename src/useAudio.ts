import { useEffect, useMemo, useRef } from 'react';
import { Audio, AudioPropType, AudioType } from 'ts-audio';

export type AudioOptions = AudioPropType;

/**
 * Custom React hook for managing audio playback.
 * This hook is implemented on top of the ts-audio library.
 *
 * @param {AudioOptions} options - Configuration options for the audio instance.
 * @param {string} options.file - The URL of the audio file to be played.
 * @param {number} [options.volume=1] - The volume level of the audio (0.0 to 1.0).
 * @param {boolean} [options.loop=false] - Whether the audio should loop when it finishes playing.
 * @param {boolean} [options.autoPlay=false] - Automatically play the audio when the component is mounted.
 * @param {string} [options.preload=false] - If `true`, preload the audio file when the component is mounted.
 *
 * @returns {AudioType} An object with methods and properties to control the audio playback.
 * @returns {Function} play - Function to start audio playback.
 * @returns {Function} pause - Function to pause the audio playback.
 * @returns {Function} stop - Function to stop the audio and reset its position.
 * @returns {Function} toggle - Function to toggle between play and pause.
 * @returns {Function} on - Function to add event listeners for audio events.
 * @returns {number} volume - Current volume level of the audio.
 * @returns {boolean} loop - Indicates whether the audio is set to loop.
 * @returns {AudioContextState} state - Current state of the AudioContext.
 * @returns {AudioContext} [audioCtx] - The underlying AudioContext object (if available).
 */
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
