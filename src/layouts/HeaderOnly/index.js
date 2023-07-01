import { useCallback, useState } from 'react';

import LoginDialog from '~/components/LoginDialog';
import Header from '~/layouts/components/Header';

function HeaderOnly({ children }) {
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    const handleDialogOpen = useCallback(() => {
        setIsLoginDialogOpen(!isLoginDialogOpen);
    }, []);
    return (
        <div>
            <Header isDialogOpen={handleDialogOpen} />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            {isLoginDialogOpen && <LoginDialog onClose={() => setIsLoginDialogOpen(!isLoginDialogOpen)} />}
        </div>
    );
}

export default HeaderOnly;
