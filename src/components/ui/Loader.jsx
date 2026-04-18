import React from 'react';
import Logo from './Logo';

interface LoaderProps {
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = true }) => {
    const content = (
        <div className="flex items-center justify-center">
            <div className="animate-pulse">
                <Logo height={36} className="brightness-0 invert" />
            </div>
        </div>
    );

    if (!fullScreen) return content;

    return (
        <div className="fixed inset-0 z-[9999] bg-[#0A0B0D] flex items-center justify-center">
            {content}
        </div>
    );
};

export default Loader;
