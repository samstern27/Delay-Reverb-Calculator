document.addEventListener("DOMContentLoaded", function () {
  // ---------------------------------------- GLOBAL VARIABLES ----------------------------------------

  // Models
  let bpmElement = document.getElementById("bpm-input");

  // BPM variable
  let bpm = bpmElement.value;

  // ---------------------------------------- CALCULATION FUNCTIONS ----------------------------------------

  // ---------------------------------------- DELAY CALCULATION ----------------------------------------

  // Noted timing calculation
  function calculateNoted(bpm, noteLength) {
    let delay = bpm / 60000;
    let delayMs = 1 / delay;
    delayMs = (delayMs * 4) / noteLength;
    return delayMs;
  }

  // Dotted timing calculation
  function calculateDotted(bpm, noteLength) {
    return calculateNoted(bpm, noteLength) * 1.5;
  }

  // Triplet timing calculation
  function calculateTriplet(bpm, noteLength) {
    return calculateNoted(bpm, noteLength) * 0.75;
  }

  // ---------------------------------------- REVERB CALCULATION ----------------------------------------

  // Total time calculation
  function calculateTotalTime(bpm, noteLength) {
    let reverb = bpm / 60000;
    let reverbMs = 1 / reverb;
    reverbMs = (reverbMs * 4) / noteLength;
    return reverbMs;
  }

  // Pre-delay calculation
  function calculatePreDelay(bpm, noteLength) {
    if (noteLength === 4) {
      let fraction = noteLength * 32;
      return calculateTotalTime(bpm, noteLength) / fraction;
    } else if (noteLength === 2) {
      let fraction = noteLength * 32;
      return calculateTotalTime(bpm, noteLength) / fraction;
    } else if (noteLength === 1) {
      let fraction = noteLength * 64;
      return calculateTotalTime(bpm, noteLength) / fraction;
    } else if (noteLength === 0.5) {
      let fraction = noteLength * 128;
      return calculateTotalTime(bpm, noteLength) / fraction;
    }
  }

  // Decay calculation
  function calculateDecay(bpm, noteLength) {
    return (
      calculateTotalTime(bpm, noteLength) - calculatePreDelay(bpm, noteLength)
    );
  }

  // ------------------------------------- RENDER & CLEAR FUNCTIONS -------------------------------------

  // Render
  function render() {
    // Delay loop
    for (let i = 1; i <= 512; i *= 2) {
      // Delay IDs
      let idNote = "notes-1-" + i;
      let idDotted = "dotted-1-" + i;
      let idTriplet = "triplet-1-" + i;
      // Delay values
      let notedValue = calculateNoted(bpm, i);
      let dottedValue = calculateDotted(bpm, i);
      let tripletValue = calculateTriplet(bpm, i);
      // Delay renders
      document.getElementById(idNote).textContent =
        notedValue.toFixed(2) + "\n" + " ms";
      document.getElementById(idDotted).textContent =
        dottedValue.toFixed(2) + "\n" + " ms";
      document.getElementById(idTriplet).textContent =
        tripletValue.toFixed(2) + "\n" + " ms";
    }

    // Reverb loop
    for (let j = 4; j >= 0.5; j /= 2) {
      // Reverb IDs
      let idPre = "pre-delay-1-" + j;
      let idDecay = "decay-1-" + j;
      let idTotal = "total-time-1-" + j;
      // Reverb values
      let preValue = calculatePreDelay(bpm, j);
      let decayValue = calculateDecay(bpm, j);
      let totalValue = calculateTotalTime(bpm, j);
      // Reverb renders
      document.getElementById(idPre).textContent =
        preValue.toFixed(2) + "\n" + " ms";
      document.getElementById(idDecay).textContent =
        decayValue.toFixed(2) + "\n" + " ms";
      document.getElementById(idTotal).textContent =
        totalValue.toFixed(2) + "\n" + " ms";
    }
  }

  // Clear MS
  function clearMs() {
    // Delay loop
    for (let i = 1; i <= 512; i *= 2) {
      // Delay IDs
      let idNote = "notes-1-" + i;
      let idDotted = "dotted-1-" + i;
      let idTriplet = "triplet-1-" + i;
      document.getElementById(idNote).textContent = "-";
      document.getElementById(idDotted).textContent = "-";
      document.getElementById(idTriplet).textContent = "-";
    }

    // Reverb loop
    for (let j = 4; j >= 0.5; j /= 2) {
      // Reverb IDs
      let idPre = "pre-delay-1-" + j;
      let idDecay = "decay-1-" + j;
      let idTotal = "total-time-1-" + j;
      document.getElementById(idPre).textContent = "-";
      document.getElementById(idDecay).textContent = "-";
      document.getElementById(idTotal).textContent = "-";
    }
  }

  // Update BPM
  function updateBpm() {
    bpm = bpmElement.value;
  }

  clearMs();

  // BPM input event listener
  bpmElement.addEventListener("input", function () {
    if (bpmElement.value > 0) {
      updateBpm();
      render();
    } else {
      clearMs();
    }
  });
});
