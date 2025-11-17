
// Posting form: uploads images to Firebase Storage, creates ad doc in Firestore (approved=false)
window.addEventListener('load', ()=>{
  const postForm = document.getElementById('postForm');
  const status = document.getElementById('postStatus');
  if(!postForm) return;
  postForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(!auth.currentUser){ status.textContent='Please login to post an ad.'; return; }
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const files = document.getElementById('images').files;
    status.textContent='Uploading...';
    const imageUrls = [];
    try{
      for(let i=0;i<files.length;i++){
        const f = files[i];
        const ref = storage.ref().child(`ads/${auth.currentUser.uid}/${Date.now()}_${f.name}`);
        await ref.put(f);
        const url = await ref.getDownloadURL();
        imageUrls.push(url);
      }
      await db.collection('ads').add({
        title,category,price,description,image:imageUrls[0]||'',images:imageUrls,owner:auth.currentUser.uid,approved:false,createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      status.textContent='Ad submitted for review.';
      postForm.reset();
    }catch(err){ status.textContent = 'Error: ' + err.message }
  });
});
