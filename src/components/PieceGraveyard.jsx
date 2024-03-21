import "../styles/PieceGraveyard.css";
import getPieceImg from '../utility';

export default function PieceGraveyard(props) {

  const { title, pieceGraveyard, localeData } = props;

  return (
    <div className="graveyard">
      <p>{title}</p>
      <div className="graveyard-container">
        {pieceGraveyard.map((piece, key) => (
          <img key={key} src={getPieceImg(piece.symbol)} alt={`${localeData.pieces[piece.symbol]} ${localeData.image}`} 
              className='piece-img' />
        ))}
      </div>
    </div>
  );
}