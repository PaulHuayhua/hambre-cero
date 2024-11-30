document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    // Función para obtener los comentarios desde el servidor
    function fetchComments() {
        fetch('http://54.163.138.15:3001/comments')
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener los comentarios.');
                return response.json();
            })
            .then(data => {
                console.log('Comentarios recibidos:', data); 
                displayComments(data); 
            })
            .catch(error => {
                console.error('Error al cargar los comentarios:', error);
            });
    }

    // Función para crear y mostrar los comentarios en el DOM
    function displayComments(comments) {
        commentsList.innerHTML = '';

        // Validar que 'comments' sea un array antes de procesarlo
        if (!Array.isArray(comments)) {
            console.error('Los comentarios no son un array:', comments);
            return;
        }

        comments.forEach(comment => {
            if (validateComment(comment)) {
                addCommentToList(comment);
            } else {
                console.warn('Comentario mal formado:', comment);
            }
        });
    }

    // Función para validar un comentario
    function validateComment(comment) {
        return (
            comment &&
            typeof comment === 'object' &&
            typeof comment.nombre === 'string' &&
            typeof comment.comentario === 'string'
        );
    }

    // Manejar el envío de un nuevo comentario
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto

        const nameInput = document.getElementById('nombre');
        const commentInput = document.getElementById('comentario');

        if (nameInput.value.trim() && commentInput.value.trim()) {
            const newComment = {
                nombre: nameInput.value.trim(),
                comentario: commentInput.value.trim()
            };

            fetch('http://54.163.138.15:3001/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
                .then(response => {
                    if (!response.ok) throw new Error('Error al enviar el comentario.');
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        addCommentToList({ ...newComment, replies: [] });
                        nameInput.value = '';
                        commentInput.value = '';
                    } else {
                        alert(data.message || 'Error desconocido al enviar el comentario.');
                    }
                })
                .catch(error => {
                    console.error('Error al enviar el comentario:', error);
                });
        } else {
            alert('Por favor, ingrese un nombre y un comentario.');
        }
    });

    // Función para agregar un comentario al DOM
    function addCommentToList(comment) {
        const commentItem = document.createElement('li');
        commentItem.classList.add('comment-item');

        const commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-profile');

        const profilePic = document.createElement('div');
        profilePic.classList.add('profile-pic');
        profilePic.style.backgroundImage = "url('/img/perfil.png')";

        const commentDetails = document.createElement('div');
        commentDetails.classList.add('comment-details');
        commentDetails.innerHTML = `<strong>${comment.nombre}</strong>`;

        const commentText = document.createElement('p');
        commentText.classList.add('comment-text');
        commentText.textContent = comment.comentario;

        const viewRepliesBtn = document.createElement('button');
        viewRepliesBtn.classList.add('view-replies-btn');
        viewRepliesBtn.textContent = `Ver respuestas (${comment.replies ? comment.replies.length : 0})`;

        const repliesContainer = document.createElement('div');
        repliesContainer.classList.add('replies', 'hidden');

        if (comment.replies && Array.isArray(comment.replies)) {
            comment.replies.forEach(reply => {
                const replyItem = document.createElement('div');
                replyItem.classList.add('reply-item');
                replyItem.innerHTML = `
                    <div class="reply-profile">
                        <div class="profile-pic"></div>
                        <div class="reply-details">
                            <strong>${reply.nombre}</strong>
                            <p>${reply.respuesta}</p>
                        </div>
                    </div>`;
                repliesContainer.appendChild(replyItem);
            });
        }

        viewRepliesBtn.addEventListener('click', function () {
            repliesContainer.classList.toggle('hidden');
            viewRepliesBtn.textContent = repliesContainer.classList.contains('hidden')
                ? `Ver respuestas (${comment.replies ? comment.replies.length : 0})`
                : 'Ocultar respuestas';
        });

        commentItem.appendChild(commentHeader);
        commentHeader.appendChild(profilePic);
        commentItem.appendChild(commentDetails);
        commentItem.appendChild(commentText);
        commentItem.appendChild(viewRepliesBtn);
        commentItem.appendChild(repliesContainer);

        commentsList.appendChild(commentItem);
    }

    // Inicializar la lista de comentarios
    fetchComments(); // Cargar los comentarios al cargar la página
});
