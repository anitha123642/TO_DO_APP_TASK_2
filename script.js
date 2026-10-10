const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const taskCount =
    document.getElementById("taskCount");

const emptyMessage =
    document.getElementById("emptyMessage");

const progressFill =
    document.getElementById("progressFill");

const progressPercent =
    document.getElementById("progressPercent");


let tasks =
    JSON.parse(
        localStorage.getItem("todoTasks")
    ) || [];



/* Save Tasks */

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}



/* Add Task */

function addTask() {

    const text =
        taskInput.value.trim();

    if (text === "") {

        taskInput.focus();

        return;
    }


    tasks.push({

        text: text,

        completed: false

    });


    saveTasks();

    displayTasks();

    taskInput.value = "";

    taskInput.focus();
}



/* Display Tasks */

function displayTasks() {

    taskList.innerHTML = "";


    tasks.forEach(
        (task, index) => {

            const li =
                document.createElement("li");


            if (task.completed) {

                li.classList.add(
                    "completed"
                );

            }


            /* Checkbox */

            const checkbox =
                document.createElement(
                    "input"
                );

            checkbox.type = "checkbox";

            checkbox.className =
                "task-check";

            checkbox.checked =
                task.completed;


            checkbox.addEventListener(
                "change",
                () => {

                    tasks[index].completed =
                        checkbox.checked;

                    saveTasks();

                    displayTasks();

                }
            );


            /* Text */

            const span =
                document.createElement(
                    "span"
                );

            span.className =
                "task-text";

            span.textContent =
                task.text;


            /* Delete */

            const deleteBtn =
                document.createElement(
                    "button"
                );

            deleteBtn.className =
                "delete-btn";

            deleteBtn.textContent =
                "🗑️";

            deleteBtn.title =
                "Delete task";


            deleteBtn.addEventListener(
                "click",
                () => {

                    tasks.splice(
                        index,
                        1
                    );

                    saveTasks();

                    displayTasks();

                }
            );


            li.append(
                checkbox,
                span,
                deleteBtn
            );


            taskList.appendChild(li);

        }
    );


    updateProgress();
}



/* Progress */

function updateProgress() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    progressFill.style.width =
        percentage + "%";


    progressPercent.textContent =
        percentage + "%";


    taskCount.textContent =
        total === 1
            ? "1 task"
            : `${total} tasks`;


    if (total === 0) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";

    }
}



/* Enter Key */

taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);



/* Start */

displayTasks();