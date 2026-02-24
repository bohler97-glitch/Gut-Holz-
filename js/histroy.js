import { supabaseClient } from './config.js';

// Lädt die letzten 5 Runden aus Supabase und zeigt sie an
export async function loadHistory() {
    const historyList = document.getElementById('historyList');
    
    // Kurze Lade-Animation oder Text
    historyList.innerHTML = '<div class="text-slate-600 text-sm italic p-4 text-center animate-pulse">Lade Archiv...</div>';

    const { data, error } = await supabaseClient
        .from('rounds')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        historyList.innerHTML = `<div class="text-red-400 text-xs text-center p-4">Fehler beim Laden: ${error.message}</div>`;
        return;
    }

    if (!data || data.length === 0) {
        historyList.innerHTML = '<div class="text-slate-600 text-sm italic p-4 text-center">Noch keine Runden aufgezeichnet.</div>';
        return;
    }

    // Liste befüllen
    historyList.innerHTML = '';
    data.forEach(round => {
        const date = new Date(round.created_at).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const card = document.createElement('div');
        card.className = "bg-slate-800/50 border border-slate-700 p-4 rounded-2xl flex justify-between items-center active:bg-slate-800 transition-colors shadow-sm";
        card.innerHTML = `
            <div>
                <div class="text-slate-500 text-[10px] uppercase tracking-tighter font-bold">${date}</div>
                <div class="font-bold text-slate-200 tracking-tight">${round.course_name || 'Mein Platz'}</div>
            </div>
            <div class="text-emerald-500 font-black opacity-50 text-xl">→</div>
        `;
        historyList.appendChild(card);
    });
}