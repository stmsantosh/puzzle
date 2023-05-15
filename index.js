document.addEventListener("DOMContentLoaded", function() {
  const puzzlePieces = document.querySelectorAll(".puzzle-piece");
  const puzzleContainer = document.getElementById("puzzle-container");
  let activePiece = null;

  function dragStart(event) {
    event.target.style.zIndex = 1;
    activePiece = event.target;
  }

  function dragMove(event) {
    const { dx, dy } = event;
    const { x, y } = activePiece.dataset;
    const newX = parseFloat(x || 0) + dx;
    const newY = parseFloat(y || 0) + dy;

    activePiece.style.transform = `translate(${newX}px, ${newY}px)`;
    activePiece.dataset.x = newX;
    activePiece.dataset.y = newY;
  }

  function dragEnd() {
    activePiece.style.zIndex = 0;
    const { offsetWidth, offsetHeight } = puzzleContainer;
    const targetX = offsetWidth / 2 - activePiece.offsetWidth / 2;
    const targetY = offsetHeight / 2 - activePiece.offsetHeight / 2;

    if (
      Math.abs(parseFloat(activePiece.dataset.x) - targetX) <= 10 &&
      Math.abs(parseFloat(activePiece.dataset.y) - targetY) <= 10
    ) {
      activePiece.style.transform = `translate(${targetX}px, ${targetY}px)`;
    } else {
      activePiece.style.transform = "";
      activePiece.dataset.x = 0;
      activePiece.dataset.y = 0;
    }

    activePiece = null;
  }

  puzzlePieces.forEach((piece) => {
    piece.addEventListener("mousedown", dragStart);
    piece.addEventListener("touchstart", dragStart, { passive: true });
  });

  interact(puzzlePieces)
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      listeners: {
        move: dragMove,
        end: dragEnd
      }
    });
});
