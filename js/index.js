/*
 * code by sin
 * April 30 2017
 */

var colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var current_text = "";
var current_author = "";

function get_quote(){
    /* AJAX */
    // step 1
    var xhr;
    if(window.XMLHttpRequest){    // Mozilla, safari, chrome, IE7+..
        xhr = new XMLHttpRequest();
    }
    else if(window.ActiveXObject){    // IE6 and older
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // step 3
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){

                // show the new quote
                var quoteText = JSON.parse(xhr.responseText);
                current_text = quoteText[0].quote;
                current_author = quoteText[0].author;
                var textObj = document.getElementById("text");
                var authorObj = document.getElementById("author");
                textObj.innerHTML = current_text;
                authorObj.innerHTML = current_author;

                // change the color
                var color = Math.floor(Math.random() * colors.length);
                var bodyObj = document.getElementsByTagName("body")[0];
                var buttonObj = document.getElementById("opt-button");
                var buttonsObj = buttonObj.getElementsByTagName("a");
                var newButtonObj = document.getElementById("new-quote");
                bodyObj.style.backgroundColor = colors[color];
                bodyObj.style.color = colors[color];
                for(var i = 0; i < buttonsObj.length; i++){
                    buttonsObj[i].style.backgroundColor = colors[color];
                }
                newButtonObj.style.backgroundColor = colors[color];
            }
        }
        else{

        }
    }

    // step 2
    var data = ["movies", "famous"]
    var i = Math.floor(Math.random() * data.length);
    var cat = data[i];
    xhr.open("POST", "https://andruxnet-random-famous-quotes.p.mashape.com/", true);
    xhr.setRequestHeader("X-Mashape-Key", "JzJgUTy8JLmshRcQoWBiYTh4u7Dtp1sUKszjsnrSWaVyO63WQq");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send("cat=" + encodeURIComponent(cat));
}

window.onload = function(){
    get_quote();
    var newQuoteObj = document.getElementById("new-quote");
    newQuoteObj.addEventListener("click", get_quote);
}
