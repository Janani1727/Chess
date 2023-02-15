import React from "react";
import { PieceType, TeamType,Piece } from '../components/chessboard/board';

export default class Referee {

    boxIsOccupied(x:number,y:number,boardState:Piece[]):boolean{

        const Piece=boardState.find(p=>p.x===x  && p.y===y)
         
       if(Piece){
        return true
       }else{
        return false
       }
    }

    isValidMove(
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState:Piece[]
    ) {

        console.log("referee is checking the move")
        console.log(`previous move (${px},${py})`)
        console.log(`current move (${x},${y})`)
        console.log(`PieceType ${type}`)
        console.log(`Team ${team}`)

        if (type === PieceType.PAWN) {
            if (team === TeamType.OURTEAM) {
                if (py === 1) {
                    if (px === x && (y - py === 1 || y - py === 2)) {
                        //    console.log("valid move!")

                        if(this.boxIsOccupied(x,y,boardState))
                        return true
                    }
                } else {
                    if (px === x && y - py === 1) {
                        return true;
                    }
                }

            }else{
                // if (team === TeamType.OURTEAM) {
                    if (py === 6) {
                        if (px === x && (y - py === -1 || y - py === -2)) {
                            //    console.log("valid move!")
                            return true
                        }
                    } else {
                        if (px === x && y - py === -1) {
                            return true;
                        }
                    }
    
                // }
            }
        }
        return false
    }
}

