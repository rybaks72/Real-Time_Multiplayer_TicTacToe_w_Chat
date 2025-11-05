import React from "react";
import {FaTimes, FaRegCircle} from "react-icons/fa"

function Square({value, onSquareClick}) {
    return (
        <div className="square" onClick={onSquareClick}>
            {value === "X" ? (
                <FaTimes/>
            ): value ==="O" ? (
                <FaRegCircle/>
            ):(
                <></>
            )}
        </div>
    );
}

export default Square;