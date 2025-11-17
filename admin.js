
// Simple admin dashboard: checks users collection isAdmin flag and lists ads for approval
window.addEventListener('load', async ()=>{
  const msg = document.getElementById('adminMsg');
  const list = document.getElementById('adsList');
  if(!auth) { msg.textContent='Firebase not initialized.'; return; }
  auth.onAuthStateChanged(async user=>{
    if(!user) { msg.textContent='Please login as admin to view this page.'; list.innerHTML=''; return; }
    const userDoc = await db.collection('users').doc(user.uid).get();
    const data = userDoc.data();
    if(!data || !data.isAdmin){ msg.textContent='You are not an admin.'; list.innerHTML=''; return; }
    msg.textContent='Welcome, admin.';
    // load pending ads
    const snapshot = await db.collection('ads').where('approved','==',false).orderBy('createdAt','asc').get();
    list.innerHTML = '';
    snapshot.forEach(doc=>{
      const d = doc.data();
      const div = document.createElement('div');
      div.className='ad-card';
      div.innerHTML = ` <h3>${escapeHtml(d.title)}</h3><p class='muted'>${escapeHtml(d.description||'')}</p><div><button data-id='${doc.id}' class='approve'>Approve</button> <button data-id='${doc.id}' class='del'>Delete</button></div>`;
      list.appendChild(div);
    });

    // events
    list.addEventListener('click', async (e)=>{
      if(e.target.matches('.approve')){
        const id = e.target.dataset.id;
        await db.collection('ads').doc(id).update({approved:true});
        e.target.textContent='Approved';
      }
      if(e.target.matches('.del')){
        const id = e.target.dataset.id;
        await db.collection('ads').doc(id).delete();
        e.target.textContent='Deleted';
      }
    });
  });
});
function escapeHtml(s){ if(!s) return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
