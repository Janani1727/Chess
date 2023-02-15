 import  {  useRef, useState } from "react";

import './board.css'

import Box from "../box/box";

import Referee from "../../referee/referee";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]

 export interface Piece {
  image: string
  x: number
  y: number
  type:PieceType
  team:TeamType
}

export enum TeamType{
  OPPONENT,
  OURTEAM
}

 export enum PieceType{
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

const intialBoardState: Piece[]=[]

for (let p = 0; p < 2; p++) {

  const teamType = (p===0)? TeamType.OPPONENT:TeamType.OURTEAM

  const type=(teamType ===TeamType.OPPONENT)?"b" : "w";

  const y= (teamType ===TeamType.OPPONENT)? 7 : 0;

  intialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 0, y ,type :PieceType.ROOK ,team:teamType})

  intialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 7, y, type :PieceType.ROOK ,team:teamType})

  intialBoardState.push({ image: `assets/images/knight_${type}.png`, x: 1, y, type :PieceType.KNIGHT ,team:teamType})

  intialBoardState.push({ image: `assets/images/knight_${type}.png`, x: 6, y,type :PieceType.KNIGHT ,team:teamType })

  intialBoardState.push({ image: `assets/images/bishop_${type}.png`, x: 2, y,type :PieceType.BISHOP  ,team:teamType })

  intialBoardState.push({ image: `assets/images/bishop_${type}.png`, x: 5, y,type :PieceType.BISHOP ,team:teamType})

  intialBoardState.push({ image: `assets/images/queen_${type}.png`, x: 3, y,type :PieceType.QUEEN ,team:teamType })

  intialBoardState.push({ image: `assets/images/king_${type}.png`, x: 4, y,type :PieceType.KING ,team:teamType})


}


//black pawn 
for (let i = 0; i < 8; i++) {
  intialBoardState.push({ image: 'assets/images/pawn_b.png', x: i, y: 6 ,type :PieceType.PAWN ,team:TeamType.OPPONENT})
}

//white pawn
for (let i = 0; i < 8; i++) {
  intialBoardState.push({ image: 'assets/images/pawn_w.png', x: i, y: 1 ,type :PieceType.PAWN ,team:TeamType.OURTEAM })
}


const Board = () => {

const [activePiece,setActivePiece] =useState<HTMLElement |null>  (null)

const [gridX, setGridX] =useState(0)

const [gridY, setGridY] =useState(0)

const chessboardRef=useRef<HTMLDivElement>(null)

const [pieces,setPieces] =useState<Piece[]>(intialBoardState);

const referee=new Referee()
// let activePiece: HTMLElement | null = null


// const pieces: Piece[] = []


function grabPiece(e: React.MouseEvent) {

  const chessboard=chessboardRef.current
  const element = e.target as HTMLElement;

  if (element.classList.contains("chess-piece") && chessboard) {
    // console.log(e)

    const gridX = Math.floor (e.clientX -chessboard.offsetLeft)/100 ;
    const gridY = Math.abs( Math.ceil(e.clientY -chessboard.offsetTop -800)/100)
    
     setGridX(gridX)
    setGridY(gridY)

    const x = e.clientX - 50;
    const y = e.clientY - 50;

    element.style.position = "absolute";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    setActivePiece(element)
    // activePiece = element
  }

}

function movePiece(e: React.MouseEvent) {
  // const element =e.target as HTMLElement;
    
  const chessboard=chessboardRef.current

  if (activePiece && chessboard) {
    // console.log(e)

    const minX =chessboard.offsetLeft-25;
    const minY =chessboard.offsetTop-25;

    const maxX =chessboard.offsetLeft+chessboard.clientWidth-75;
    const maxY =chessboard.offsetTop+chessboard.clientHeight-75;


    const x = e.clientX - 50;
    const y = e.clientY - 50;

    activePiece.style.position = "absolute";
    // activePiece.style.left = `${x}px`;
    // activePiece.style.top = `${y}px`;

    if(x < minX){
      activePiece.style.left=`${minX}px`
    }else if(x > maxX){
      activePiece.style.left=`${maxX}px`
    }
    else{
      activePiece.style.left=`${x}px`
    }


    if(y < minY){
      activePiece.style.top=`${minY}px`
    }else if(y > maxY){
      activePiece.style.top=`${maxX}px`
    } 
    else{
      activePiece.style.top=`${y}px`
    }
  }

}

function dropPiece(e: React.MouseEvent) {
  // const element =e.target as HTMLElement;

  const chessboard=chessboardRef.current

  if (activePiece && chessboard) {
    
    const x = Math.floor ((e.clientX -chessboard.offsetLeft)/100 );
    const y = Math.abs( 
      Math.ceil((e.clientY -chessboard.offsetTop -800)/100))
    // console.log(x,y)
   
  
   
    setPieces((value)=>{
     const pieces= value.map((p)=>{
      if(p.x===gridX && p.y===gridY){
       const ValidMove =referee.isValidMove(gridX,gridY,x,y,p.type,p.team,value)
       
       if(ValidMove){
        p.x=x
        p.y=y
       }
       else{
        activePiece.style.position="relative"
        activePiece.style.removeProperty("top")
        activePiece.style.removeProperty("left")
       }
      }
    return p;
      })
      return pieces
    })
    // pieces[0].x=5
    setActivePiece(null)
    // activePiece = null
  }
}


  let board = []

  for (let j = verticalAxis.length - 1; j >= 0; j--) {

    for (let i = 0; i < horizontalAxis.length; i++) {

      const number = j + i + 2;
      let image = undefined

      pieces.forEach(p => {

        if (p.x === i && p.y === j) {
          image = p.image
        }
      })

      board.push(<Box key={`${j},${i}`} image={image} number={number} />)

    }
  }




  return (
    <div
      onMouseUp={e => dropPiece(e)}
      onMouseMove={e => movePiece(e)}
      onMouseDown={e => grabPiece(e)}
      ref={chessboardRef}
      id="chessboard">{board}
      </div>
  )
}

export default Board



// <---------------- NORMAL METHOD TO PLACE THE COINS   ---------------->

// // black rook
// pieces.push({image:'assets/images/rook_b.png',x:0,y:7})

// pieces.push({image:'assets/images/rook_b.png',x:7,y:7})

// // black knight
// pieces.push({image:'assets/images/knight_b.png',x:1,y:7})

// pieces.push({image:'assets/images/knight_b.png',x:6,y:7})

// // black bishop 
// pieces.push({image:'assets/images/bishop_b.png',x:2,y:7})

// pieces.push({image:'assets/images/bishop_b.png',x:5,y:7})

// // black queen 
// pieces.push({image:'assets/images/queen_b.png',x:3,y:7})

// // black king
// pieces.push({image:'assets/images/king_b.png',x:4,y:7})


// // white rook
// pieces.push({image:'assets/images/rook_w.png',x:0,y:0})

// pieces.push({image:'assets/images/rook_w.png',x:7,y:0})

// // white knight
// pieces.push({image:'assets/images/knight_w.png',x:1,y:0})

// pieces.push({image:'assets/images/knight_w.png',x:6,y:0})

// // white bishop 
// pieces.push({image:'assets/images/bishop_w.png',x:2,y:0})

// pieces.push({image:'assets/images/bishop_w.png',x:5,y:0})

// // white queen 
// pieces.push({image:'assets/images/queen_w.png',x:3,y:0})

// // white king
// pieces.push({image:'assets/images/king_w.png',x:4,y:0})


