function displayTab(event, title) {
    let tabPages = document.getElementsByClassName("tab-page"); // Returns a collection of all the tab pages
    let selectedButton = document.getElementsByClassName("tab-button1")[0]; // Returns a collection of the currently selected tab button

    // First hides all the tab pages
    let i;
    for (i = 0; i < tabPages.length; i++) {
        tabPages[i].style.display = "none";
    }

    // Changes the class name of the selected button to that of an unselected button
    selectedButton.className = selectedButton.className.replace("1", "0");

    // Unhides the tab page associated with the clicked tab button
    document.getElementById(title).style.display = "block";

    // Changes the class name of the clicked button to remember it is selected
    event.currentTarget.className = event.currentTarget.className.replace("0", "1");
}

/*
 * This function is used for the animations in the website.
 * Moves the image with id iconId horizontally by x and vertically by y.
 */
function shiftIcon(iconId, x, y) {
    let icon = document.getElementById(iconId);

    // Calculates new positions
    let newPosX = icon.offsetLeft + x;
    let newPosY = icon.offsetTop + y;

    // Duration of the movement
    icon.style.transition = 'left 0.5s linear, top 0.5s linear';

    icon.style.left = newPosX + 'px';
    icon.style.top = newPosY + 'px';
}

function animate_moving_tab() {
    // First hides the play button until the animation is finished.
    document.getElementById("moving-animation-play-button").style.display = 'none';

    // Shifts the first piece.
    shiftIcon("e-pawn-white", 0, -80);

    // Uses setTimeout to add a 1 second delay between shifting each piece.
    setTimeout(() => {shiftIcon("e-pawn-black", 0, 80)}, 1500);
    setTimeout(() => {shiftIcon("bishop-white", -120, -120)}, 3000);
    setTimeout(() => {shiftIcon("knight-black", 40, 80)}, 4500);
    setTimeout(() => {shiftIcon("knight-white", -40, -80)}, 6000);
    setTimeout(() => {shiftIcon("d-pawn-black", 0, 40)}, 7500);
    setTimeout(() => {shiftIcon("d-pawn-white", 0, -40)}, 9000);
    setTimeout(() => {shiftIcon("bishop-black", 40, 40)}, 10500);

    // After the animation is done,
    // Resets the pieces to their original positions so the animation can be replayed.
    setTimeout(() => {
        shiftIcon("e-pawn-white", 0, 80);
        shiftIcon("e-pawn-black", 0, -80);
        shiftIcon("bishop-white", 120, 120);
        shiftIcon("knight-black", -40, -80);
        shiftIcon("knight-white", 40, 80);
        shiftIcon("d-pawn-black", 0, -40);
        shiftIcon("d-pawn-white", 0, 40);
        shiftIcon("bishop-black", -40, -40);
    }, 13500);

    // After everything is reset, brings the play button back and the user can choose to replay the animation.
    setTimeout(() => {
        document.getElementById("moving-animation-play-button").style.display = 'inline-block';
    }, 14500);
}

function animate_capturing_tab() {
    // First hides the play button until the animation is finished.
    document.getElementById("capturing-animation-play-button").style.display = 'none';

    // Performs the animation.
    setTimeout(() => {shiftIcon("bishop-white-2", 120, -120)}, 1000);
    setTimeout(() => {
        document.getElementById("rook-black-2").style.transition = 'opacity 1s';
        document.getElementById("rook-black-2").style.opacity = '0';
    }, 1500);

    // Resets the pieces back to their original states.
    setTimeout(() => {
        shiftIcon("bishop-white-2", -120, 120);
        document.getElementById("rook-black-2").style.opacity = '1';
    }, 3500);

    // Brings the play button back.
    setTimeout(() => {
        document.getElementById("capturing-animation-play-button").style.display = 'inline-block';
    }, 4500);
}

function animate_enpassant() {
    // First hides the play button until the animation is finished.
    document.getElementById("enpassant-animation-play-button").style.display = 'none';

    // Performs the animation.
    setTimeout(() => {shiftIcon("passant-pawn-black", 0, 80)}, 1000);
    setTimeout(() => {shiftIcon("passant-pawn-white", -40, -40)}, 2500);
    setTimeout(() => {
        document.getElementById("passant-pawn-black").style.transition = 'opacity 1s';
        document.getElementById("passant-pawn-black").style.opacity = '0';
    }, 3000);

    // Resets the pieces back to their original states.
    setTimeout(() => {
        shiftIcon("passant-pawn-black", 0, -80);
        shiftIcon("passant-pawn-white", 40, 40)
        document.getElementById("passant-pawn-black").style.opacity = '1';
        document.getElementById("rook-black-2").style.opacity = '1';
    }, 5000);

    // Brings the play button back.
    setTimeout(() => {
        document.getElementById("enpassant-animation-play-button").style.display = 'inline-block';
    }, 6000);
}

function animate_castling() {
    // First hides the play button until the animation is finished.
    document.getElementById("castling-animation-play-button").style.display = 'none';

    // Performs the animation.
    setTimeout(() => {shiftIcon("castling-rook-white", -80, 0)}, 1000);
    setTimeout(() => {shiftIcon("castling-king-white", 80, 0)}, 2500);

    // Resets the pieces back to their original states.
    setTimeout(() => {
        shiftIcon("castling-king-white", -80, 0);
        shiftIcon("castling-rook-white", 80, 0);
    }, 5000);

    // Brings the play button back.
    setTimeout(() => {
        document.getElementById("castling-animation-play-button").style.display = 'inline-block';
    }, 6000);
}

function animate_promoting() {
    // First hides the play button until the animation is finished.
    document.getElementById("promotion-animation-play-button").style.display = 'none';
    
    // Prepares the animation for the appearance of the queen.
    document.getElementById("promotion-queen").style.transition = 'opacity 0.5s';
    document.getElementById("promotion-pawn-white").style.transition = 'opacity 0.5s';

    // Performs the animation.
    setTimeout(() => {shiftIcon("promotion-pawn-white", 0, -40)}, 1000);
    setTimeout(() => {shiftIcon("promotion-pawn-black", 0, 40)}, 2500);
    setTimeout(() => {shiftIcon("promotion-pawn-white", 0, -40)}, 4000);
    setTimeout(() => {
        document.getElementById("promotion-pawn-white").style.opacity = '0';
        document.getElementById("promotion-queen").style.opacity = '1';
    }, 4500);

    // Resets the pieces back to their original states.
    setTimeout(() => {
        shiftIcon("promotion-pawn-white", 0, 80);
        shiftIcon("promotion-pawn-black", 0, -40);
        document.getElementById("promotion-pawn-white").style.opacity = '1';
        document.getElementById("promotion-queen").style.opacity = '0';
    }, 7000);

    // Brings the play button back.
    setTimeout(() => {
        document.getElementById("promotion-animation-play-button").style.display = 'inline-block';
    }, 8000);
}

