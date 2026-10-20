import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import FloatingCTA from './components/FloatingCTA';
import Hero from './sections/Hero';
import Story from './sections/Story';
import Services from './sections/Services';
import Operation from './sections/Operation';
import Process from './sections/Process';
import Imports from './sections/Imports';
import Tools from './sections/Tools';
import Coverage from './sections/Coverage';
import About from './sections/About';
import Contact from './sections/Contact';
import Final from './sections/Final';

export default function App() {
  const [track, setTrack] = useState({ code: '', nonce: 0 });

  const onTrack = (code: string) => {
    setTrack((t) => ({ code, nonce: t.nonce + 1 }));
    document.getElementById('herramientas')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero onTrack={onTrack} />
        <Story />
        <Services />
        <Operation />
        <Process />
        <Imports />
        <Tools trackCode={track.code} nonce={track.nonce} />
        <Coverage />
        <About />
        <Contact />
        <Final />
      </main>
      <FloatingCTA />
    </>
  );
}
