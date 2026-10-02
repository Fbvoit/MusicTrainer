const modeSelect = document.getElementById("modeSelect");
const generateButton = document.getElementById("generateButton");
const positionsElement = document.getElementById("positions");
const timerInput = document.getElementById("timerInput");
const timerButton = document.getElementById("timerButton");

let timerId = null;


let state = {
    positions: []
};


function createPositionItems(position) {

    const selectedLists = position.lists.map(
        name => lists[name]
    );


    if (position.type === "list") {
        return createFromList(selectedLists[0]);
    }


    if (position.type === "combination") {
        return createCombination(...selectedLists);
    }


    throw new Error(
        `Неизвестный тип позиции: ${position.type}`
    );
}


function initializeMode() {

    const modeName = modeSelect.value;
    const mode = modes[modeName];


    state.positions = mode.map(position => ({
        items: createPositionItems(position),
        index: 0
    }));


    render();
}


function next() {

    state.positions.forEach(position => {

        position.index++;

        if (position.index >= position.items.length) {

            position.items = shuffle(position.items);
            position.index = 0;
        }

    });


    render();
}


function render() {

    positionsElement.innerHTML = "";


    state.positions.forEach((position, index) => {

        const element = document.createElement("div");

        element.className = "position";


        const title = document.createElement("div");

        title.className = "position-title";

        title.textContent = `Позиция ${index + 1}`;


        const value = document.createElement("div");

        value.className = "position-value";

        value.textContent =
            position.items[position.index];


        element.appendChild(title);
        element.appendChild(value);

        positionsElement.appendChild(element);
    });
}


modeSelect.addEventListener("change", () => {
    stopTimer();
    initializeMode();
});


generateButton.addEventListener(
    "click",
    next
);

timerButton.addEventListener("click", toggleTimer);

function toggleTimer() {

    if (timerId !== null) {
        stopTimer();
    } else {
        startTimer();
    }
}


function startTimer() {

    const seconds = Number(timerInput.value);

    if (seconds <= 0) {
        return;
    }

    timerId = setInterval(() => {
        next();
    }, seconds * 1000);

    timerButton.textContent = "Стоп";
}


function stopTimer() {

    clearInterval(timerId);

    timerId = null;

    timerButton.textContent = "Старт";
}


initializeMode();