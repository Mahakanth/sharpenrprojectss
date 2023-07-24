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

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  existingUsers.push(user);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  nameInput.value = '';
  emailInput.value = '';

  console.log('User details stored in localStorage:', user);
});
