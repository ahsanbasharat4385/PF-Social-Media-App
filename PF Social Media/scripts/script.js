// Sidebar menu
const menuItems = document.querySelectorAll('.menu-item'); 

// Messages
const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active'); // remove active class from all menu items
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active'); 
        if(item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display ='none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display = 'none';
        }
    })
})

// searches chats
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
   
    message.forEach(chat => {
        let name = chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        } else{
            chat.style.display = 'none';
        }
    })
} 

// search chat
messageSearch.addEventListener('keyup', searchMessage);

// highlight messages card when messages menu item is clicked
messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem blue'; 
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})


