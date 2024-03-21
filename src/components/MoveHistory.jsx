import '../styles/MoveHistory.css';

export default function MoveHistory(props){

    const { moveHistory, localeData } = props;

    let turn = 1;
    const moveHistoryElements = [];

    for (let i = 0; i < moveHistory.length; i+=2) {
        const roundElements = (
            <div className="hist-row-wrapper" key={i}>
                <div className="turn"><p>{turn}.</p></div>
                <div class="piece-column">
                    <div className="white-turn"><p>{moveHistory[i]}</p></div>
                </div>
                <div class="piece-column">
                    <div className="black-turn"><p>{moveHistory[i + 1]}</p></div>
                </div>
            </div>
        );
        moveHistoryElements.push(roundElements);
        turn++;
    }

    return (
        <div className="move-history">
            <div className="hist-row-wrapper">
                <p>{localeData.move_history}</p>
            </div>
            <div className="hist-row-wrapper">
                <div className="turn"><p>{localeData.move_turn}</p></div>
                <div class="piece-column">
                    <div className="white-turn"><p>{localeData.team_white}</p></div>
                </div>
                <div class="piece-column">
                    <div className="black-turn"><p>{localeData.team_black}</p></div>
                </div>
            </div>
            {moveHistoryElements}
        </div>
    );

}