import { FormEvent, useState } from 'react';
import { setClass } from '../../utils/class';
import styles from './LogIn.module.css';

type Props = {
    handleAuthentication: (typedId: string) => void;
};

const LogIn = ({ handleAuthentication }: Props) => {
    const [voterId, setVoterId] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleAuthentication(voterId);
    };

    return (
        <form className={styles.submissionForm} onSubmit={handleSubmit}>
            <label>Voter key:</label>
            <input
                className={styles.input}
                type='text'
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                spellCheck={false}
            />

            <input className={setClass(styles, ['input', 'button'])} type='submit' value='Send' />
        </form>
    );
};

export default LogIn;
