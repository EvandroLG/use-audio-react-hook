import { renderHook } from '@testing-library/react';
import useAudio, { AudioOptions } from './useAudio';
import { Audio } from 'ts-audio';

jest.mock('ts-audio', () => {
  return {
    Audio: jest.fn(() => ({
      play: jest.fn(),
      pause: jest.fn(),
      stop: jest.fn(),
    })),
  };
});

describe('useAudio', () => {
  const defaultOptions: AudioOptions = {
    file: 'test-audio.mp3',
    volume: 1,
    loop: false,
    autoPlay: false,
    preload: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates an audio object with the given options', () => {
    renderHook(() => useAudio(defaultOptions));
    expect(Audio).toHaveBeenCalledWith(defaultOptions);
  });

  test("plays the audio object when the 'play' method is called", () => {
    const { result } = renderHook(() => useAudio(defaultOptions));
    const playSpy = jest.spyOn(result.current, 'play');
    result.current.play();
    expect(playSpy).toHaveBeenCalled();
  });

  test("pauses the audio object when the 'pause' method is called", () => {
    const { result } = renderHook(() => useAudio(defaultOptions));
    const pauseSpy = jest.spyOn(result.current, 'pause');
    result.current.pause();
    expect(pauseSpy).toHaveBeenCalled();
  });

  test("stops the audio object when the 'stop' method is called", () => {
    const { result } = renderHook(() => useAudio(defaultOptions));
    const stopSpy = jest.spyOn(result.current, 'stop');
    result.current.stop();
    expect(stopSpy).toHaveBeenCalled();
  });

  test('updates the audio object when the options change', () => {
    const { rerender } = renderHook(
      (options: AudioOptions) => useAudio(options),
      { initialProps: defaultOptions }
    );

    const newOptions = { ...defaultOptions, volume: 0.5 };
    rerender(newOptions);

    expect(Audio).toHaveBeenCalledWith(newOptions);
  });

  test('cleans up the audio object when the hook is unmounted', () => {
    const { unmount } = renderHook(() => useAudio(defaultOptions));

    // Get the last instance of the Audio mock
    const mockAudioInstance = (Audio as jest.Mock).mock.results[
      (Audio as jest.Mock).mock.results.length - 1
    ].value;

    unmount();
    expect(mockAudioInstance.stop).toHaveBeenCalled();
  });
});
