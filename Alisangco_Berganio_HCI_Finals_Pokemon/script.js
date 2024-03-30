var currentPage = window.location.pathname.split("/").pop();
var yourPokemon_fight; // Declare variables outside of the event listener for broader scope
var enemyPokemon_fight;
var selectedMoveId; // Declare selectedMoveId variable

function scrollToID(id) {
    var element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function storeFormData(event) {
    event.preventDefault();

    var yourTrainerName = document.getElementById("yourTrainerName").value;
    var yourPokemon = document.getElementById("yourPokemon").value;
    var enemyTrainerName = document.getElementById("enemyTrainerName").value;
    var enemyPokemon = document.getElementById("enemyPokemon").value;

    localStorage.setItem("yourTrainerName", yourTrainerName);
    localStorage.setItem("yourPokemon", yourPokemon);
    localStorage.setItem("enemyTrainerName", enemyTrainerName);
    localStorage.setItem("enemyPokemon", enemyPokemon);

    window.location.href = "battle.html";
}

function pokemon(name, type, level, health, attack, speed, moves) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.health = health;
    this.attack = attack;
    this.speed = speed;
    this.moves = moves.slice(0, 4);
}

function pokemonMove(name, type, damage) {
    this.name = name;
    this.type = type;
    this.damage = damage;
}

document.addEventListener("DOMContentLoaded", function() {
    if (currentPage === "battle.html") {
        let yourTrainerName_fight;
        let enemyTrainerName_fight;

        var yourTrainerName = localStorage.getItem("yourTrainerName");
        var yourPokemon = localStorage.getItem("yourPokemon");
        var enemyTrainerName = localStorage.getItem("enemyTrainerName");
        var enemyPokemon = localStorage.getItem("enemyPokemon");
        var battleTitle = yourTrainerName + " vs. " + enemyTrainerName;
        var yourPokemonSpriteElement = document.getElementById("yourPokemonSprite");
        var enemyPokemonSpriteElement = document.getElementById("enemyPokemonSprite");

        document.getElementById("yourTrainerNameDisplay").textContent = yourTrainerName;
        document.getElementById("yourPokemonDisplay").textContent = yourPokemon;
        document.getElementById("enemyTrainerNameDisplay").textContent = enemyTrainerName;
        document.getElementById("enemyPokemonDisplay").textContent = enemyPokemon;
        document.getElementById("battleTitleDisplay").textContent = battleTitle;

        // Define moves for each Pokémon
        var charizardMoves = [
            new pokemonMove("Ember", "Fire", 40),
            new pokemonMove("Fire Spin", "Fire", 35),
            new pokemonMove("Flamethrower", "Fire", 90),
            new pokemonMove("Dragon Claw", "Dragon", 80)
        ];

        var blastoiseMoves = [
            new pokemonMove("Water Gun", "Water", 40),
            new pokemonMove("Bubble", "Water", 40),
            new pokemonMove("Hydro Pump", "Water", 110),
            new pokemonMove("Surf", "Water", 90)
        ];

        var venusaurMoves = [
            new pokemonMove("Vine Whip", "Grass", 45),
            new pokemonMove("Razor Leaf", "Grass", 55),
            new pokemonMove("Solar Beam", "Grass", 120),
            new pokemonMove("Petal Dance", "Grass", 120)
        ];

        var electivireMoves = [
            new pokemonMove("Quick Attack", "Electric", 40),
            new pokemonMove("Thunder Punch", "Electric", 75),
            new pokemonMove("Thunderbolt", "Electric", 90),
            new pokemonMove("Thunder", "Electric", 110)
        ];

        // Based on yourPokemon or enemyPokemon, you can define different behaviors here
        if (yourPokemon === "Venusaur") {
            yourPokemon_fight = new pokemon("Venusaur", "Grass/Poison", 50, 187, 167, 145, venusaurMoves);
            yourPokemonSpriteElement.src = "Pokemon/Venusaur.gif";
        } else if (yourPokemon === "Charizard") {
            yourPokemon_fight = new pokemon("Charizard", "Fire/Flying", 50, 185, 177, 167, charizardMoves);
            yourPokemonSpriteElement.src = "Pokemon/Charizard.gif";
        } else if (yourPokemon === "Blastoise") {
            yourPokemon_fight = new pokemon("Blastoise", "Water", 50, 186, 150, 143, blastoiseMoves);
            yourPokemonSpriteElement.src = "Pokemon/Blastoise.gif";
        } else if (yourPokemon === "Electivire"){
            yourPokemon_fight = new pokemon("Electivire", "Electric", 50, 182, 192, 161, electivireMoves);
            yourPokemonSpriteElement.src = "Pokemon/Electivire.gif"
        }

        if (enemyPokemon === "Venusaur") {
            enemyPokemon_fight = new pokemon("Venusaur", "Grass/Poison", 50, 187, 167, 145, venusaurMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Venusaur.gif";
        } else if (enemyPokemon === "Charizard") {
            enemyPokemon_fight = new pokemon("Charizard", "Fire/Flying", 50, 185, 177, 167, charizardMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Charizard.gif";
        } else if (enemyPokemon === "Blastoise") {
            enemyPokemon_fight = new pokemon("Blastoise", "Water", 50, 186, 150, 143, blastoiseMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Blastoise.gif";
        } else if (enemyPokemon === "Electivire"){
            enemyPokemon_fight = new pokemon("Electivire", "Electric", 50, 182, 192, 161, electivireMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Electivire.gif";
        }

        document.getElementById("yourPokemonHP").textContent = "HP: " + yourPokemon_fight.health + "/" + yourPokemon_fight.health;
        document.getElementById("yourPokemonLevel").textContent = "Level " + yourPokemon_fight.level;
        document.getElementById("enemyPokemonHP").textContent = "HP: " + enemyPokemon_fight.health + "/" + enemyPokemon_fight.health;
        document.getElementById("enemyPokemonLevel").textContent = "Level " + enemyPokemon_fight.level;

        // Update move names on load
        updateMoveNames();

        yourInitialHealth = yourPokemon_fight.health;
        enemyInitialHealth = enemyPokemon_fight.health;
    }
});

// Function to update move names based on selected Pokemon
function updateMoveNames() {
    var yourMoves = yourPokemon_fight.moves;
    for (var i = 0; i < yourMoves.length; i++) {
        document.getElementById("yourPokemonMove" + (i+1)).textContent = yourMoves[i].name;
    }
}

// Function to handle selection of moves
function selectMove(moveId) {
    // Deselect all buttons
    var buttons = document.querySelectorAll('.move button');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });

    // Select the clicked button
    var selectedButton = document.getElementById(moveId);
    selectedButton.classList.add('selected');

    selectedMoveId = moveId; // Update the selected move ID
}

// Function to take turn
function takeTurn() {
    if (selectedMoveId) {
        // Determine which Pokemon moves first based on speed
        var firstAttacker;
        var secondAttacker;
        if (yourPokemon_fight.speed >= enemyPokemon_fight.speed) {
            firstAttacker = yourPokemon_fight;
            secondAttacker = enemyPokemon_fight;
        } else {
            firstAttacker = enemyPokemon_fight;
            secondAttacker = yourPokemon_fight;
        }

        // Execute moves
        executeMove(firstAttacker, secondAttacker);
        if (secondAttacker.health > 0) {
            executeMove(secondAttacker, firstAttacker);
        }

        // Check for victor
        checkVictor();
        
        // Update HP display
        updateHPDisplay(yourPokemon_fight, enemyPokemon_fight);

        // Check if battle is over
        if (yourPokemon_fight.health <= 0 || enemyPokemon_fight.health <= 0) {
            alert("Battle is over! Please refresh the page to start a new battle.");
        }
    } else {
        alert("Please select a move before taking a turn.");
    }
}

// Function to execute a move
function executeMove(attacker, defender) {
    var moveIndex = Math.floor(Math.random() * attacker.moves.length);
    var move = attacker.moves[moveIndex];
    var damage = calculateDamage(attacker, defender, move);
    defender.health -= damage;
    logToConsole(attacker.name + " used " + move.name + " dealing " + damage + " damage to " + defender.name);
}

// Function to calculate damage
function calculateDamage(attacker, defender, move) {
    // Damage calculation logic based on attacker's attack power and move's damage
    // For simplicity, let's assume a basic formula: damage = move damage * (attacker's attack power / 100)
    return Math.floor((move.damage * (attacker.attack / 100)));
}

// Function to check for victor
function checkVictor() {
    if (yourPokemon_fight.health <= 0) {
        yourPokemon_fight.health = 0;
        updateHPDisplay(yourPokemon_fight, enemyPokemon_fight);
        alert("Enemy " + enemyPokemon_fight.name + " wins!");
        // Enemy wins, so increase its level
        enemyPokemon_fight.level++;
        document.getElementById("enemyPokemonLevel").textContent = "Level " + enemyPokemon_fight.level;
    } else if (enemyPokemon_fight.health <= 0) {
        enemyPokemon_fight.health = 0;
        updateHPDisplay(yourPokemon_fight, enemyPokemon_fight);
        alert("You win! Your " + yourPokemon_fight.name + " defeated enemy " + enemyPokemon_fight.name);
        // You win, so increase your Pokémon's level
        yourPokemon_fight.level++;
        document.getElementById("yourPokemonLevel").textContent = "Level " + yourPokemon_fight.level;
        // Display level up message in console log area
        logToConsole("Congratulations! Your " + yourPokemon_fight.name + " leveled up to Level " + yourPokemon_fight.level + "!");
    }
}


// Function to update HP display
function updateHPDisplay(yourPokemon, enemyPokemon) {
    document.getElementById("yourPokemonHP").textContent = "HP: " + yourPokemon.health + "/" + yourInitialHealth;
    document.getElementById("enemyPokemonHP").textContent = "HP: " + enemyPokemon.health + "/" + enemyInitialHealth;
}

// Function to log messages to console area
function logToConsole(message) {
    var consoleArea = document.getElementById("consoleArea");
    var logMessage = document.createElement("div");
    logMessage.textContent = message;
    consoleArea.appendChild(logMessage);
}
