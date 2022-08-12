import styles from './Table.module.css';

type Props = {
    names: string[];
    votes: number[];
};

const Table = ({ names, votes }: Props) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.row}>
                    <th>Candidate Name</th>
                    <th>Vote Count</th>
                </tr>
            </thead>
            <tbody className={styles.tbody}>
                {names.map((name, index) => (
                    <tr className={styles.row} key={index}>
                        <td className={styles.nameCell}>{name}</td>
                        <td className={styles.voteCell}>{votes[index]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
