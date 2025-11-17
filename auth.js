
// Auth handlers for signup/login and simple UI updates
window.addEventListener('load', ()=>{
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if(signupForm){
    signupForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      try{
        const userCred = await auth.createUserWithEmailAndPassword(email,password);
        const uid = userCred.user.uid;
        // save user profile in firestore
        await db.collection('users').doc(uid).set({name,email,createdAt: firebase.firestore.FieldValue.serverTimestamp(), isAdmin:false});
        document.getElementById('signupMsg').textContent = 'Account created. Redirecting...';
        setTimeout(()=> location.href='index.html', 800);
      }catch(err){ document.getElementById('signupMsg').textContent = err.message }
    });
  }

  if(loginForm){
    loginForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      try{
        await auth.signInWithEmailAndPassword(email,password);
        document.getElementById('loginMsg').textContent = 'Logged in — redirecting...';
        setTimeout(()=> location.href='index.html', 700);
      }catch(err){ document.getElementById('loginMsg').textContent = err.message }
    });
  }

  // update nav link
  auth && auth.onAuthStateChanged(user=>{
    const link = document.getElementById('authLink');
    const link2 = document.getElementById('authLink2');
    if(user){ if(link) link.textContent='Account'; if(link) link.href='admin.html'; if(link2) link2.textContent='Account'; }
    else { if(link) {link.textContent='Login'; link.href='login.html'} if(link2) {link2.textContent='Login'; link2.href='login.html'} }
  });
});
