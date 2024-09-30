const bannerAddIcon = document.getElementById('banner-add-icon')
const playlistForm = document.getElementById('playlist-form')

bannerAddIcon.onclick = () => playlistForm.style.display = 'flex'



const onPlaylistClick = (item) => window.location.assign(`/playlists/${item.id.substring(10)}`)


const onPlaylistEdit = () => {

}

const onPlaylistDel = () => {

}