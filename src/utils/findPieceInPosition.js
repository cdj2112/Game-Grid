export default function findPieceInPosition(pieces, x , y) {
	return pieces.find((p)=>{
		return p.pos.x === x && p.pos.y === y;
	})
}