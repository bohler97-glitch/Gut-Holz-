// Deine Supabase Zugangsdaten
const supabaseUrl = 'https://djrweaogqodemprteatx.supabase.co';
const supabaseKey = 'sb_publishable_bbTpYOLJEQtb1eqPJpaEpA_g-WppvA6';

// Den Client initialisieren
export const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Globale Zustands-Variablen (State), die von mehreren Modulen gebraucht werden
export const appState = {
    currentRoundId: null,
    currentHole: 1,
    shotCounter: 1,
    currentPar: 4,
    selectedClub: '',
    selectedQuality: 0
};