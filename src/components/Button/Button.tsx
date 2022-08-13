import styles from './Button.module.css';

type Props = {
    label: string;
    onClickHandle: () => void;
};

const Button = ({ label, onClickHandle }: Props) => {
    return (
        <button className={styles.button} onClick={onClickHandle}>
            {label}
        </button>
    );
};

export default Button;
