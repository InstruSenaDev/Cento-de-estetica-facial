import React, { useEffect } from 'react';
import { useLoading } from './Loadingcontext';
import './Carga.css';

export const Pageloader = () => {
    const { loading, setLoading } = useLoading();

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                setLoading(false);
            }, 680); // Tiempo de carga simulado en segundos
        }

        return () => clearTimeout(timer);
    }, [loading, setLoading]);

    return (
        <div className={`loader ${loading ? 'visible' : 'hidden'}`}>
            <div className="loader__balls">
                <div className="loader__balls__group">
                    <div className="ball item1"></div>
                    <div className="ball item1"></div>
                    <div className="ball item1"></div>
                </div>
                <div className="loader__balls__group">
                    <div className="ball item2"></div>
                    <div className="ball item2"></div>
                    <div className="ball item2"></div>
                </div>
                <div className="loader__balls__group">
                    <div className="ball item3"></div>
                    <div className="ball item3"></div>
                    <div className="ball item3"></div>
                </div>
            </div>
        </div>
    );
};
