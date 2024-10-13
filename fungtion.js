let memory = 0; // Initialize memory variable
let history = []; // Array to store calculation history

function appendToDisplay(value) {
    document.getElementById("display").value += value;
    playSound(); // Play sound effect on button press
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let currentValue = document.getElementById("display").value;
    document.getElementById("display").value = currentValue.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById("display").value;
        let result = eval(expression);
        document.getElementById("display").value = result;

        // Add to history
        addToHistory(`${expression} = ${result}`);
    } catch (error) {
        handleError(error);
    }
}

// Function to add calculation to history
function addToHistory(entry) {
    history.push(entry); // Store the calculation
    updateHistoryDisplay(); // Update the displayed history
}

// Function to update history display
function updateHistoryDisplay() {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = history.map(item => `<div>${item}</div>`).join('');
}

function handleError(error) {
    if (error.message.includes("divide by zero")) {
        document.getElementById("display").value = "Cannot divide by zero";
    } else {
        document.getElementById("display").value = "Error";
    }
    document.getElementById("display").style.color = "red"; // Change text color to red
}

// Memory functions
function memoryAdd() {
    let currentValue = parseFloat(document.getElementById("display").value) || 0;
    memory += currentValue;
    clearDisplay(); // Optionally clear display after adding to memory
}

function memorySubtract() {
    let currentValue = parseFloat(document.getElementById("display").value) || 0;
    memory -= currentValue;
    clearDisplay(); // Optionally clear display after subtracting from memory
}

function memoryRecall() {
    document.getElementById("display").value = memory;
}

function memoryClear() {
    memory = 0;
    clearDisplay(); // Optionally clear display when memory is cleared
}

// Toggle between dark and light mode
function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
    const toggleButton = document.querySelector(".toggle-btn");
    if (document.body.classList.contains("light-mode")) {
        toggleButton.innerText = "Toggle to Dark Mode"; // Change button text for light mode
    } else {
        toggleButton.innerText = "Toggle to Light Mode"; // Change button text for dark mode
    }
}

// Sound effect function
function playSound() {
    const sound = document.getElementById("button-sound");
    sound.currentTime = 0; // Reset the sound to the start
    sound.play(); // Play the sound
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (['+', '-', '*', '/', '(', ')'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});
