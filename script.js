const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach((item) => {
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging');
  });
});

draggables.forEach((item) => {
  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(container, event.clientY);
    const draggable = document.querySelector('.dragging');

    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
