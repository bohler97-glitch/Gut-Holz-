import { appState } from './config.js';

// Aktualisiert die Anzeige von Loch und Schlagzahl
export function updateStatusUI() {
    const statusEl = document.getElementById('status');
    const displayHoleEl = document.getElementById('displayHole');
    
    if (statusEl) statusEl.innerText = `Loch ${appState.currentHole} • Schlag ${appState.shotCounter}`;
    if (displayHoleEl) displayHoleEl.innerText = appState.currentHole;
}

// Schaltet zwischen Startbildschirm und Spielfeld um
export function toggleScreen(isGameActive) {
    const startContainer = document.getElementById('startContainer');
    const shotArea = document.getElementById('shotArea');
    const historyContainer = document.getElementById('historyContainer');

    if (isGameActive) {
        startContainer.classList.add('hidden');
        historyContainer.classList.add('hidden');
        shotArea.classList.remove('hidden');
    } else {
        startContainer.classList.remove('hidden');
        historyContainer.classList.remove('hidden');
        shotArea.classList.add('hidden');
        document.getElementById('holeSummary').classList.add('hidden');
    }
}

// Markiert gewählte Buttons (Schläger, Par, Qualität)
export function highlightSelection(selector, value) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(btn => {
        btn.classList.remove('selected', 'border-emerald-500', 'text-emerald-400');
        
        // Prüft ob der Button-Text oder ein Data-Attribut mit dem Wert übereinstimmt
        if (btn.getAttribute('data-club') === value || 
            btn.getAttribute('data-quality') == value || 
            btn.getAttribute('data-par') == value) {
            btn.classList.add('selected');
            
            // Spezielles Styling für Par-Buttons
            if (selector === '.par-btn') {
                btn.classList.add('border-emerald-500', 'text-emerald-400');
            }
        }
    });
}

// Zeigt das Ergebnis nach dem Putter an
export function showHoleSummary(text) {
    const summaryEl = document.getElementById('holeSummary');
    const summaryTextEl = document.getElementById('summaryText');
    summaryTextEl.innerText = text;
    summaryEl.classList.remove('hidden');
}

// Leert alle Eingabefelder und Markierungen
export function resetInputUI() {
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    document.getElementById('holeHandicap').value = '';
}