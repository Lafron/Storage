'use strict';

const todoControl = document.querySelector(".todo-control");

const myToDo = {
    headerInput: document.querySelector(".header-input"),
    todoList: document.querySelector(".todo-list"),
    todoCompleted: document.querySelector(".todo-completed"),

    todoRemove: document.querySelector("todo-remove"),

    todoData:[],
    //localStorage.clear();

    render: () => {
        myToDo.todoList.innerHTML = "";
        myToDo.todoCompleted.innerHTML = "";

        myToDo.todoData.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("todo-item");

            item.id = myToDo.todoData.indexOf(item);

            li.innerHTML += "<span class='text-todo'>" + item.text + "</span>" +
            "<div class='todo-buttons'>" +
            "<button id=" + item.id +" class='todo-remove'></button>" +
            "<button class='todo-complete'></button></div></li>";

            if(item.completed){
                myToDo.todoCompleted.append(li);
            }
            else{
                myToDo.todoList.append(li);
            }
        
            li.querySelector(".todo-complete").addEventListener("click", () => {
                item.completed = !item.completed;
                myToDo.render();
            });

            li.querySelector(".todo-remove").addEventListener("click", event => {
                let id = event.target.id;

                myToDo.todoData.splice(id, 1);
                localStorage.todo = JSON.stringify(myToDo.todoData);

                myToDo.render();
            });
        });
    
    },

    handler: event => {
        event.preventDefault();

        if(myToDo.headerInput.value == ""){
            alert("Enter valid string!");
        }
        else{
            const newTodo = {
                id: 0,
                text: myToDo.headerInput.value,
                completed: false
            };
            myToDo.todoData.push(newTodo);
            myToDo.headerInput.value = "";

            localStorage.todo = JSON.stringify(myToDo.todoData);
        }

        myToDo.render();
    }

};

window.onload = () => {
    todoControl.addEventListener("submit", myToDo.handler);

    if(localStorage.todo != null){
        myToDo.todoData = JSON.parse(localStorage.todo);
        myToDo.render();
    }
};


