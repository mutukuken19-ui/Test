
// Basic client-side script: loads public (approved) ads from Firestore
async function loadAds(){
  const grid = document.getElementById('adsGrid');
  if(!window.db){ grid.innerHTML = '<p class="muted">Offline demo: no database loaded.</p>'; return; }
  const snapshot = await db.collection('ads').where('approved','==',true).orderBy('createdAt','desc').limit(24).get();
  grid.innerHTML = '';
  snapshot.forEach(doc=>{
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'ad-card';
    div.innerHTML = `
      <img src="${data.image || 'https://via.placeholder.com/600x400'}" />
      <h3>${escapeHtml(data.title)}</h3>
      <p class="muted">${escapeHtml(data.description || '')}</p>
      <div class="muted">${escapeHtml(data.category||'')}</div>
      <div style="margin-top:8px;font-weight:700;color:#06b6d4">${data.price? 'KSH ' + data.price : ''}</div>
    `;
    grid.appendChild(div);
  });
}
function escapeHtml(s){ if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
window.addEventListener('load', loadAds);
