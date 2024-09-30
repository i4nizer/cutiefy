const audio = document.getElementById('audio')
const progressBar = document.getElementById('progress-bar')
const prevIcon = document.getElementById('prev-icon')
const playIcon = document.getElementById('play-icon')
const pauseIcon = document.getElementById('pause-icon')
const nextIcon = document.getElementById('next-icon')

// play control
let isPlaying = false
const onTogglePlay = () => {
    playIcon.style.display = isPlaying ? 'flex' : 'none'
    pauseIcon.style.display = isPlaying ? 'none' : 'flex'
    
    if (!isPlaying) audio.play()
    else audio.pause()
    
    isPlaying = !isPlaying
}

const onForward = () => audio.currentTime += 10
const onBackward = () => audio.currentTime -= 10

// react to visual updates
const onUpdate = () => {
    progressBar.value = audio.currentTime / audio.duration * 100
    
    if (audio.currentTime == audio.duration) {
        playIcon.style.display = 'flex'
        pauseIcon.style.display = 'none'
        isPlaying = false
    }
}

progressBar.oninput = () => {
    audio.currentTime = progressBar.value * audio.duration / 100; onUpdate()
}

setInterval(onUpdate, 500)

// accessibility/shortcuts
document.addEventListener('keydown', (e) => {
    const tag = e.target.tagName.toLowerCase()
    if (tag === 'input' || tag === 'textarea') return;
    
    if (e.keyCode == 32 || e.keyCode == 75) onTogglePlay()
    else if (e.keyCode == 74) { onBackward(); onUpdate() }
    else if (e.keyCode == 76) { onForward(); onUpdate() }
})