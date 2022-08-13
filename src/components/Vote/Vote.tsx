import { useState } from 'react';
import { setClass } from '../../utils/class';
import { Candidate, Ranking } from '../../utils/type';
import styles from './Vote.module.css';

type CheckBoxProps = {
    rank?: number;
};

const CheckBox = ({ rank }: CheckBoxProps) => (
    <div className={setClass(styles, ['checkbox', 'disableSelect'])}>{rank}</div>
);

type Props = {
    candidates: Candidate[];
    rankings: Ranking[];
    setRankings: (candidates: Ranking[]) => void;
};

const Vote = ({ candidates, rankings, setRankings }: Props) => {
    const [numberOfVotes, setNumberOfVotes] = useState<number>(0);

    const handleVote = (id: string) => {
        const votedCandidate = rankings.find((ranking) => ranking.id === id);

        if (votedCandidate) {
            const index = rankings.indexOf(votedCandidate);
            const newRankings = rankings
                .map((ranking, i) => {
                    if (i > index && ranking.rank) {
                        return {
                            id: ranking.id,
                            rank: ranking.rank - 1,
                        };
                    }
                    return ranking;
                })
                .filter((ranking) => ranking.id !== id);

            setRankings(newRankings);
            setNumberOfVotes((prevState) => prevState - 1);
        } else {
            const newRankings = [
                ...rankings,
                {
                    id,
                    rank: numberOfVotes + 1,
                },
            ];

            setRankings(newRankings);
            setNumberOfVotes((prevState) => prevState + 1);
        }
    };

    const getRankOfCandidate = (id: string) => rankings.find((ranking) => ranking.id === id)?.rank;

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div>Candidate</div>
                <div>Ranking</div>
            </div>
            {candidates.map(({ full_name, id }, index) => (
                <div className={styles.row} onClick={() => handleVote(id)} key={index}>
                    <div className={styles.nameCell}>{full_name}</div>
                    <CheckBox rank={getRankOfCandidate(id)} />
                </div>
            ))}
        </div>
    );
};

export default Vote;
