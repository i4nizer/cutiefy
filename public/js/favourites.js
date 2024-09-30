const bannerAddIcon = document.getElementById('banner-add-icon')
const songSearchForm = document.getElementById('song-search-form')

bannerAddIcon.onclick = () => songSearchForm.style.display = 'block'



const songInput = document.getElementById('song-input')
const songId = document.getElementById('song-id')
const dropdown = document.getElementById('dropdown')
let isFetchingSongs = false

// inject dropdown items
const injectSongs = async (songs) => {
    dropdown.innerHTML = ''
    songs.forEach(song => dropdown.innerHTML += `<div onclick="onSongClick(this)" id="song-${song.id}" class="dropdown-item">${song.title}</div>`)
}

// search method
const sendSongSearch = async (params) => {
    if (isFetchingSongs) return
    isFetchingSongs = true
    
    await fetch(`/songs/search/${params}`)
        .then(res => res.json())
        .then(async (data) => {
            // check data
            if (typeof data == typeof []) await injectSongs(data)
            isFetchingSongs = false
        })
        .catch(err => { console.log(err); isFetchingSongs = false})
}

// search after changes
songInput.oninput = async () => {
    const params = songInput.value
    if(params.trim().length == 0) return dropdown.innerHTML = ''

    await sendSongSearch(params)
}

// select dropdown item on click
const onSongClick = (song) => {
    songId.value = song.id.substring(5)
    songInput.value = song.textContent
    dropdown.innerHTML = ''
}
