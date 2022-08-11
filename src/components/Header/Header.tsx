import styles from './Header.module.css';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { setClass } from '../../utils/util';

type Size = {
    width: number;
    height: number;
};

const Header = () => {
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHandler = () => setMenuOpen((p) => !p);

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <h2 className={styles.logo}>
                    <Link to='/'>Election</Link>
                </h2>
                <nav
                    className={setClass(
                        styles,
                        ['nav'],
                        [['isMenu', menuOpen && size.width !== 0 && size.width < 640]]
                    )}
                    onClick={menuToggleHandler}
                >
                    <ul>
                        <li className={'/voting' === location.pathname ? styles.active : ''}>
                            <Link to='/voting'>Vote here</Link>
                        </li>
                        <li className={'/results' === location.pathname ? styles.active : ''}>
                            <Link to='/results'>Results</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.toggle}>
                    {!menuOpen ? (
                        <GiHamburgerMenu onClick={menuToggleHandler} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHandler} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
