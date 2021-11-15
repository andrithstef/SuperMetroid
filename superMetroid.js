
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */



/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/



var gunshot = new Howl({
    src: ['sounds/gunshot.mp3']
  });

var background = new Howl({
  src: ['sounds/background.mp3'],
  html5: true,
  loop: true
});

var enemyDie = new Howl({
  src: ['sounds/enemyDie.mp3']
});


var entityManager = new EntityManager();


// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

var updatesDone = 0;

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    if(background.state() === "loaded" && !background.playing()){
       background.play();
    }
    entityManager.update(du);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    entityManager.render(ctx);
    spatialManager.render(ctx);
}


// Kick it off


entityManager.init();
g_main.init();