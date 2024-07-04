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

// Creates an instance of the PieceData class to store information about the state of the pieces
// in the interactive board.
const pieceData = new PieceData();

function removeMoveMarkers() {
    let markers = document.querySelectorAll('.move-marker');

    // Removes all the move markers on the board.
    markers.forEach(marker => {
        marker.remove();
    });
}

function respondToBoardClick(event) {
    // Returns if this function is called without a piece being clicked before.
    if (pieceData.pieceClicked == false) {
        return;
    }

    let board = document.getElementById(pieceData.currentBoardID);

    // Here posInfo.left is the x coordinate of the board in terms of the whole screen not the tab interface.
    // Same with posInfo.top but for y.
    const posInfo = board.getBoundingClientRect();

    // Calculates where the click occurred in terms of just the board not the whole screen.
    // In terms of pixels.
    // event.clientX and event.clientY are the coordinates of the click in terms of the whole screen btw.
    let clickPosX = event.clientX - posInfo.left;
    let clickPosY = event.clientY - posInfo.top;
    
    // Calculates the new positions (in squares) of the piece after movement.
    pieceData.piecePosX = Math.floor(clickPosX / 40) + 1;
    pieceData.piecePosY = Math.floor(clickPosY / 40) + 1;

    // Moves the piece to the new position.
    let piece = document.getElementById(pieceData.currentPieceID);
    piece.style.top = ((pieceData.piecePosY - 1) * 40) + "px";
    piece.style.left = ((pieceData.piecePosX - 1) * 40) + "px";

    pieceData.pieceClicked = false;
    removeMoveMarkers();

    // Removes the event listener for this function until a piece is clicked again.
    document.getElementById(pieceData.currentBoardID).removeEventListener('click', respondToBoardClick);
}

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
    if (pieceType == 'bishop') {
        displayBishopMoves(boardID);
    }
    if (pieceType == 'knight') {
        displayKnightMoves(boardID);
    }
    if (pieceType == 'queen') {
        displayQueenMoves(boardID);
    }
    if (pieceType == 'pawn') {
        displayPawnMoves(boardID);
    }
    if (pieceType == 'king') {
        displayKingMoves(boardID);
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

function displayBishopMoves(boardID) {
    bishopPosX = pieceData.piecePosX;
    bishopPosY = pieceData.piecePosY;

    for (let i = 1; i <= 8; i++) {
        // Displays move markers on all 4 diagonals from the position of the bishop,
        // in each diagonal checking that the move markers don't get placed outside the board.
        if (bishopPosX + i <= 8 && bishopPosX + i >= 1 && bishopPosY + i <= 8 && bishopPosY + i >= 1) {
            displayMoveMarker(bishopPosX + i, bishopPosY + i, boardID);
        }
        if (bishopPosX + i <= 8 && bishopPosX + i >= 1 && bishopPosY - i <= 8 && bishopPosY - i >= 1) {
            displayMoveMarker(bishopPosX + i, bishopPosY - i, boardID);
        }
        if (bishopPosX - i <= 8 && bishopPosX - i >= 1 && bishopPosY + i <= 8 && bishopPosY + i >= 1) {
            displayMoveMarker(bishopPosX - i, bishopPosY + i, boardID);
        }
        if (bishopPosX - i <= 8 && bishopPosX - i >= 1 && bishopPosY - i <= 8 && bishopPosY - i >= 1) {
            displayMoveMarker(bishopPosX - i, bishopPosY - i, boardID);
        }
    }
}

function displayKnightMoves(boardID) {
    x = pieceData.piecePosX;
    y = pieceData.piecePosY;
    
    // The list of the 8 possible moves for the knight, given the knight is at position x,y
    let moves = [[x+1, y+2], [x+2, y+1], [x-1, y+2], [x-2, y+1], [x+1, y-2], [x+2, y-1], [x-1, y-2], [x-2, y-1]];

    for (let i = 0; i < moves.length; i++) {
        move = moves[i];
        if (move[0] <= 8 && move[0] >= 1 && move[1] <=8 && move[1] >= 1) {
            displayMoveMarker(move[0], move[1], boardID);
        }
    }
}

/*
 * Displays where the pawn can be moved on the interactive board. 
 * 
 * @PARAMS:
 * posX - The horizontal position (in squares) of the selected pawn
 * posY - The vertical position (in squares) of the selected pawn
 */ 
function displayPawnMoves(boardID) {
    x = pieceData.piecePosX;
    y = pieceData.piecePosY;

    if (y == 7) {
        displayMoveMarker(x, y-1, boardID);
        displayMoveMarker(x, y-2, boardID);
    } else if (y == 1) {
        return;
    } else {
        displayMoveMarker(x, y-1, boardID);
    }
}

function displayQueenMoves(boardID) {
    // The queen is just the rook and bishop combined.
    displayRookMoves(boardID);
    displayBishopMoves(boardID);
}

function displayKingMoves(boardID) {
    x = pieceData.piecePosX;
    y = pieceData.piecePosY;
    
    // The list of the 8 possible moves for the king, given the king is at position x,y
    let moves = [[x+1, y+1], [x+1, y-1], [x-1, y+1], [x-1, y-1], [x, y+1], [x, y-1], [x+1, y], [x-1, y]];

    for (let i = 0; i < moves.length; i++) {
        move = moves[i];
        if (move[0] <= 8 && move[0] >= 1 && move[1] <=8 && move[1] >= 1) {
            displayMoveMarker(move[0], move[1], boardID);
        }
    }
}

function open_popup(popupID, pieceID) {
    let popup = document.getElementById(popupID);
    popup.style.transform = 'translate(-50%, -50%) scale(1)'

    // If the pawn popup is opened then the pawn has to be moved to the 2nd row from the bottom
    // to demonstrate its first-move ability
    if (popupID == 'pawn-popup') {
        pieceData.piecePosX = 5;
        pieceData.piecePosY = 7;
    }

    // Moves the piece to the currently stored position.
    let piece = document.getElementById(pieceID);
    piece.style.top = ((pieceData.piecePosY - 1) * 40) + "px";
    piece.style.left = ((pieceData.piecePosX - 1) * 40) + "px";
}

function close_popup(popupID) {
    let popup = document.getElementById(popupID);
    popup.style.transform = 'translate(-50%, -50%) scale(0)'

    // Fixes a bug where if you close a popup while move markers are displayed 
    // the other popups' move markers don't get displayed
    pieceData.pieceClicked = false;
    removeMoveMarkers();
    document.getElementById(pieceData.currentBoardID).removeEventListener('click', respondToBoardClick);
}