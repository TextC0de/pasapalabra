import React, { useState } from 'react';
import Seo from '@src/components/Seo';
import StageFinishedScreen from '@src/components/StageFinishedScreen';

const withMinigame = (Child) => {
    const MyComp = (props) => {
        const [minigameFinished, setMinigameFinished] = useState(false);
        const [finalStatus, setFinalStatus] = useState();

        const onFinish = (status) => {
            setFinalStatus(status);
            setMinigameFinished(true);
        };

        if (minigameFinished)
            return (
                <StageFinishedScreen
                    customTitle={finalStatus.customTitle}
                    description={finalStatus.description}
                    won={finalStatus.won}
                    nextMinigameCode={finalStatus.nextMinigameCode}
                >
                    {finalStatus.child}
                </StageFinishedScreen>
            );

        return (
            <div>
                <Seo title={`Minijuego | Titulo`} description="Juego de pasapalabra" />
                <Child {...props} onFinish={onFinish} />
            </div>
        );
    };

    return MyComp;
};

export default withMinigame;
