const myForm = document.getElementById('my-form');

myForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const name = nameInput.value;
  const email = emailInput.value;

  const user = {
    name: name,
    email: email
  };

  localStorage.setItem('user', JSON.stringify(user));

  nameInput.value = '';
  emailInput.value = '';

  console.log('User details stored in localStorage:', user);
});
