let DB = JSON.parse(localStorage.getItem('DB')) || []


const initDb = () => {

    const DB_KEY = 'DB';
    const getAllPosts = () => {
        let localStorageItems = localStorage.getItem(DB_KEY)
        if (localStorageItems) {
            DB = JSON.parse(localStorageItems);

            return DB
        }
        return []
    }
    return {
        getAllPosts
    }
};

const initRender = () => {

    const postsListContainer = document.getElementById('postsLists');
    const renderOnePost = (post) => {
        const mainDiv = document.createElement('div');
        mainDiv.classList = 'post-block'
        const postDiv = document.createElement('div');       
        postDiv.classList = 'post-body'
        const title = document.createElement('h3');
        title.innerHTML = post.title;
        const content = document.createElement('p');
        const addcom = document.createElement('button')
        addcom.classList = 'btn btn-success'
        addcom.innerHTML = 'add comment';
        content.innerHTML = post.content;
        postDiv.appendChild(title);
        postDiv.appendChild(content);
        postDiv.appendChild(addcom);
        mainDiv.appendChild(postDiv)
        postsListContainer.appendChild(mainDiv);

       
        if(post.comments){
            let arr = post.comments;
            arr.map((item) => {
                const postCom = document.createElement('div');
                postCom.classList = 'com-block'
                const comment = document.createElement('p');
                comment.classList = 'com-text'
                comment.innerHTML = item
                postCom.appendChild(comment)
                mainDiv.appendChild(postCom)
                postsListContainer.appendChild(mainDiv)
            })
            
        }
       
        
        formListenerSend(addcom,postsListContainer, mainDiv, post);
        
    }



    const formListenerSend = (addcom,postsListContainer,mainDiv, post) => {
        
        function inputText () {
                const textAreaDiv = document.createElement('div');
                textAreaDiv.classList = 'add-com'
                const textarea = document.createElement('textarea');
                textarea.classList = 'textarea'
                const send = document.createElement('button');
                send.classList = 'resp'
                send.innerHTML = 'send';
                textAreaDiv.appendChild(textarea);
                textAreaDiv.appendChild(send);
                mainDiv.appendChild(textAreaDiv);
                postsListContainer.appendChild(mainDiv);
               

                formListenerCom(send,textarea,post)

        }

        addcom.addEventListener('click', inputText);
    }


            const formListenerCom = (send,textarea, post) => {

            function sendCom () {
                if(!textarea.value == ''){
                    let a = textarea.value

                    DB.forEach((item) => {
                        if(item.id === post.id){
                            item.comments.push(a);                   
                        }
                    })

                    let newDB = DB;
                    localStorage.setItem('DB', JSON.stringify(newDB));
                    document.location.reload(); 
                    DB.push(JSON.parse(localStorage.getItem('DB')))
                }

            }

                send.addEventListener('click', sendCom)
            }


    const renderExistsPosts = () => {
        const posts = db.getAllPosts()
        posts.map(post => {
            renderOnePost(post)
        })
    }
    const formListener = () => {
        
        document.querySelector('button').addEventListener('click', (event) => {
            let title = document.getElementById("postTitle").value;
            let desc = document.getElementById("postDesc").value;

            if(!title == '' && !desc == ''){
                let blog = {id: Date.now(), title: title, content: desc, comments: []}
                DB.push(blog);
                localStorage.setItem('DB', JSON.stringify(DB));
                document.location.reload(); 
            }
  
        })
    }


    formListener()

    return  {
        renderExistsPosts,

    }
}


const db = initDb();
const render = initRender();


render.renderExistsPosts();