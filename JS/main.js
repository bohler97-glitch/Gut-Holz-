import { appState } from './config.js';
import { highlightSelection } from './ui.js';
import { startNewRound, saveShot, finishRound } from './game.js';
import { loadHistory } from './history.js';

// 1. Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    // Archiv laden
    loadHistory();

    // Event Listener für "Neue Runde"
    document.getElementById('startBtn').addEventListener('click', startNewRound);

    // Event Listener für "Schlag Loggen"
    document.getElementById('saveShotBtn').addEventListener('click', saveShot);

    // Event Listener für "Runde Beenden"
    document.getElementById('finishRoundBtn').addEventListener('click', finishRound);

    // 2. Delegierte Event Listener für dynamische Buttons (Schläger, Par, Qualität)
    // Wir fangen die Klicks zentral ab, um Code zu sparen.
    
    // Schläger-Klicks
    document.getElementById('clubGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn && btn.dataset.club) {
            appState.selectedClub = btn.dataset.club;
            highlightSelection('.club-btn', appState.selectedClub);
        }
    });

    // Qualität-Klicks
    document.getElementById('qualityGrid').addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn && btn.dataset.quality) {
            appState.selectedQuality = parseInt(btn.dataset.quality);
            highlightSelection('.quality-btn', appState.selectedQuality);
        }
    });

    // Par-Klicks
    document.querySelector('#shotArea').addEventListener('click', (e) => {
        const btn = e.target.closest('.par-btn');
        if (btn && btn.dataset.par) {
            appState.currentPar = parseInt(btn.dataset.par);
            highlightSelection('.par-btn', appState.currentPar);
        }
    });
});