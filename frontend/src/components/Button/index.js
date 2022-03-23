import React from 'react';
import './styles.scss';

export function Button({isOutlined = false, ...props}) {
    return (
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`} 
            {...props}
        />

    )
}