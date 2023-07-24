document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var expenseName = document.getElementById('expense-name').value;
    var expenseAmount = document.getElementById('expense-amount').value;
    var expenseType = document.getElementById('expense-type').value;
  
    if (editingExpenseIndex === -1) {
      addExpense(expenseName, expenseAmount, expenseType);
    } else {
      updateExpense(expenseName, expenseAmount, expenseType);
    }
    
    document.getElementById('expense-form').reset();
    resetEditState();
  });
  
  var editingExpenseIndex = -1;
  
  function addExpense(name, amount, type) {
    var expenseList = document.getElementById('expense-list');
  
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = '<strong>' + name + '</strong> - ₹' + amount + ' (' + type + ')';
    
    var deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right';
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.addEventListener('click', function() {
      li.remove();
    });
  
    var editButton = document.createElement('button');
    editButton.className = 'btn btn-secondary btn-sm float-right mr-2';
    editButton.appendChild(document.createTextNode('Edit'));
    editButton.addEventListener('click', function() {
      editExpense(li, name, amount, type);
    });
  
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    expenseList.appendChild(li);
  }
  
  function editExpense(li, name, amount, type) {
    var expenseNameInput = document.getElementById('expense-name');
    var expenseAmountInput = document.getElementById('expense-amount');
    var expenseTypeInput = document.getElementById('expense-type');
    
    expenseNameInput.value = name;
    expenseAmountInput.value = amount;
    expenseTypeInput.value = type;
  
    var expenseFormButton = document.querySelector('#expense-form button');
    expenseFormButton.textContent = 'Update Expense';
    
    editingExpenseIndex = Array.from(li.parentNode.children).indexOf(li);
  }
  
  function updateExpense(name, amount, type) {
    var expenseList = document.getElementById('expense-list');
    var li = expenseList.children[editingExpenseIndex];
  
    li.innerHTML = '<strong>' + name + '</strong> - ₹' + amount + ' (' + type + ')';
    
    editingExpenseIndex = -1;
  }
  
  function resetEditState() {
    var expenseFormButton = document.querySelector('#expense-form button');
    expenseFormButton.textContent = 'Add Expense';
  }
  