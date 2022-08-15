import { ListResult, NameWithVotes } from '../../utils/type';
import styles from './List.module.css';

import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { setClass } from '../../utils/class';

type Props = {
    results: ListResult;
};

const SortingIcon = (setAscending: (ascending: boolean) => void, ascending: boolean) => (
    <>
        {ascending ? (
            <FaSortAmountDownAlt className={styles.icon} onClick={() => setAscending(!ascending)} />
        ) : (
            <FaSortAmountUp className={styles.icon} onClick={() => setAscending(!ascending)} />
        )}
    </>
);

const List = ({ results }: Props) => {
    const [ascending, setAscending] = useState<boolean>(false);
    const [listName, setListName] = useState('');
    const [rankings, setRankings] = useState<NameWithVotes[]>(results.rankings);

    useEffect(() => {
        setListName(results.listName);
    }, [results]);

    useEffect(() => {
        let sortRule;

        if (ascending) {
            sortRule = (a: NameWithVotes, b: NameWithVotes) => a.votes - b.votes;
        } else {
            sortRule = (a: NameWithVotes, b: NameWithVotes) => b.votes - a.votes;
        }

        const sortedRankings = [...rankings].sort(sortRule);
        setRankings(sortedRankings);
    }, [ascending]);

    return (
        <div className={styles.container}>
            <div className={setClass(styles, ['header', 'row'])}>
                <div className={styles.tableName}>{listName}</div>
                {SortingIcon(setAscending, ascending)}
            </div>
            {rankings.map((ranking, index) => (
                <div className={setClass(styles, ['body', 'row'])} key={index}>
                    <div className={styles.nameCell}>{ranking.full_name}</div>
                    <div>{ranking.votes}</div>
                </div>
            ))}
        </div>
    );
};

export default List;
