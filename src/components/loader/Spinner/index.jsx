import React from 'react';

const Spinner = ({childre,item}) => {
    return (
        <div>
             <div className="w-6 h-6 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;