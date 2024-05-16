import { FormEvent, useState } from 'react';
import LabeledElement from './LabeledElement';
import { Puzzle } from '../utils/puzzle';
import styles from './Play.module.css';
import PuzzleSelector from './PuzzleSelector';

function Play({ puzzles }: { puzzles: Puzzle[] }) {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [challenger, setChallenger] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const bot = new Worker(new URL('../utils/bot', import.meta.url));
    bot.postMessage({ puzzle, challenger, username, password });

    bot.onmessage = (e: MessageEvent) => {
      // TODO: Decide on message format and handle messages sent from the WebWorker
    };
    bot.onerror = (e: ErrorEvent) => {
      console.error(e);
    };

    setLoggedIn(false);
  }

  return (
    <div className={styles.Play}>
      <PuzzleSelector puzzles={puzzles} onSelect={p => setPuzzle(p)} />
      <form onSubmit={handleSubmit}>
        <LabeledElement label="Username">
          <input id="play-username" value={username} placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
        </LabeledElement>
        <LabeledElement label="Password">
          <input id="play-password" value={password} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        </LabeledElement>
        <LabeledElement label="Challenger Username" description="The username of the Pokemon Showdown account to challenge.">
          <input id="play-challenger" value={challenger} placeholder="Username" required onChange={(e) => setChallenger(e.target.value)} />
        </LabeledElement>
        <input type="submit" value="Log in" disabled={!loggedIn || puzzle === undefined} />
      </form>
    </div>
  );
}

export default Play;
