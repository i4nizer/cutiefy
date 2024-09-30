const bannerAddIcon = document.getElementById('banner-add-icon')
const uploadForm = document.getElementById('upload-form')

// Hide Upload Form
uploadForm.style.display = 'none'

// Show Upload Form
bannerAddIcon.onclick = (e) => uploadForm.style.display = 'flex'





const songName = document.getElementById('song-name')
const songInput = document.getElementById('song')

const thumbnailName = document.getElementById('thumbnail-name')
const thumbnailInput = document.getElementById('thumbnail')

// Check & Validate file name
songInput.onchange = e => songName.textContent = e.target.files[0]?.name ?? 'Select Song'
thumbnailInput.onchange = e => thumbnailName.textContent = e.target.files[0]?.name ?? 'Select Thumbnail'