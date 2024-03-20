import '../styles/MoveHistory.css';

export default function MoveHistory(props){

    const { moveHistory, localeData } = props;

    let turn = 1;
    const moveHistoryElements = [];

    for (let i = 0; i < moveHistory.length; i+=2) {
        const roundElements = (
            <div className="hist-row-wrapper" key={i}>
                <div className="turn">{turn}.</div>
                <div className="white-turn">{moveHistory[i]}</div>
                <div className="black-turn">{moveHistory[i + 1]}</div>
            </div>
        );
        moveHistoryElements.push(roundElements);
        turn++;
    }

    return (
        <div className="move-history">
            <div className="move-history-header">
                <div className="turn">{localeData.move_turn}</div>
                <div className="white-turn">{localeData.pieces_white}</div>
                <div className="black-turn">{localeData.pieces_black}</div>
            </div>
            {moveHistoryElements}
        </div>
    );

}