# use-audio-hook &middot; [![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

`use-audio-hook` is a lightweight React hook for managing audio playback in your React applications.
It simplifies audio control by providing a simple API to play, pause, stop, and loop audio files.

This hook is built on top of the [ts-audio](https://github.com/EvandroLG/ts-audio) library.

## Features

- Easily play, pause, stop and toogle audio playback.
- Customize playback with options like volume, loop, autoPlay, and preload.
- Simple API for integrating audio into any React project.
- Supports different audio formats (mp3, ogg, wav, etc.).
- Supports TypeScript for better type safety.

## Installation

```bash
npm install use-audio-hook
```

## Usage

```jsx
import React from 'react';
import useAudio from 'react-audio-hooks';

const MyComponent = () => {
  const audio = useAudio({
    file: '/path/to/audio/file.mp3',
    volume: 0.5,
    loop: true,
    autoPlay: false,
    preload: 'auto',
  });

  return (
    <div>
      <button onClick={audio.play}>Play</button>
      <button onClick={audio.pause}>Pause</button>
      <button onClick={audio.stop}>Stop</button>
      <button onClick={audio.toggle}>Toggle</button>
    </div>
  );
};

export default MyComponent;
```

## API

### `useAudio(options)`

#### `options` (object)

- `file`: (string) The path to the audio file.
- `volume`: (number) The audio volume level (0.0 to 1.0).
- `loop`: (boolean) Whether to loop the audio or not.
- `autoPlay`: (boolean) Automatically play the audio when initialized.
- `preload`: (boolean) Preload the audio file if true, or not if false.

#### `AudioType` (returned object)

- `play()`: Starts the audio playback.
- `pause()`: Pauses the audio playback.
- `stop()`: Stops the audio playback and resets its position.
- `toggle()`: Toggles between play and pause.
- `on(eventType: AudioEventType, callback)`: Adds an event listener to monitor audio events (e.g., `'play'`, `'pause'`).
  - `eventType`: The type of audio event to listen for.
  - `callback`: Function to execute when the event occurs. Receives an event parameter.
- `volume`: (number) The current volume of the audio.
- `loop`: (boolean) Indicates if the audio is looping.
- `state`: (string) The current state of the `AudioContext` (e.g., `'suspended'`, `'running'`).
- `audioCtx?`: (AudioContext) The underlying `AudioContext` object, if available.”

## LICENSE

[MIT](./LICENSE)
