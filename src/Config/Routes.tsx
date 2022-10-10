import { lazy } from 'react';
import type { RouteProps } from '../Core/Components/Routes';
import { Dashboard } from '../Component';
import { NotFound } from '../Component/Error';

const comman: RouteProps[] = [
    {
        path: '/404',
        element: NotFound,
    }
];

const app: RouteProps[] = [

    {
        path: '/',
        to: 'dashboard',
        private: true
    },
    {
        path: '/login',
        element: lazy(() => import('../Component/Login/Login')),
        isAuthTo: '/'
    },

    //module routs

    {
        path: '/dashboard/*',
        element: Dashboard,
        private: true
    },
]

const routes = { app, comman };

export default routes;
