document.getElementById('but1').addEventListener('click', add);

const del = document.getElementById('but2');


let LS = localStorage;

let name = document.querySelector('.name');
let p = document.querySelector('.p');

let one = document.querySelector('.one');
let two = document.querySelector('.two');

let dates = document.querySelector('.dates');

let post = document.getElementById('posts');

let id = Date.now();

let addCom = document.getElementById('add');

let coment = document.getElementById('coment');

let info = [];

// let getId;

let BD = [];


function add () {

    let input = document.querySelector('.input');
    input.addEventListener('blur', text);
    
    let textarea = document.querySelector('.textarea');
    textarea.addEventListener('blur', text);
    

    function text (event) {
       
    }


    if(input.value == '' && textarea.value !== ''){
        one.innerHTML = 'заполните поле';
        two.innerHTML = ' ';

    }

    if(input.value !== '' && textarea.value == ''){
        one.innerHTML = ' '
        two.innerHTML = 'заполните поле';
    }

    if(input.value == '' && textarea.value == ''){
        one.innerHTML = 'заполните поле';
        two.innerHTML = 'заполните поле';
    }

    if(input.value !== '' && textarea.value !== ''){
        one.innerHTML = ' ';
        two.innerHTML = ' ';

        let posts = [{
            title: input.value,
            content: textarea.value,
            id: id
        }]

        info.push(posts)

        LS.setItem('posts', JSON.stringify(info));
    
        info.splice(0, info.length);

        let a = JSON.parse(LS.getItem('posts', info));

        info.push(...a);

        post.innerHTML = info.map((item) => {

            let g = [];

            item.forEach((item) => {
                g = item;   
                getId = item.id

            });

            return `
                    <div class="post" id="${g.id}">
                        <div>
                            <h3 class="name">${g.title}</h3>
                            <p class="p">${g.content}</p>
                        </div>
                        <div>
                            <button class='comments'  id="${g.id}">add comments</button>
                            <button class='hide'  id="${g.id}">hide comments</button>
                        </div>
                    </div>
                   `
                   
        }).join('').slice()

        input.value = '';
        textarea.value = '';

        
        document.location.reload();             
    }
}   


let aa = [];

let getId;

let end = [];

let ones;
let twos;

window.onload = function(){


    if(LS.getItem('posts') !== null){
        let b = JSON.parse(LS.getItem('posts', info))
        info.push(...b);
        post.innerHTML = info.map((item) => {
            let r = [];

            item.forEach((item) => {
                r = item;  
                getId = item.id 
                ones = item;
            });
            return `
                <div class="post" id="${r.id}">
                    <div>
                        <h3 class="name">${r.title}</h3>
                        <p class="p">${r.content}</p>
                    </div>
                    <div class='action'>
                        <button class='comments' id=''${r.id}>add comments</button>
                        <button class='hide' id=''${r.id}>hide comments</button>
                    </div>
                </div>
                   `
            }).join('').slice()
        }


let comments = document.getElementsByClassName('comments');

let numComments = comments.length;

for (var i = 0; i < numComments; i++) {
    comments[i].addEventListener('click', openList, false);
  }


let hide = document.getElementsByClassName('hide');

for (var i = 0; i < numComments; i++) {
    hide[i].addEventListener('click', hideList, false);
  }

function empty () {
    coment.innerHTML = '';
}

function hideList () { 
    empty()      
}

// function addBlock () {
//     addCom.innerHTML = `
//     <div id='before' class='first' id="${getId}">
//         <textarea class='comm' placeholder='writing your comment'></textarea>
//         <button class='send'>add comment</button>
//     </div>
//   `
// }
  
function openList (event) {

coment.innerHTML = ''
   post.innerHTML = `
   <div class="post" id="${ones.id}">
        <div>
            <h3 class="name">${ones.title}</h3>
            <p class="p">${ones.content}</p>
        </div>
        <div class='action'>
            <button class='comments' id=''${ones.id}>add comments</button>
            <button class='hide' id=''${ones.id}>hide comments</button>
        </div>
    </div>
    <div id='before' class='first' id="${getId}">
        <textarea class='comm' placeholder='writing your comment'></textarea>
         <button class='send'>add comment</button>
    </div>
   `
   
    let textCom = document.querySelector('.comm');
    textCom.addEventListener('blur', putUp);

    
    function putUp(event) {

        if(textCom.value !== ''){
            let bb = [{
                text:  textCom.value,
                id: getId
            }];

            aa.push(bb);

            LS.setItem('comments',JSON.stringify(aa));

            let we = JSON.parse(LS.getItem('comments', aa));

            aa.splice(0, aa.length);

            aa.push(...we);

            coment.innerHTML = aa.map((item) => {
                let c = [];
                item.forEach((item) =>{
                    c = item;
                })
            return `
              <div class='this' id='${c.id}'>
                  <p>${c.text}</p>
              </div>
            `
            }).join('').slice();
    
            textCom.value = '';
            document.location.reload();           
        }

    }
}

function commentComponent (t) {
    return `
     <div class='this' id='${t.id}'>
         <p>${t.text}</p>
     </div>
 `   
}


if(LS.getItem('comments') !== null){
    let see = JSON.parse(LS.getItem('comments', aa));
    
        aa.splice(0, aa.length);
    
        aa.push(...see);
    
        coment.innerHTML = aa.map((item) => {
            let t = [];
            
            item.forEach((item) =>{
                t = item;
                twos = item;
            })
            return commentComponent(t)

        }).join('').slice()
    
    }
}

   