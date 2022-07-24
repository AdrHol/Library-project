// adding new book modal 

const openModalButton = document.querySelector('#new-book');
const modalSelector = document.querySelector('.modal');

openModalButton.addEventListener('click', function(){
    modalSelector.style.display = 'block';
});


window.addEventListener('click', function(e){
    if (e.target.classList.contains('modal')) {
        modalSelector.style.display = 'none';
    };
})