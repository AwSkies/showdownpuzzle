import { FormEvent, useState } from 'react';
import LabeledElement from './LabeledElement';
import { PUZZLE_DEFAULTS } from '../utils/puzzle';
import styles from './Play.module.css';

function Play() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [challenger, setChallenger] = useState('');
  const [canLogin, setCanLogin] = useState(true);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const bot = new Worker(new URL('../utils/bot', import.meta.url));
    bot.postMessage({ username, password, challenger });

    bot.onmessage = (e: MessageEvent) => {
      // TODO: Handle messages sent from the WebWorker
    };
    bot.onerror = (e: ErrorEvent) => {
      console.error(e);
    };

    setCanLogin(false);
  }

  return (
    <div className={styles.play}>
      <form onSubmit={handleSubmit}>
        <LabeledElement label='Username' element={
          <input id='play-username' value={username} placeholder='Username' required onChange={(e) => setUsername(e.target.value)} />
        } />
        <LabeledElement label='Password' element={
          <input id='play-password' value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
        } />
        <LabeledElement label='Challenger Username' element={
          <input id='play-challenger' value={challenger} placeholder='Username' required onChange={(e) => setChallenger(e.target.value)} />
        } description='The username of the Pokemon Showdown account to challenge.'/>
        <input type='submit' value='Log in' disabled={!canLogin} />
      </form>
    </div>
  );
}

export default Play;
