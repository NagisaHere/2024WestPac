// initialise board
/*
 * This function is used for displaying the circles on the user's screen that indicates
 * where a piece can move. Positioning in this function is relative to the top left
 * corner of the interactive board display.
 * 
 * @PARAMS:
 * squareSize - The side length (in pixels) of an individual square on the chess board display
 * circleCoordX - The horizontal coordinate (in squares) of where to put the circle on the board
 * circleCoordY - The vertical coordinate (in squares) of where to put the circle on the board
 */
function displayMoveMarker(circleCoordX, circleCoordY, boardID) {
    let squareSize = 40;

    // First calculates the pixel coordinates of where to put the center of the circle.
    let pixelCoordX = circleCoordX * squareSize + 0.5 * squareSize;
    let pixelCoordY = circleCoordY * squareSize + 0.5 * squareSize;

    // Then creates a move marker element and styles it accordingly.
    let marker = document.createElement("div");
    marker.className = "move-marker";
    marker.style.left = (pixelCoordX - 40) + "px";
    marker.style.top = (pixelCoordY - 40) + "px";
    
    // The interactive board to display the move marker on.
    let board = document.getElementById(boardID);

    // Adds the marker onto the board
    board.appendChild(marker);
}

// modify piece data to reflect highlighting as it will have its own table outside
class PieceData {
    constructor() {
        this.piecePosX = 4;
        this.piecePosY = 5;
        this.pieceClicked = false;

        // Also keeps track of which board the user is in and which piece the user last clicked.
        this.currentBoardID = "";
        this.currentPieceID = "";
    }
}

// handler for click

function respondToClick(pieceType, boardID, pieceID) {
    if (pieceData.pieceClicked == true) {
        return;
    }
    pieceData.pieceClicked = true;
    pieceData.currentBoardID = boardID;
    pieceData.currentPieceID = pieceID;
    if (pieceType == 'rook') {
        displayRookMoves(boardID);
    }

    // Adds the event listener to the board only after a delay 
    // to prevent respondToBoardClick from executing as soon as the piece is clicked.
    setTimeout(() => {document.getElementById(boardID).addEventListener('click', respondToBoardClick);}, 200);
}

function displayRookMoves(boardID) {
    for (let i = 1; i <= 8; i++) {
        displayMoveMarker(pieceData.piecePosX, i, boardID);
        displayMoveMarker(i, pieceData.piecePosY, boardID);
    }
}
