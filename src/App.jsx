import { useState, useEffect } from 'react';
import Button from './components/Button';
import BoostsModal from './components/BoostsModal';
import GainFeed from './components/GainFeed';
import DvdLogo from './components/visuals/DvdLogo';
import ProgressBar from './components/visuals/ProgressBar';
import VideoVisual from './components/visuals/VideoVisual';
import ToastMessage from './components/ToastMessage';
import useGameTick from './hooks/useGameTick';
import { BOOSTS } from './data/boosts';
import { getRandomPokemonFact } from './data/pokemonFacts';
import './App.css';

function App() {
  // main variables, count for points
  const [count, setCount] = useState(0);
  // ticking boolean flag to start the game
  const [ticking, setTicking] = useState(false);
  // start boolean flag
  const [started, setStarted] = useState(false);
  // boosts is the array of objects of boosts
  const [boosts, setBoosts] = useState(BOOSTS.map((b) => ({ ...b, bought: false })));
  // toast messages
  const [toastMessage, setToastMessage] = useState(null);
  // pokemonFact
  const [seenPokemonFacts, setSeenPokemonFacts] = useState([]);
  // multiplier is the main changer of points
  const multiplier = Math.max(1, ...boosts.filter((b) => b.bought && b.type === 'multiplier').map((b) => b.factor));
  // gain formula
  const gain = 1 * multiplier;

  // game start and core game
  useGameTick({
    ticking,
    gain,
    onTick: (value) => {
      setCount((c) => c + value);
    },
  });

  // buy function
  function buyBoost(id) {
    const boost = boosts.find((b) => b.id === id);
    if (!boost || boost.bought || count < boost.cost) return;

    setCount((c) => c - boost.cost);

    // if boost is video and is on screen
    if (boost.type === 'video' && boost.position) {
      setBoosts((bs) =>
        bs.map((b) => {
          // bought = true
          if (b.id === id) return { ...b, bought: true };
          // if another video but same position, bought = false
          if (b.type === 'video' && b.position === boost.position && b.bought) {
            return { ...b, bought: false };
          }
          return b;
        })
      );
    } else {
      // random pokemon fact
      if (id != 'random pokemon fact') {
        setBoosts((bs) => bs.map((b) => (b.id === id ? { ...b, bought: true } : b)));
      }
    }

    // if message
    if (boost.type === 'message') {
      if (boost.getMessage) {
        const messageData = boost.getMessage({
          getPokemonFact: () => {
            const fact = getRandomPokemonFact(seenPokemonFacts);
            setSeenPokemonFacts((prev) => [...prev, fact.id]);
            return fact;
          },
        });
        setToastMessage(messageData);
      } else if (boost.message) {
        setToastMessage({
          text: boost.message,
        });
      }
    }
  }

  // check if a boost is already unlocked
  function isUnlocked(boost) {
    if (!boost.requires) return true;

    return boosts.find((b) => b.id === boost.requires)?.bought;
  }

  // never ending wip ui
  return (
    <>
      {/* main button */}
      <div className="hud">
        <GainFeed active={started} gain={gain} ticking={ticking} />
      </div>
      <div className="card">
        <Button
          onClick={(e) => {
            e.currentTarget.blur();
            setTicking(true);
            setStarted(true);
            setCount((c) => c + gain);
          }}>
          {started ? count : 'click me'}
        </Button>
      </div>

      {/* boosts/perks modals */}
      {started && <BoostsModal boosts={boosts} count={count} onBuy={buyBoost} isUnlocked={isUnlocked} />}

      {boosts.some((b) => b.id === 'DVD' && b.bought) && (
        <DvdLogo
          onGain={(value) => {
            setCount((c) => c + value);
            // +1 bounce event
            window.dispatchEvent(
              new CustomEvent('GAIN_MESSAGE', {
                detail: {
                  value,
                  type: 'dvd',
                },
              })
            );
          }}
        />
      )}
      {boosts.some((b) => b.id === 'progress bar' && b.bought) && (
        <ProgressBar
          onGain={(value) => {
            setCount((c) => c + value);
          }}
        />
      )}

      {/* videos */}
      {(() => {
        const boughtVideos = boosts.filter((b) => b.bought && b.type === 'video');
        const videosByPosition = {};

        // last video bought
        boughtVideos.forEach((boost) => {
          videosByPosition[boost.position] = boost;
        });

        // transform videosByPosition to a new object
        return Object.values(videosByPosition).map((boost) => <VideoVisual key={boost.id} videoFile={boost.videoFile} title={boost.id} position={boost.position} />);
      })()}

      {/* toast messages */}
      {toastMessage && <ToastMessage message={toastMessage.text} onClose={() => setToastMessage(null)} />}
    </>
  );
}

export default App;
