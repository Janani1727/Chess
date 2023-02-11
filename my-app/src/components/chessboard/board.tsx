import React from "react";
import './board.css'
import Box from "../box/box";

const verticalAxis=["1","2","3","4","5","6","7","8"]

const horizontalAxis=["a","b","c","d","e","f","g","h"]

interface Piece {
  image :string 
  x:number
  y:number
}

const pieces :Piece[]=[]


// <---------------- DYNAMIC METHOD TO PLACE THE COINS   ---------------->

for (let p=0;p<2;p++){

  const type = p === 0 ? "b" : "w";

  const y = p === 0 ? 7 : 0;

  

pieces.push({image:`assets/images/rook_${type}.png`,x:0,y})

pieces.push({image:`assets/images/rook_${type}.png`,x:7,y})

pieces.push({image:`assets/images/knight_${type}.png`,x:1,y})

pieces.push({image:`assets/images/knight_${type}.png`,x:6,y})

pieces.push({image:`assets/images/bishop_${type}.png`,x:2,y})

pieces.push({image:`assets/images/bishop_${type}.png`,x:5,y})
 
pieces.push({image:`assets/images/queen_${type}.png`,x:3,y})

pieces.push({image:`assets/images/king_${type}.png`,x:4,y})

  
}


//black pawn
for(let i=0;i<8;i++){
  pieces.push({image:'assets/images/pawn_b.png',x:i,y:6})
}

//white pawn
for(let i=0;i<8;i++){
  pieces.push({image:'assets/images/pawn_w.png',x:i,y:1})
}

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





const Board = () => {

    let board=[]

    for(let j=verticalAxis.length -1 ; j>=0; j--){

        for(let i=0 ; i<horizontalAxis.length ; i++){

            const number= j+i+2;
            let image=undefined

            pieces.forEach(p=>{
                
              if(p.x ===i && p.y ===j){
                image =p.image
              }
            })

           board.push(<Box image={image} number={number} />)
           
        }
    }

   
    

  return (
    <div id="chessboard">{board}</div>
  )
}

export default Board