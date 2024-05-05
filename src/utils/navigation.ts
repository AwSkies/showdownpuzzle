import React from 'react';
import Home from '../components/Home';
import Play from '../components/Play';
import Create from '../components/Create';

const pages: {[key: string]: (props?: any) => React.JSX.Element} = {
  '': Home,
  'play': Play,
  'create': Create
}

function mapPages(fn: (name: string, index: number, array: string[]) => any) {
    return Object.keys(pages).map(fn);
}

export { pages, mapPages };
