import React from 'react';
import Home from '../components/Home';
import Play from '../components/Play';
import Create from '../components/Create';

const pages: {
    path: string,
    display: string,
    element: (props?: any) => React.JSX.Element
}[] = [
        {
            path: '',
            display: 'Home',
            element: Home
        },
        {
            path: 'play',
            display: 'Play',
            element: Play
        },
        {
            path: 'create',
            display: 'Create',
            element: Create
        }
    ]

export { pages };
