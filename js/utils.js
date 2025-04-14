let currentPage = 1;
let currentPage2 = 1;
let maxPage = 0;
let maxPage2 = 0;
labelArr = [
  {
    content: "label1",
    color: "#4bce97",
  },
  {
    content: "label2",
    color: "#f5cd47",
  },
  {
    content: "label3",
    color: "#fea362",
  },
];
let backGroundColorIndexLabel = 0;
let colorItems = document.getElementsByClassName("itemLabelCreate");
let colorIcon = document.querySelectorAll(".itemLabelCreate .fa-circle-check");

for (let i = 0; i < colorItems.length; i++) {
  colorItems[i].addEventListener("click", function () {
    backGroundColorIndexLabel = i;

    for (let j = 0; j < colorIcon.length; j++) {
      colorIcon[j].style.display = i === j ? "block" : "none";
    }
  });
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function signUp() {
  let email = document.getElementById("email").value.trim();
  let userName = document.getElementById("userName").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  if (email.length == 0 || userName.length == 0 || pass.length == 0) {
    errorNotice(1);
    return;
  }
  if (email.includes("@gmail.com")) {
    if (email.length > 10) {
    } else {
      errorNotice(4);
      return;
    }
  } else if (email.includes("@gmail.vn")) {
    if (email.length > 9) {
    } else {
      errorNotice(4);
      return;
    }
  } else {
    errorNotice(4);
    return;
  }
  if (pass.length < 8) {
    errorNotice(5);
    return;
  }
  let existingUser = users.find((item) => item.email === email);
  if (existingUser) {
    existingNotice();
    return;
  }
  let newUser = {
    id: users.length + 1,
    username: userName,
    email: email,
    password: pass,
    created_at: new Date().toISOString(),
    boards: [],
  };
  setTimeout(() => {
    window.location = "../page/sign_in.html";
  }, 1000);

  users.push(newUser);
  saveUsers(users);
  successNotice();
}
function signIn() {
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("pass").value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  if (email.length == 0 || pass.length == 0) {
    errorNotice(2);
    return;
  }
  let user = users.find(
    (item) => item.email === email && item.password === pass
  );
  if (user) {
    localStorage.setItem("email", email);
    successNotice();
    setTimeout(() => {
      window.location = "../page/dashBoard.html";
    }, 1000);
  } else {
    errorNotice(3);
  }
}

function createLabel() {
  const labelColors = [
    "#baf3db",
    "#f8e6a0",
    "#fedce8",
    "#ffd5d2",
    "#dfd8fd",
    "#4bce97",
    "#f5cd47",
    "#fea362",
    "#f87168",
    "#9f8fef",
  ];
  let value = document.getElementById("createTitleLabel").value;

  if (value.trim().length == 0) {
    document.getElementById("noticeCreate").classList.remove("hideLabel");
  } else {
    document.getElementById("noticeCreate").classList.add("hideLabel");
    let newLabel = {
      content: value,
      color: labelColors[backGroundColorIndexLabel],
    };

    let labelArr = JSON.parse(localStorage.getItem("labelArr")) || [];
    labelArr.push(newLabel);
    localStorage.setItem("labelArr", JSON.stringify(labelArr));

    window.location = "./labels.html";
  }
}
function openEditLabel(index) {
  localStorage.setItem("labelIndex", index);
  window.location = "./editLabels.html";
}
function deleteLabel() {
  let index = localStorage.getItem("labelIndex");

  let labelArr = JSON.parse(localStorage.getItem("labelArr")) || [];
  labelArr.splice(index, 1);
  localStorage.setItem("labelArr", JSON.stringify(labelArr));
  window.location = "./labels.html";
}

function editLabel() {
  let index = localStorage.getItem("labelIndex");

  const labelColors = [
    "#baf3db",
    "#f8e6a0",
    "#fedce8",
    "#ffd5d2",
    "#dfd8fd",
    "#4bce97",
    "#f5cd47",
    "#fea362",
    "#f87168",
    "#9f8fef",
  ];
  let value = document.getElementById("editTitleLabel").value;

  if (value.trim().length == 0) {
    document.getElementById("noticeEdit").classList.remove("hideLabel");
  } else {
    document.getElementById("noticeEdit").classList.add("hideLabel");
    let labelArr = JSON.parse(localStorage.getItem("labelArr")) || [];

    labelArr[index].content = value;
    labelArr[index].color = labelColors[backGroundColorIndexLabel];
    localStorage.setItem("labelArr", JSON.stringify(labelArr));
    window.location = "./labels.html";
  }
}

function renderLabels() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) return;

  let boards = user.boards;
  const boardIndex = localStorage.getItem("boardIndex");
  let labelArr = JSON.parse(localStorage.getItem("labelArr")) || [];

  let labelsList = document.getElementById("choiceLabel");
  let labelStr = "";

  for (let i = 0; i < labelArr.length; i++) {
    labelStr += `
      <div class="item">
        <input id="checkBoxLabel${i}" type="checkbox">
        <div style="background-color:${labelArr[i].color};" class="color1">${labelArr[i].content}</div>
        <button onclick="openEditLabel(${i})" class="btnItem">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    `;
  }

  labelsList.innerHTML = labelStr;

  let task = boards[boardIndex].lists[listIndex].tasks[taskIndex];
  if (task.tag.length === 1) {
    let tagContent = task.tag[0].content;
    for (let i = 0; i < labelArr.length; i++) {
      if (labelArr[i].content === tagContent) {
        document.getElementById(`checkBoxLabel${i}`).checked = true;
      }
    }
  }

  for (let i = 0; i < labelArr.length; i++) {
    let checkbox = document.getElementById(`checkBoxLabel${i}`);
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        for (let j = 0; j < labelArr.length; j++) {
          if (j !== i) {
            document.getElementById(`checkBoxLabel${j}`).checked = false;
          }
        }

        localStorage.setItem("labelTemp", JSON.stringify(labelArr[i]));
      } else {
        localStorage.setItem("labelTemp", 0);
      }
    });
  }
}

function errorNotice(status) {
  let errorElement = document.getElementById("error");
  if (status == 1) {
    document.getElementById("existing").innerHTML = `
  <p>Password cannot be empty or</p>
  <p>username cannot be empty or</p>
  <p>email cannot be empty</p>
  `;
  }
  if (status == 2) {
    document.getElementById("existing").innerHTML = `
 <p>Password cannot be empty or</p>
  <p>email cannot be empty</p>
  `;
  }
  if (status == 3) {
    document.getElementById("existing").innerHTML = `
  <p>Email or password is incorrect</p>
  `;
  }
  if (status == 4) {
    document.getElementById("existing").innerHTML = `
  <p>Invalid email</p>
  `;
  }
  if (status == 5) {
    document.getElementById("existing").innerHTML = `
  <p>The password must be more than 8 characters</p>
  `;
  }
  errorElement.style.display = "flex";
  errorElement.style.opacity = "1";
  setTimeout(() => {
    errorElement.style.transition = "opacity 1s";
    errorElement.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 2000);
}

function existingNotice() {
  document.getElementById("existing").innerHTML = `
  <p>Email is already taken</p>
  `;
  let errorElement = document.getElementById("error");
  errorElement.style.display = "flex";
  errorElement.style.opacity = "1";
  setTimeout(() => {
    errorElement.style.transition = "opacity 1s";
    errorElement.style.opacity = "0";
  }, 2000);
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 2000);
}

function successNotice() {
  let successElement = document.getElementById("success");
  successElement.style.display = "flex";
  successElement.style.opacity = "1";
  setTimeout(() => {
    successElement.style.transition = "opacity 1s ease-in-out";
    successElement.style.opacity = "0";
  }, 2000);

  setTimeout(() => {
    successElement.style.display = "none";
  }, 3000);
}

function moveToSignUp() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  window.location = "../page/sign_up.html";
}
function moveToSignIn() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  window.location = "../page/sign_in.html";
}

function createNewBoard() {
  window.location = "./creatNewBoard.html";
}
function openBoard(index) {
  localStorage.setItem("boardIndex", index);
  window.location = "./board.html";
}

function boardRender() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) return;

  let boards = user.boards;
  const boardIndex = localStorage.getItem("boardIndex");
  const currentBoard = boards[boardIndex];
  const isClosed = currentBoard.status === "close";

  let title = document.getElementById("titleBoard");
  title.innerHTML =
    currentBoard.title +
    `<i id="starHaha" onclick="starredBoard(${boardIndex})" class="fa-solid fa-star"></i>`;
  if (currentBoard.is_starred) {
    document.getElementById("starHaha").style.color = "#F2D21E";
  }

  let listYourBoard = document.getElementById("listYourBoard");
  let YourBoardStr = "";
  for (let i = 0; i < boards.length; i++) {
    YourBoardStr += `<li onclick="openBoard(${i})">${boards[i].title}</li>`;
  }
  listYourBoard.innerHTML = YourBoardStr;

  let bigList = document.getElementById("bigList");
  let bigListStr = "";

  for (let i = 0; i < currentBoard.lists.length; i++) {
    bigListStr += `
      <div class="list1">
        <input type="text" id="editTitle${i}" class="editTitle hideAdd ${
      isClosed ? "hideAdd" : ""
    }">
        <button onclick="saveTitle(${i})" id="titleSave${i}" class="titleSave hideAdd ${
      isClosed ? "hideAdd" : ""
    }">Save</button>
        <span id="editNotice${i}" class="noticeEdit hideAdd">Title cannot be empty!!!!</span>
        <p>${currentBoard.lists[i].title}</p>
        <i class="fa-solid fa-down-left-and-up-right-to-center"></i>
        ${
          !isClosed
            ? `<i onclick="openBoardDetail(${i})" class="fa-solid fa-ellipsis"></i>`
            : ""
        }
        ${
          !isClosed
            ? `
        <div id="menuBoard${i}" class="menu hideAdd">
          <button onclick="edit(${i})" class="edit">Edit</button>
          <button>
            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteTaskModal">Delete</a>
          </button>
        </div>`
            : ""
        }
        <div class="taskList1">
          <ul id="listToDo${i}"></ul>
          <div id="addToDoItem${i}" class=" hideAdd ${
      isClosed ? "hideAdd" : ""
    }">
            <input class="addItemText" id="textAddToDo${i}" type="text" />
            <button class="buttonAddTask" onclick="buttonAddTodo(${i})">Add</button>
            <p id="taskNotice${i}" class="taskNotice hideAdd">😭 Task cannot be empty!</p>
          </div>
        </div>
        <a class="addItem ${
          isClosed ? "hideAdd" : ""
        }" onclick="addToDo(${i})" href="">
          <i class="fa-solid fa-plus"></i><span>Add a card</span>
        </a>
        <i class="fa-solid fa-pager"></i>
      </div>
    `;
  }

  bigList.innerHTML =
    bigListStr +
    `<div class="list3">
        <a href="../page/addListToDo.html" ${isClosed ? 'class="hideAdd"' : ""}>
          <i class="fa-solid fa-plus"></i> <p>Add another list</p>
        </a>
      </div>`;

  for (let i = 0; i < currentBoard.lists.length; i++) {
    for (let j = 0; j < currentBoard.lists[i].tasks.length; j++) {
      document.getElementById(`listToDo${i}`).innerHTML += `
        <li>
          <button onclick="openDetailTask(${i},${j})">
            <i id="completeTask${i}${j}" class="fa-solid hideAdd fa-circle-check"></i>
            ${currentBoard.lists[i].tasks[j].title}
          </button>
        </li>
      `;
    }
  }

  for (let i = 0; i < currentBoard.lists.length; i++) {
    for (let j = 0; j < currentBoard.lists[i].tasks.length; j++) {
      if (currentBoard.lists[i].tasks[j].status === "complete") {
        document
          .getElementById(`completeTask${i}${j}`)
          .classList.remove("hideAdd");
      }
    }
  }
}

function saveTitle(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");
  let value = document.getElementById(`editTitle${index}`).value;

  if (value.trim().length == 0) {
    document.getElementById(`editNotice${index}`).classList.remove("hideAdd");
  } else {
    document.getElementById(`editNotice${index}`).classList.add("hideAdd");
    document.getElementById(`editTitle${index}`).classList.toggle("hideAdd");
    document.getElementById(`titleSave${index}`).classList.toggle("hideAdd");
    boards[boardIndex].lists[index].title = value;
    saveUsers(users);
    boardRender();
  }
}

function edit(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");
  let value = document.getElementById(`editTitle${index}`).value;

  let edit = document.getElementById(`editTitle${index}`);
  edit.classList.remove("hideAdd");
  document.getElementById(`menuBoard${index}`).classList.toggle("hideAdd");
  document.getElementById(`titleSave${index}`).classList.toggle("hideAdd");
  document.getElementById(`editTitle${index}`).value =
    boards[boardIndex].lists[index].title;
}

function renderDetail() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");
  if (boards.length == 0) {
  } else {
    if (
      boards[boardIndex].lists[listIndex].tasks[taskIndex].status == "complete"
    ) {
      document.getElementById("checkOn").classList.remove("hide");
    }

    let description = document.getElementById("description");
    description.innerHTML =
      boards[boardIndex].lists[listIndex].tasks[taskIndex].description;

    let moveTask = document.getElementById("moveTask");
    let moveTaskStr = "";
    for (let i = 0; i < boards[boardIndex].lists.length; i++) {
      if (
        boards[boardIndex].lists[i].title !=
        boards[boardIndex].lists[listIndex].title
      ) {
        moveTaskStr += `
    <option value="${boards[boardIndex].lists[i].title}">${boards[boardIndex].lists[i].title}</option>
    `;
      }
    }
    moveTask.innerHTML =
      `
    <option value="${boards[boardIndex].lists[listIndex].title}">${boards[boardIndex].lists[listIndex].title}</option>
    ` + moveTaskStr;
  }
}

function complete() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");
  document.getElementById("checkOn").classList.add("hide");
  boards[boardIndex].lists[listIndex].tasks[taskIndex].status = "pending";
}
function pending() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;
  const boardIndex = localStorage.getItem("boardIndex");
  document.getElementById("checkOn").classList.remove("hide");
  boards[boardIndex].lists[listIndex].tasks[taskIndex].status = "complete";
}

function saveEditDetail() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");
  let check = document.getElementById("checkOn").classList;

  if (check.contains("hide")) {
    boards[boardIndex].lists[listIndex].tasks[taskIndex].status = "pending";
    saveUsers(users);
  } else {
    boards[boardIndex].lists[listIndex].tasks[taskIndex].status = "complete";
    saveUsers(users);
  }
  let htmlContent = CKEDITOR.instances["description"].getData();
  let parser = new DOMParser();
  let doc = parser.parseFromString(htmlContent, "text/html");
  let description = doc.body.textContent || "";

  boards[boardIndex].lists[listIndex].tasks[taskIndex].description =
    description;
  saveUsers(users);

  let position = document.getElementById("moveTask").value;
  let newIndex = boards[boardIndex].lists.findIndex(
    (item) => item.title == position
  );

  let tempTask = boards[boardIndex].lists[listIndex].tasks[taskIndex];

  boards[boardIndex].lists[newIndex].tasks.push(tempTask);

  boards[boardIndex].lists[listIndex].tasks.splice(taskIndex, 1);
  let label = JSON.parse(localStorage.getItem("labelTemp"));

  if (label != 0) {
    if (tempTask.tag.length == 1) {
      tempTask.tag.splice(0, 1, label);
    } else if (tempTask.tag.length == 0) {
      tempTask.tag.push(label);
    }
  } else {
    if (boards[boardIndex].lists[listIndex].tasks[taskIndex].tag.length > 0) {
      tempTask.tag.splice(0, 1);
    }
  }

  let dateFilter = localStorage.getItem("dateFilter");

  saveUsers(users);

  renderDetail();
}

function openBoardDetail(index) {
  localStorage.setItem("listIndex", index);
  document.getElementById(`menuBoard${index}`).classList.toggle("hideAdd");
}

function openDetailTask(listIndex, taskIndex) {
  localStorage.setItem("listIndex", listIndex);
  localStorage.setItem("taskIndex", taskIndex);

  window.location = "./taskDetailModal.html";
}
function deleteTask() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");

  if (boards[boardIndex].lists[listIndex].tasks.length > 0) {
    boards[boardIndex].lists[listIndex].tasks.splice(taskIndex, 1);
    saveUsers(users);
    window.location = "./board.html";
  } else if (boards[boardIndex].lists[listIndex].tasks.length == 0) {
  }
}
function backLabel() {
  window.location = "./labels.html";
}

function nextCreateLabel() {
  window.location = "./createLabels.html";
}

function deleteList() {
  let index = localStorage.getItem("listIndex");

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");
  boards[boardIndex].lists.splice(index, 1);
  saveUsers(users);
  boardRender();
}

function addNewList() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");

  let newTitle = document.getElementById("newTitle").value;
  if (newTitle.trim().length == 0) {
    document.getElementById("notice").innerHTML =
      "👋 Please provide a valid board title.";
  } else {
    document.getElementById("notice").innerHTML = "👋 Good hehee";

    let newList = {
      title: newTitle,
      tasks: [],
      created_at: new Date().toISOString(),
    };
    boards[boardIndex].lists.push(newList);
    saveUsers(users);

    window.location = "./board.html";
  }
}

function buttonAddTodo(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;
  const boardIndex = localStorage.getItem("boardIndex");

  let value = document.getElementById(`textAddToDo${index}`).value;

  if (value.trim().length == 0) {
    document.getElementById(`taskNotice${index}`).classList.remove("hideAdd");
  } else if (value.trim().length != 0) {
    document.getElementById(`taskNotice${index}`).classList.add("hideAdd");
    let newTask = {
      title: value,
      description: "",
      status: "pending",
      created_at: new Date().toISOString(),
      tag: [],
    };
    boards[boardIndex].lists[index].tasks.push(newTask);
    saveUsers(users);
    boardRender();
  }
}

function addToDo(index) {
  event.preventDefault();
  let addToDoItem = document.getElementById(`addToDoItem${index}`);
  addToDoItem.classList.toggle("hideAdd");
}

function starredBoard(index) {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  if (boards[index].is_starred == false) {
    boards[index].is_starred = true;

    saveUsers(users);
  } else if (boards[index].is_starred == true) {
    boards[index].is_starred = false;
    saveUsers(users);
  }
  boardRender();
}

function backBoard() {
  window.location = "./board.html";
}

function backDashBoard() {
  window.location = "./dashBoard.html";
}
function closeMenuDashboard() {
  let option = document.getElementById("option");
  option.classList.add("hide");
}
function openMenuDashboard() {
  let option = document.getElementById("option");
  option.classList.remove("hide");
}
function moveTask() {
  window.location = "./moveCard.html";
}
function description() {
  window.location = "./taskDetailModal.html";
}

function openEditBoard(index) {
  localStorage.setItem("editBoardIndex", index);
}
let indexEditBoard = localStorage.getItem("editBoardIndex");

let backGroundImageIndex = 0;
let backGroundColorIndex = -1;
let img = document.getElementsByClassName("imgCreate");
let imgIcons = document.querySelectorAll(".imgCreate + .fa-circle-check");
for (let i = 0; i < img.length; i++) {
  img[i].addEventListener("click", function () {
    backGroundImageIndex = i;
    backGroundColorIndex = -1;

    for (let j = 0; j < imgIcons.length; j++) {
      imgIcons[j].style.display = i === j ? "block" : "none";
    }
    for (let j = 0; j < colorIcons.length; j++) {
      colorIcons[j].style.display = "none";
    }
  });
}
let color = document.getElementsByClassName("color");
let colorIcons = document.querySelectorAll(".color .fa-circle-check");
for (let i = 0; i < color.length; i++) {
  color[i].addEventListener("click", function () {
    backGroundColorIndex = i;

    for (let j = 0; j < colorIcons.length; j++) {
      colorIcons[j].style.display = i === j ? "block" : "none";
    }
    for (let j = 0; j < imgIcons.length; j++) {
      imgIcons[j].style.display = "none";
    }
  });
}

function UpdateBoard() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  let value = document.getElementById("titleEdit").value.trim();
  document.getElementById("titleEdit").value = boards[indexEditBoard].title;
  if (value.length == 0) {
    let notice = document.getElementById("createNewBoardNotice");
    notice.innerHTML = `
    Title can not be empty
    `;
  } else {
    let notice = document.getElementById("createNewBoardNotice");
    notice.innerHTML = `
    👋 Please provide a valid board title.
    `;

    if (backGroundColorIndex == -1) {
      boards[indexEditBoard].title = value;
      boards[indexEditBoard].backdrop = `../assets/image/backgroundCreate${
        backGroundImageIndex + 1
      }.jpeg`;

      saveUsers(users);
    }
    if (backGroundColorIndex >= 0) {
      boards[indexEditBoard].title = value;
      boards[indexEditBoard].backdrop = `color${backGroundColorIndex + 1}`;

      saveUsers(users);
    }

    saveUsers(users);
    window.location = "./dashBoard.html";
  }
}

function NewBoard() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  let value = document.getElementById("title").value.trim();
  if (value.length == 0) {
    let notice = document.getElementById("createNewBoardNotice");
    notice.innerHTML = `
    Title can not be empty
    `;
  } else {
    let notice = document.getElementById("createNewBoardNotice");
    notice.innerHTML = `
    👋 Please provide a valid board title.
    `;
    if (backGroundColorIndex == -1) {
      let newBoard = {
        id: "",
        title: value,
        description: "",
        backdrop: `../assets/image/backgroundCreate${
          backGroundImageIndex + 1
        }.jpeg`,
        is_starred: false,
        create_at: new Date().toISOString(),
        lists: [],
      };
      boards.push(newBoard);
      saveUsers(users);
    }
    if (backGroundColorIndex >= 0) {
      let newBoard = {
        id: "",
        title: value,
        description: "",
        backdrop: `color${backGroundColorIndex + 1}`,
        is_starred: false,
        create_at: new Date().toISOString(),
        lists: [],
      };
      boards.push(newBoard);
      saveUsers(users);
    }

    window.location = "./dashBoard.html";
  }
}

function deleteBoard() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  boards.splice(indexEditBoard, 1);
  saveUsers(users);

  window.location = "./dashBoard.html";
}

function render(page = currentPage, page2 = currentPage2) {
  currentPage = page;
  currentPage2 = page2;

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: false, // mặc định false, sẽ set lại bên dưới
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  let email = localStorage.getItem("email");

  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  let pages = Math.ceil(boards.length / 7);
  maxPage = pages;

  let starredBoards = boards.filter((board) => board.is_starred);
  let starBoard = starredBoards.length;
  let pages2 = Math.ceil(starBoard / 4);
  maxPage2 = pages2;

  let start = (page - 1) * 7;
  let end = page * 7;

  let start2 = (page2 - 1) * 4;
  let end2 = page2 * 4;

  let buttonPage = document.getElementById("pageDivide1");
  let strPage1 = ``;
  for (let i = 0; i < pages; i++) {
    strPage1 += `
      <button id="page${i + 1}" onclick="changePage(${i + 1})">${i + 1}</button>
    `;
  }

  let buttonPage2 = document.getElementById("pageDivide2");
  let strPage2 = ``;
  for (let i = 0; i < pages2; i++) {
    strPage2 += `
      <button id="page2${i + 1}" onclick="changePage2(${i + 1})">${
      i + 1
    }</button>
    `;
  }
  if (boards.length > 7) {
    buttonPage.innerHTML = `<button onclick="preBtn(${page})" class="pre">Pre</button>${strPage1}<button onclick="nextBtn(${page})" class="next">Next</button>`;
  }
  if (starBoard > 4) {
    buttonPage2.innerHTML = `<button onclick="preBtn2(${page2})" class="pre">Pre</button>${strPage2}<button onclick="nextBtn2(${page2})" class="next">Next</button>`;
  }

  if (boards.length == 0) {
    let strDashBoardList1 = `
      <div class="item newBoard">
        <button onclick="createNewBoard()" class="border">
          Create new board
        </button>
      </div>
    `;
    document.getElementById("dashBoardList1").innerHTML = strDashBoardList1;
  } else {
    let strDashBoardList1 = "";
    for (let i = 0; i < boards.length; i++) {
      if (i >= start && i < end) {
        if (boards[i].backdrop.includes("color")) {
          strDashBoardList1 += `
            <div onclick="openBoard(${i})" id="dashBoardItem" class="item dashBoardItem ${boards[i].backdrop}">
              <p>${boards[i].title}</p>
              <div onclick="openEditBoard(${i})" class="edit">
                <a href="../page/editBoard.html">
                  <i class="fa-solid fa-tag"></i> &nbsp;Edit this board
                </a>
              </div>
            </div>
          `;
        } else {
          strDashBoardList1 += `
            <div onclick="openBoard(${i})" id="dashBoardItem" class="item dashBoardItem">
              <img src="${boards[i].backdrop}" />
              <p>${boards[i].title}</p>
              <div onclick="openEditBoard(${i})" class="edit">
                <a href="../page/editBoard.html">
                  <i class="fa-solid fa-tag"></i> &nbsp;Edit this board
                </a>
              </div>
            </div>
          `;
        }

        if (
          (page === pages && i === boards.length - 1) ||
          (page < pages && i === end - 1)
        ) {
          strDashBoardList1 += `
            <div class="item newBoard">
              <button onclick="createNewBoard()" class="border">
                Create new board
              </button>
            </div>
          `;
        }
      }
    }
    document.getElementById("dashBoardList1").innerHTML = strDashBoardList1;
  }

  let strDashBoardList2 = "";
  let paginatedStarredBoards = starredBoards.slice(start2, end2);
  for (let i = 0; i < paginatedStarredBoards.length; i++) {
    let board = paginatedStarredBoards[i];
    if (boards[i].backdrop.includes("color")) {
      strDashBoardList2 += `
        <div onclick="openBoard(${i})" id="dashBoardItem" class="item dashBoardItem ${boards[i].backdrop}">
              <p>${boards[i].title}</p>
              <div onclick="openEditBoard(${i})" class="edit">
                <a href="../page/editBoard.html">
                  <i class="fa-solid fa-tag"></i> &nbsp;Edit this board
                </a>
              </div>
            </div>
          `;
    } else {
      strDashBoardList2 += `
        <div onclick="openBoard(${i})" id="dashBoardItem" class="item dashBoardItem">
          <img src="${boards[i].backdrop}" />
          <p>${board.title}</p>
          <div onclick="openEditBoard(${i})" class="edit">
            <a href="../page/editBoard.html">
              <i class="fa-solid fa-tag"></i> &nbsp;Edit this board
            </a>
          </div>
        </div>
      `;
    }
  }
  document.getElementById("dashBoardList2").innerHTML = strDashBoardList2;

  document.getElementById(`page${page}`).style.backgroundColor = "gray";
  document.getElementById(`page${page}`).style.color = "white";
  document.getElementById(`page2${page2}`).style.backgroundColor = "gray";
  document.getElementById(`page2${page2}`).style.color = "white";

  let boardIndex = localStorage.getItem("boardIndex");
}

function closeBoardRender() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: false, // mặc định false, sẽ set lại bên dưới
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  let email = localStorage.getItem("email");

  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }

  let boards = user.boards;
  let str = ``;

  for (let i = 0; i < boards.length; i++) {
    if (boards[i].status == "close") {
      console.log(1);
      if (boards[i].backdrop.includes("color")) {
        str += `
            <div onclick="openBoard(${i})" id="dashBoardItem" class="item dashBoardItem ${boards[i].backdrop}">
              <p>${boards[i].title}</p>
              <div onclick="openEditBoard(${i})" class="edit">
                <a href="../page/editBoard.html">
                  <i class="fa-solid fa-tag"></i> &nbsp;Edit this board
                </a>
              </div>
            </div>
          `;
      } else {
        str += `
            <div onclick="openBoard(${i})" id="dashBoardItem" class="item dashBoardItem">
              <img src="${boards[i].backdrop}" />
              <p>${boards[i].title}</p>
              <div onclick="openEditBoard(${i})" class="edit">
                <a href="../page/editBoard.html">
                  <i class="fa-solid fa-tag"></i> &nbsp;Edit this board
                </a>
              </div>
            </div>
          `;
      }
    }
    document.getElementById("dashBoardList3").innerHTML = str;
  }
}

function changePage(page) {
  render(page, currentPage2);
}

function changePage2(page2) {
  render(currentPage, page2);
}

function preBtn(page) {
  if (page > 1) {
    render(page - 1, currentPage2);
  }
}

function nextBtn(page) {
  if (page < maxPage) {
    render(page + 1, currentPage2);
  }
}

function preBtn2(page2) {
  if (page2 > 1) {
    render(currentPage, page2 - 1);
  }
}

function nextBtn2(page2) {
  if (page2 < maxPage2) {
    render(currentPage, page2 + 1);
  }
}

function openFilter() {
  window.location = "./filter.html";
}

function closeThisBoard() {
  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  let boardIndex = localStorage.getItem("boardIndex");

  boards[boardIndex].status = "close";
  saveUsers(users);
  location.reload();
}

function dateTime() {}

function selectDate(day) {
  const formattedDate = `${day}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;

  if (startDateCheckbox.checked) {
    selectedDateInput.value = formattedDate;
    dueDateCheckbox.checked = false;
    dueDateInput.value = "";
    dueDateInput.disabled = true;

    localStorage.setItem("dateFilter", formattedDate);
  } else if (dueDateCheckbox.checked) {
    dueDateInput.value = formattedDate;
    startDateCheckbox.checked = false;
    selectedDateInput.value = "";

    localStorage.setItem("dateFilter", formattedDate);
  }

  document
    .querySelectorAll(".day")
    .forEach((d) => d.classList.remove("selected"));
  event.target.classList.add("selected");
}

function filterRender() {
  let listIndex = localStorage.getItem("listIndex");
  let taskIndex = localStorage.getItem("taskIndex");

  let users = JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      password: "hashed_password",
      created_at: "2025-02-28T12:00:00Z",
      boards: [
        {
          id: 101,
          title: "Dự án Website",
          description: "Quản lý tiến độ dự án website",
          backdrop:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/640px-Cat_August_2010-4.jpg",
          is_starred: true,
          created_at: "2025-02-28T12:30:00Z",
          lists: [
            {
              id: 201,
              title: "Việc cần làm",
              created_at: "2025-02-28T13:00:00Z",
              tasks: [
                {
                  id: 301,
                  title: "Thiết kế giao diện",
                  description: "Tạo wireframe cho trang chủ",
                  status: "pending",
                  due_date: "2025-03-05T23:59:59Z",
                  tag: [
                    {
                      id: 401,
                      content: "Urgent",
                      color: "#fff",
                    },
                  ],
                  created_at: "2025-02-28T13:30:00Z",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  let email = localStorage.getItem("email");
  let user = users.find((item) => item.email === email);
  if (!user) {
    return;
  }
  let boards = user.boards;

  const boardIndex = localStorage.getItem("boardIndex");

  let list4 = document.getElementById("filterLabels");
  let str = ``;
  for (let j = 0; j < boards[boardIndex].lists.length; j++) {
    for (let i = 0; i < boards[boardIndex].lists[j].tasks.length; i++) {
      if (boards[boardIndex].lists[j].tasks[i].tag.length == 1) {
        str += `
            <div style="background-color:${boards[boardIndex].lists[j].tasks[i].tag[0].color};" class="label1 label"><input class="checkbox" type="checkbox"></div>
      
      `;
      }
    }
  }
  list4.innerHTML = str;
}
function signOut() {
  localStorage.removeItem("email");
  setTimeout(() => {
    window.location = "./sign_in.html";
  }, 500);
}
document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  if (path.includes("taskDetailModal.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    } else {
      renderDetail();
    }
  } else if (path.includes("labels.html")) {
    renderLabels();
  } else if (path.includes("closedBoard.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    } else {
      closeBoardRender();
    }
  } else if (path.includes("dates.html")) {
    dateTime();
  } else if (path.includes("filter.html")) {
    filterRender();
  } else if (path.includes("starredBoard.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    } else {
      render();
    }
  } else if (path.includes("boardFilter.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    } else {
      render();
    }
  } else if (path.includes("addListToDo.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("createLabels.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("creatNewBoard.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("dates.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("editBoard.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("editLabels.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("filter.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("moveCard.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("optionDetail.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else if (path.includes("taskDetailModal.html")) {
    if (localStorage.getItem("email") == null) {
      window.location = "./sign_in.html";
    }
  } else {
    render(currentPage, currentPage2);
  }
});
