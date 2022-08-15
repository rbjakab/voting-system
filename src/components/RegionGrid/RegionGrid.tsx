import { setClass } from '../../utils/class';
import { ListResult } from '../../utils/type';
import List from '../List/List';
import styles from './RegionGrid.module.css';

type Props = {
    regionResults: ListResult[];
};

const RegionGrid = ({ regionResults }: Props) => {
    return (
        <div className={setClass(styles, ['container', 'disableSelect'])}>
            {regionResults.map((regionResult, index) => (
                <div className={styles.gridCell} key={index}>
                    <List results={regionResult} />
                </div>
            ))}
        </div>
    );
};

export default RegionGrid;
