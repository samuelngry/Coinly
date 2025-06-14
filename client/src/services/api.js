// GET quests
export async function fetchQuests() {
    const res = await fetch('/api/quests', { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch quests');
    return res.json();
}

// Complete quest by ID
export async function completeQuest(id) {
    const res = await fetch(`/api/quests/${id}/complete`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to complete quest');
    return res.json();
}