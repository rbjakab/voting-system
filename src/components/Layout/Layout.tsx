import React from 'react';
import Header from '../Header/Header';
import classes from './Layout.module.css';

type Props = {
    children?: JSX.Element;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div className={classes.container}>{children}</div>
        </>
    );
};

export default Layout;
