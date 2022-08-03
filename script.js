// adding new book modal 
const openModalButton = document.querySelector('#new-book');
const modalSelector = document.querySelector('.modal');

// listener to firing popup modal
openModalButton.addEventListener('click', function(){
    modalSelector.style.display = 'block';
});

// shutting modal when clicked outside of modal area
window.addEventListener('click', function(e){
    if (e.target.classList.contains('modal')) {
        modalSelector.style.display = 'none';
    };
})


//  user input selectors
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#numOfPages');


const addingButton = document.querySelector('#adding-button');


// object constructor for new book 
function Book(title, author, pages, status) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Status = status; 
}

Book.prototype.Display = function(index) {
    const container = document.querySelector('.object-container');
   const card = document.createElement('div');
       card.setAttribute('class', 'book-tamplate');
       card.setAttribute('data-index', `${index}`);
   const titlePara = document.createElement('p');
       titlePara.setAttribute('class', 'title');
   const firstSpan = document.createElement('span');
   const secondSpan = document.createElement('span');
       firstSpan.setAttribute('class', 'data-type');
       secondSpan.setAttribute('class', 'data-title');
       secondSpan.setAttribute('data-index', `${index}`);
       firstSpan.textContent = 'Title: ';
       secondSpan.textContent = `${this.Title}`;
           titlePara.appendChild(firstSpan);
           titlePara.appendChild(secondSpan);

   const authorPara = document.createElement('p');
       authorPara.setAttribute('class', 'author');
   const authorFirstSpan = document.createElement('span');
   const authorSecondSpan = document.createElement('span');
       authorFirstSpan.setAttribute('class', 'data-type');
       authorSecondSpan.setAttribute('class', 'data-author');
       authorFirstSpan.setAttribute('data-index', `${index}`);
       authorFirstSpan.textContent = 'Written by: ';
       authorSecondSpan.textContent = `${this.Author}`;
           authorPara.appendChild(authorFirstSpan);
           authorPara.appendChild(authorSecondSpan);

   const pagesPara = document.createElement('p');
       pagesPara.setAttribute('class', 'pages');
       const pagesFirstSpan = document.createElement('span');
       const pagesSecondSpan = document.createElement('span');
           pagesFirstSpan.setAttribute('class', 'data-type');
           pagesSecondSpan.setAttribute('class', 'data-pages');
           pagesSecondSpan.setAttribute('data-index', `${index}`);
           pagesFirstSpan.textContent = 'Number of pages: ';
           pagesSecondSpan.textContent = `${this.Pages}`;
               pagesPara.appendChild(pagesFirstSpan);
               pagesPara.appendChild(pagesSecondSpan);


   const statusPara = document.createElement('p');
       statusPara.setAttribute('class', 'status');
       const statusFirstSpan = document.createElement('span');
       const statusSecondSpan = document.createElement('span');
           statusFirstSpan.setAttribute('class', 'data-type');
           statusSecondSpan.setAttribute('class', 'data-status');
           statusSecondSpan.setAttribute('data-index', `${index}`);
           statusFirstSpan.textContent = 'This book is: ';
           statusSecondSpan.textContent = `${this.Status}`;
               statusPara.appendChild(statusFirstSpan);
               statusPara.appendChild(statusSecondSpan);
   
   const statusButton = document.createElement('button');
       statusButton.setAttribute('type', 'button');
       statusButton.setAttribute('class', 'read');
       statusButton.setAttribute('data-index', `${index}`);
       statusButton.setAttribute('onclick', 'statusChange(event)');
       statusButton.textContent = 'Read';

   const deleteButton = document.createElement('button');
       deleteButton.setAttribute('type', 'button');
       deleteButton.setAttribute('class', 'delete');
       deleteButton.setAttribute('data-index', `${index}`);
       deleteButton.setAttribute('onclick', 'deleteCard(event)');
       deleteButton.textContent = 'Delete';

       card.appendChild(titlePara);
       card.appendChild(authorPara);
       card.appendChild(pagesPara);
       card.appendChild(statusPara);
       card.appendChild(statusButton);
       card.appendChild(deleteButton);

       container.appendChild(card);
}

let libraryArray = [new Book('Hobbit', 'Tolkien', '365', 'Read')];

    // regex 

    let textPattern = /^(?=.*[a-zA-Z0-9]).{1,45}$/;
    let numPattern = /^(?=.*[0-9]).{1,45}$/;


// listener for adding new book

function loopingOfArray() {
    const existingBooks = document.querySelectorAll('.data-title');
    if (existingBooks.length > 0) {  //if cards exist, then refreshing by removing existing and adding fresh data
        const cards = document.querySelectorAll('div.book-tamplate');
            for (let i = 0; i < cards.length; i++) {
                cards[i].parentNode.removeChild(cards[i]);
            }
                for (const book of libraryArray) { 
                    let index = libraryArray.indexOf(book);
                    book.Display(index);
                }
            } else { 
            for (const book of libraryArray) {
                let index = libraryArray.indexOf(book);
                book.Display(index);
        }
    }
}

const body = document.querySelector('body');
body.addEventListener('load', loopingOfArray());

addingButton.addEventListener('click', function(){
    
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let status = function (){
        const radio = document.querySelectorAll(`input[name="status"`);
        for (let i = 0; i < radio.length ; i++){
            if (radio[0].checked) {
                return `Read`;
            } else {
                return `To read`;
            }
        }
       
    }

    if (textPattern.test(title) && textPattern.test(author) && numPattern.test(pages) > 0){
        let newBook = new Book(title, author, pages, status());
        libraryArray.push(newBook);
            
            loopingOfArray();

            titleInput.value = '';
            authorInput.value = '';
            pagesInput.value = ''; 
        const error = document.querySelector('#error');
        error.style.display = 'none';
    } else {
        const error = document.querySelector('#error');
        error.style.display = 'block';
    }
})


function statusChange(event) {
    let index = event.target.attributes['data-index'].value;
    libraryArray[index].Status = 'Read';
    loopingOfArray();

}

function deleteCard(event){
    let index = event.target.attributes['data-index'].value;
    libraryArray.splice(index, 1);
    loopingOfArray();
}