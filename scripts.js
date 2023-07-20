
// takes localStorage and makes it a global variable
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');


    // every time todo is called, clear all the elements
    todoList.innerHTML = '';

    // Loop through todos, works because todo is a global variable
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        // adding attributes
        input.type = 'checkbox';
        input.checked = todo.done; 
        span.classList.add('bubble');

        //checks category, addes the appropriate class
        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        // adds html tag to content div
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        // adding tags inside of the divs and such
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        // sets todo task to done
        if (todo.done) {
            todoItem.classList.add('done')
        }

        // adds functionality to check box, if clicked mark out task
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos))

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            // Display changes
            DisplayTodos();
        })

        // edit functionality
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readOnly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })


        // delete button functionality 
        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos()
        })

    });


}

// todo
// order by Date
// change colors
// dark mode 