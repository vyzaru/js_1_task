async function getTodo() {
    let xhrTodos = new XMLHttpRequest();
    xhrTodos.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    xhrTodos.send();

    xhrTodos.onload = function () {
      let todos = JSON.parse(xhrTodos.response);

      if (Array.isArray(todos) && todos.length > 0) {
        let xhrUsers = new XMLHttpRequest();
        xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
        xhrUsers.send();

        xhrUsers.onload = function () {
          let users = JSON.parse(xhrUsers.response);

          if (Array.isArray(users) && users.length > 0) {
            todos.forEach((todo, index) => {
              let row = '<tr>';
              let user = users.find((user) => user.id === todo.userId);
              row += '<td>' + (index + 1) + '</td>';
              row += '<td>' + user.name + '</td>';
              row += '<td>' + todo.title + '</td>';
              row += '<td><input type="checkbox" ' + (todo.completed ? 'checked' : '') + ' disabled/></td>';
              row += '</tr>';

              $('table tbody').append(row);
            });
          }
        };
      }
    };
  }