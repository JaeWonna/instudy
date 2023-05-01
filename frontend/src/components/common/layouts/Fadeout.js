import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Fadeout() {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.location.href = '/main';
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    return <div><FontAwesomeIcon icon={faLinkedin} />Instudy</div>;
}

export default Fadeout;