const inputText = document.querySelector('#task-input');
const taskList = document.querySelector('.task-list');

inputText.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (inputText.value.trim() !== "") {
      updateList();
      inputText.value = "";
    } else {
      alert("You can’t submit an empty task!");
    }
  }
});

function updateList() {
  const taskText = inputText.value;
  if (taskText !== "") {
    const newList = document.createElement('li');

    const taskMain = document.createElement('div');
    taskMain.className = 'task-main';

    const newLabel = document.createElement('label');
    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';

    const taskSpan = document.createElement('span');
    taskSpan.innerText = taskText;

    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(taskSpan);
    taskMain.appendChild(newLabel);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.innerHTML = '<i class="fa fa-minus"></i>';
    removeButton.addEventListener('click', function () {
      taskList.removeChild(newList);
    });
    taskMain.appendChild(removeButton);

    newList.appendChild(taskMain);

    const dateAdded = document.createElement('div');
    dateAdded.className = "task-date";
    dateAdded.innerText = `Added: ${new Date().toLocaleString()}`;
    newList.appendChild(dateAdded);

    newCheckbox.addEventListener('change', function () {
      if (newCheckbox.checked) {
        taskSpan.style.textDecoration = "line-through";
        taskSpan.style.color = "gray";

        const oldCompleted = newList.querySelector('.completed-date');
        if (oldCompleted) oldCompleted.remove();

        const dateCompleted = document.createElement('div');
        dateCompleted.className = "task-date completed-date";
        dateCompleted.innerText = `Completed: ${new Date().toLocaleString()}`;
        newList.appendChild(dateCompleted);

      } else {
        taskSpan.style.textDecoration = "none";
        taskSpan.style.color = "black";

        const oldCompleted = newList.querySelector('.completed-date');
        if (oldCompleted) oldCompleted.remove();
      }
    });

    taskList.appendChild(newList);
  }
  inputText.value = "";
}