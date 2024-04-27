import React, { FormEvent, useState } from 'react';
import styles from './App.module.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [canLogin, setCanLogin] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const bot = new Worker(new URL('./bot', import.meta.url));
    bot.postMessage({ username, password });

    bot.onmessage = (e: MessageEvent) => {
      setMessages([...messages, e.data]);
    };
    bot.onerror = (e: ErrorEvent) => {
      setMessages([...messages, e.error]);
    };

    setCanLogin(false);
  }

  return (
    <div className={styles.div}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input id='username' value={username} placeholder='Username' required onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label htmlFor="password">Password: </label>
        <input id='password' value={password} placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type='submit' value='Log in' disabled={!canLogin} />
      </form>
      <h3>Messages:</h3>
      <div className={styles.messages}>
        {messages.map((message, i) => <p key={`key${i}`}>{message}</p>)}
      </div>
    </div>
  );
}

export default App;
