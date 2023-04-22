const submitBtn = document.querySelector(".submit-btn")
submitBtn.addEventListener('click', (e) => {
    const name = document.querySelector("input,[name='name']").value;
    const room = document.querySelector("input,[name='room']").value;

    if(name == "" || room == "") {
        alert("Username and room cannot be empty");
        e.preventDefault();
    }
})