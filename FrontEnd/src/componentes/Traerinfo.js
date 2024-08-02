const xhr = XMLHttpRequest();
xhr.open("GET", "http://localhost:5173/post");
xhr.send();
xhr.respondeType="json";
xhr.onload=() => {
    if (xhr.readyState == 4 && xhr.status== 200 ) {
        const data = xhr.response;
        console.log(data);
    } else {
        console.log(`Error: ${xhr.status}`);
    }
};

var URLactual = window. location; alert(URLactual);