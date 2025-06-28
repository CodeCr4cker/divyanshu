// slightly modified https://stackoverflow.com/questions/3177836/
// how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " ano atrás";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " mese atrás";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " dia atrás";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " horas atrás";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutos atrás";
  }

  if (seconds < 10) {
    return "agora";
  }

  return Math.floor(seconds) + " segundos ago";
};

//? In regular app you will fetch these dat from api

//? defined commenters
const users = {
  alex1: {
    name: "Programador Designer Pro",
    src: "assets/logo.png",
  },
  anna1: {
    name: "Anna Luiza",
    src: "assets/anna.jpg",
  },
  drew1: {
    name: "Marcos Silva",
    src: "assets/drew.jpg",
  },
  liliya: {
    name: "Lili Fernandes",
    src: "assets/liliya.jpg",
  },
};

//? currently logged user
const loggedUser = users["alex1"];

//? defined comments
let comments = [
  {
    id: 1,
    text: "Eai galera, já curtiram esse post? &#128526.",
    author: users["liliya"],
    createdAt: "2023-09-03 12:00:00",
  },
  {
    id: 2,
    text: "Eu curto todos, e salvo para consultar sempre que eu precisar.",
    author: users["anna1"],
    createdAt: "2023-09-03 11:00:00",
  },
  {
    id: 3,
    text: "Esse eu vou até compartilhar com meus amigos!",
    author: users["drew1"],
    createdAt: "2023-09-02 10:00:00",
  },
];

const authedUser = document.querySelector(".authed-user");

const authorHTML = DOMPurify.sanitize(
  `<img class="avatar" src="${loggedUser.src}" alt="${loggedUser.name}">`
);

authedUser.innerHTML = authorHTML;

const commentsWrapper = document.querySelector(".discussion__comments");

//? generate comment HTML based on comment object
const createComment = (comment) => {
  const newDate = new Date(comment.createdAt);
  //? sanitize comment HTML
  return DOMPurify.sanitize(`<div class="comment">
        <div class="avatar">
            <img
                class="avatar"
                src="${comment.author.src}"
                alt="${comment.author.name}"
            >
        </div>
        <div class="comment__body">
            <div class="comment__author">
                ${comment.author.name}
                <time
                    datetime="${comment.createdAt}"
                    class="comment__date"
                >
                    ${timeSince(newDate)}
                </time>
            </div>
            <div class="comment__text">
                <p>${comment.text}</p>
            </div>
        </div>
    </div>`);
};

//? prepare comments to be written to DOM
const commentsMapped = comments.map((comment) => createComment(comment));

//? write comments to DOM
const innerComments = commentsMapped.join("");
commentsWrapper.innerHTML = innerComments;

const newCommentForm = document.getElementById("newcomment__form");
const newCommentTextarea = document.querySelector("#newcomment__form textarea");

document.getElementById("reset-button").addEventListener("click", () => {
  newCommentForm.reset();
  document.location.reload();
});

newCommentForm.addEventListener("submit", (e) => {
  e.stopPropagation();
  e.preventDefault();
  const newCommentTextareaValue = newCommentTextarea.value;

  const newComment = {
    id: comments.length + 1,
    text: newCommentTextareaValue,
    author: loggedUser,
    createdAt: new Date().toISOString(),
  };

  const comment = document.createElement("div");
  comment.innerHTML = createComment(newComment);

  if (commentsWrapper.hasChildNodes()) {
    commentsWrapper.insertBefore(comment, commentsWrapper.childNodes[0]);
  } else {
    commentsWrapper.appendChild(comment);
  }

  //? reset form after submit
  newCommentForm.reset();
});
