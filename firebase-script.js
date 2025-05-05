
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const postBtn = document.getElementById("postBtn");
    const commentInput = document.getElementById("commentInput");
    const commentSection = document.getElementById("commentSection");

    loginBtn.onclick = () => {
        const email = prompt("Enter email:");
        const password = prompt("Enter password:");
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => alert("Logged in!"))
            .catch(error => alert(error.message));
    };

    signupBtn.onclick = () => {
        const email = prompt("Enter new email:");
        const password = prompt("Enter new password:");
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => alert("Account created!"))
            .catch(error => alert(error.message));
    };

    postBtn.onclick = () => {
        const user = firebase.auth().currentUser;
        if (!user) {
            alert("You must be logged in to comment.");
            return;
        }
        const comment = commentInput.value.trim();
        if (comment) {
            const newComment = {
                user: user.email,
                text: comment,
                timestamp: Date.now()
            };
            firebase.database().ref("comments").push(newComment);
            commentInput.value = "";
        } else {
            alert("Write something first.");
        }
    };

    firebase.database().ref("comments").on("child_added", (snapshot) => {
        const comment = snapshot.val();
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `<strong>${comment.user}</strong>: ${comment.text}`;
        commentSection.appendChild(div);
    });
});
