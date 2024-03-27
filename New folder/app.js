const dataForm = document.getElementById('dataForm');
const dataList = document.getElementById('dataList');
const deleteAllBtn = document.getElementById('deleteAllBtn');

// Funzione per recuperare le transazioni precedenti dal localStorage
function getPreviousTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    transactions.forEach(transaction => {
        const newData = document.createElement('div');
        newData.innerHTML = `<p><strong>${transaction.name} (${transaction.type}):</strong> ${transaction.amount} - ${transaction.date} <button class="deleteBtn">Elimina</button></p>`;
        dataList.appendChild(newData);
    });

    const deleteButtons = document.getElementsByClassName('deleteBtn');
    Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function() {
            this.parentNode.remove();
            updateLocalStorage(); // Aggiorna il localStorage dopo l'eliminazione
        });
    });
}

// Funzione per aggiornare il localStorage con le transazioni attuali
function updateLocalStorage() {
    const transactions = Array.from(dataList.children).map(item => {
        return {
            name: item.children[0].textContent.split('(')[0].trim(),
            type: item.children[0].textContent.split('(')[1].split(')')[0],
            amount: item.children[0].textContent.split(':')[1].split('-')[0].trim(),
            date: item.children[0].textContent.split('-')[1].split('<')[0].trim()
        };
    });
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Carica le transazioni precedenti al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
    getPreviousTransactions();
});

dataForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('type').value;
    const date = new Date().toISOString().slice(0, 10);
    
    const newData = document.createElement('div');
    newData.innerHTML = `<p><strong>${name} (${type}):</strong> ${amount} - ${date} <button class="deleteBtn">Elimina</button></p>`;
    dataList.appendChild(newData);

    document.getElementById('name').value = '';
    document.getElementById('amount').value = '';

    updateLocalStorage(); // Aggiorna il localStorage dopo l'aggiunta

    const deleteButtons = document.getElementsByClassName('deleteBtn');
    Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function() {
            this.parentNode.remove();
            updateLocalStorage(); // Aggiorna il localStorage dopo l'eliminazione
        });
    });
});

deleteAllBtn.addEventListener('click', function() {
    dataList.innerHTML = '';
    localStorage.removeItem('transactions'); // Rimuove tutte le transazioni dal localStorage
});