window.onload = () =>{
    document.getElementById("submit").addEventListener("click", search)
}

async function search(){
    console.log("clicked")
    
    // retrieve data from text
    const inputText = document.getElementById("textInput").value

    // constructing the parameters that go inside the url
    // automatically converted to key=value&
    const params = new URLSearchParams({
        apikey: "9aa8e798",
        s: inputText,
        type: "movie"
    })

    // constructing url using the api url and the params from above
    let url = "http://omdbapi.com/?" + params

    let response = await fetch(url)
    // make sure request is working at this point
    // console.log(response)

    let jsonResponse = await response.json().then(success, error)
}

function success(response){
    console.log(response)
    let movies = response.Search

    for(let m = 0; m < movies.length; m++){
        let movie = movies[m]

        let newElement = document.createElement('div')

        newElement.append(movie.Title)
        let img = document.createElement('img')
        img.src = movie.Poster

        newElement.append(img)

        document.getElementById("movies").append(newElement)
    }
}

function error(err){
    console.log(err)
}