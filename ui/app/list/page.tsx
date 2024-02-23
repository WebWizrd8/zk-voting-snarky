'use client';
import { Button } from '@/components/button/Button';
import Candidates from '../_components/candidates/candidates';
import styles from './page.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ListVoting() {
  const [votings, setVotings] = useState<any[]>([]);
  useEffect(() => {
    // Get votings from the server
    const getVotings = async () => {
      const url = `${process.env.NEXT_BACKEND_URL}/vote/list`;
      const headers = {
        'Content-Type': 'application/json',
      };
      const data = await axios.get('http://localhost:3001/votes', { headers });
      console.log('votes', data);
      setVotings(data.data);
    };
    getVotings();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>List Voting</h1>
        <ul>
          {votings.map((voting) => (
            <li key={voting._id}>
              <a href={`/vote/${voting.voteID}`}>{voting.voteName}</a>
            </li>
          ))}
        </ul>
        <Button className={styles.button} href="/" text="Go back" />
      </div>
    </div>
  );
}
