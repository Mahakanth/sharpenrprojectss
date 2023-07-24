var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeOrEditItem);
filter.addEventListener('keyup', filterItems);

function addItem(e) {
  e.preventDefault();

  var newItemName = document.getElementById('item').value;
  var newItemDesc = document.getElementById('itemDescription').value;

  var li = document.createElement('li');
  li.className = 'list-group-item';

  var itemName = document.createElement('h4');
  itemName.appendChild(document.createTextNode(newItemName));
  li.appendChild(itemName);

  var itemDesc = document.createElement('p');
  itemDesc.appendChild(document.createTextNode(newItemDesc));
  li.appendChild(itemDesc);

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));

  var editBtn = document.createElement('button');
  editBtn.className = 'btn btn-primary btn-sm float-right edit';
  editBtn.appendChild(document.createTextNode('Edit'));

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  itemList.appendChild(li);

  document.getElementById('item').value = '';
  document.getElementById('itemDescription').value = '';
}

function removeOrEditItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  } else if (e.target.classList.contains('edit')) {
    // Handle edit functionality here (not implemented)
  }
}

function filterItems(e) {
  var text = e.target.value.toLowerCase();
  var items = itemList.getElementsByTagName('li');

  Array.from(items).forEach(function (item) {
    var itemName = item.querySelector('h4').textContent.toLowerCase();
    var itemDesc = item.querySelector('p').textContent.toLowerCase();

    if (itemName.includes(text) || itemDesc.includes(text)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
