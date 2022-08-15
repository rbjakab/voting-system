import { useContext } from 'react';
import { votedCandidateContext, VotedCandidatesContext } from '../../context/candidate';
import styles from './Table.module.css';

const Table = () => {
    const { votedCandidates } = useContext<VotedCandidatesContext>(votedCandidateContext);

    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.row}>
                    <th colSpan={2} scope='colgroup'>
                        Global Rankings Result
                    </th>
                </tr>
                <tr className={styles.row}>
                    <th scope='col'>Candidate Name</th>
                    <th scope='col'>Vote Count</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {votedCandidates.map(({ full_name, votes }, index) => (
                    <tr className={styles.row} key={index}>
                        <td className={styles.nameCell}>{full_name}</td>
                        <td className={styles.voteCell}>{votes}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
