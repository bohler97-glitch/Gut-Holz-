import { supabaseClient, appState } from './config.js';
import { updateStatusUI, toggleScreen, showHoleSummary, resetInputUI, highlightSelection } from './ui.js';

// Startet eine neue Runde in Supabase
export async function startNewRound() {
    const { data, error } = await supabaseClient
        .from('rounds')
        .insert([{ course_name: 'Mein Platz', weather: 'Sonne' }])
        .select();

    if (error) {
        alert('Fehler beim Rundenstart: ' + error.message);
    } else {
        appState.currentRoundId = data[0].id;
        appState.currentHole = 1;
        appState.shotCounter = 1;
        
        toggleScreen(true);
        updateStatusUI();
    }
}

// Speichert einen einzelnen Schlag
export async function saveShot() {
    if (!appState.currentRoundId) return alert('Bitte Runde starten!');
    if (!appState.selectedClub || appState.selectedQuality === 0) return alert('Auswahl fehlt!');

    const hcpValue = document.getElementById('holeHandicap').value;

    const { error } = await supabaseClient
        .from('shots')
        .insert([{
            round_id: appState.currentRoundId,
            hole_number: appState.currentHole,
            shot_number: appState.shotCounter,
            club: appState.selectedClub,
            shot_quality: appState.selectedQuality,
            hole_par: appState.currentPar,
            hole_handicap: hcpValue ? parseInt(hcpValue) : null,
            lie: 'Fairway'
        }]);

    if (error) {
        alert('Fehler beim Speichern: ' + error.message);
    } else {
        handleShotSequence();
    }
}

// Logik nach dem Speichern (Putter-Check, Score-Berechnung)
function handleShotSequence() {
    if (appState.selectedClub === 'PT') {
        const diff = appState.shotCounter - appState.currentPar;
        let text = diff === 0 ? "Par! 🎯" : (diff < 0 ? "Birdie! 🐦" : "Bogey. 💪");
        if (diff < -1) text = "Eagle! 🔥";

        showHoleSummary(text);

        setTimeout(() => {
            if (confirm(`Loch ${appState.currentHole} beendet?`)) {
                appState.currentHole++;
                appState.shotCounter = 1;
                document.getElementById('holeSummary').classList.add('hidden');
            } else {
                appState.shotCounter++;
            }
            prepareNextShot();
        }, 100);
    } else {
        appState.shotCounter++;
        prepareNextShot();
    }
}

// Bereitet die UI auf den nächsten Schlag vor
function prepareNextShot() {
    appState.selectedClub = '';
    appState.selectedQuality = 0;
    resetInputUI();
    updateStatusUI();
}

// Beendet die gesamte Runde
export function finishRound() {
    if (confirm("Runde wirklich beenden?")) {
        appState.currentRoundId = null;
        toggleScreen(false);
    }
}