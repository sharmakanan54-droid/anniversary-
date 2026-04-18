let score = 0;

const story = {
  start: {
    text: "Happy 1 Year Vibhu ❤️\n\nI made something for you...",
    image: "",
    choices: [
      { text: "Start our journey ❤️", next: "meet" }
    ]
  },

  meet: {
    text: "We met Vibhu on Hinge… and somehow that one swipe turned into something really special.",
    image: "",
    choices: [
      { text: "Next", next: "date_input" }
    ]
  },

  /* ✨ INPUT QUESTION */
  date_input: {
    text: "Our first date was on 20th April.\n\nType where we went:",
    image: "images/date.jpg",
    input: true,
    answer: ["mall", "big chill", "big chill cafe","dlf noida","Mall","Dlf Noida","Dlf Mall of India","Big Chill"]
  },

  date_correct: {
    text: "Yesss ❤️\n\nWe had pasta at Big Chill and then to went to arcade",
    image: "images/date.jpg",
    choices: [
      { text: "Next", next: "memory" }
    ]
  },

  date_wrong: {
    text: "Nope \n\nIt was the mall… Big Chill Cafe… pasta… ",
    image: "images/date.jpg",
    choices: [
      { text: "Okay okay next", next: "memory" }
    ]
  },

  memory: {
    text: "We walked and talked alot \n\nBut sitting in Homecentre with you was honestly so cute.",
    image: "images/date.jpg",
    choices: [
      { text: "Next", next: "movie_input" }
    ]
  },

  /* ✨ SECOND INPUT QUESTION */
  movie_input: {
    text: "What was the first movie we watched together?",
    image: "images/movie.jpg",
    input: true,
    answer: ["perks", "perks of being a wallflower", "wallflower","the perks of being a wallflower", "The perks of being a wallflower"]
  },

  movie_correct: {
    text: "Of course ❤️\n\nWe watched it on Discord and talked for so long after.",
    image: "images/movie.jpg",
    choices: [
      { text: "Next", next: "final" }
    ]
  },

  movie_wrong: {
    text: "Nope 😝\n\nIt was The Perks of Being a Wallflower… and that call meant a lot.",
    image: "images/movie.jpg",
    choices: [
      { text: "Next", next: "final" }
    ]
  },

  final: {
    text: "This year with you has been soft, warm, and really special.",
    image: "",
    choices: [
      { text: "One more thing...", next: "end" }
    ]
  },

  end: {
    text: "365 days and more <3",
    image: "",
    choices: []
  }
};

const textElement = document.getElementById("text");
const choicesElement = document.getElementById("choices");
const imageElement = document.getElementById("image");

/* ✨ typing */
function typeText(text, index = 0) {
  if (index < text.length) {
    textElement.innerHTML += text.charAt(index);
    setTimeout(() => typeText(text, index + 1), 25);
  }
}

/* ✨ normalize text */
function normalize(input) {
  return input.toLowerCase().trim();
}

function showScene(sceneKey) {
  const scene = story[sceneKey];

  textElement.innerHTML = "";
  choicesElement.innerHTML = "";

  /* image */
  if (scene.image) {
    imageElement.src = scene.image;
    imageElement.style.display = "block";
  } else {
    imageElement.style.display = "none";
  }

  typeText(scene.text);

  /* ✨ INPUT MODE */
  if (scene.input) {
    const input = document.createElement("input");
    input.placeholder = "Type your answer...";
    input.style.padding = "10px";
    input.style.borderRadius = "15px";
    input.style.border = "none";
    input.style.marginTop = "15px";
    input.style.width = "90%";

    const button = document.createElement("button");
    button.innerText = "Submit";

    button.onclick = () => {
      const userAnswer = normalize(input.value);

      const isCorrect = scene.answer.some(ans =>
        userAnswer.includes(ans)
      );

      if (isCorrect) {
        score++;
        if (sceneKey === "date_input") showScene("date_correct");
        else if (sceneKey === "movie_input") showScene("movie_correct");
      } else {
        if (sceneKey === "date_input") showScene("date_wrong");
        else if (sceneKey === "movie_input") showScene("movie_wrong");
      }
    };

    choicesElement.appendChild(input);
    choicesElement.appendChild(button);

    return;
  }

  /* normal buttons */
  scene.choices?.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice.text;

    button.onclick = () => {
      if (choice.correct === true) score++;
      showScene(choice.next);
    };

    choicesElement.appendChild(button);
  });
}

showScene("start");