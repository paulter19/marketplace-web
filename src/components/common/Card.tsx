import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', noPadding = false }) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden ${className}`}>
            <div className={noPadding ? '' : 'p-4'}>
                {children}
            </div>
        </div>
    );
};

export default Card;
