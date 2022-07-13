// nav
const navBtn = document.querySelector('.nav__btn');
const navList = document.querySelector('.header__list');

navBtn.addEventListener('click', ()=>{
    navBtn.classList.toggle('active')
    navList.classList.toggle('active')
})

// video

const video = document.querySelector('.video__andesa'),
      videoCurrent = document.querySelector('#current'),
      videoDuration = document.querySelector('#duration'),
      ruler = document.querySelector('.video__progress-ruler'),
      prevSpeed = document.querySelector('.video__prev-speed'),
      nextSpeed = document.querySelector('.video__next-speed'),
      prev = document.querySelector('.video__prev'),
      next = document.querySelector('.video__next'),
      playPause = document.querySelector('.video__play'),
      volume = document.querySelector('.video__volume'),
      volumeIcon = document.querySelector('.video__volume-icon'),
      range = document.querySelector('.video__volume-range'),
      line = document.querySelector('.video__duration'),
      progress = document.querySelector('.video__progress'),
      textSpeed = document.querySelector('.video__speed-text'),
      restart = document.querySelector('.video__restart'),
      screen = document.querySelector('.video__screen');



function changeTime(time) {
    const noll = (num)=> num < 10 ? '0' + num : num
    let hour = Math.trunc(time / 3600)
    time -= hour * 3600
    let minute = Math.trunc(time / 60)
    time -=minute * 60
    time = Math.trunc(time)
    return `${noll(hour)}:${noll(minute)}:${noll(time)}`
}

function VideoCurrent() {
    setInterval(() => {
        return videoCurrent.innerHTML = changeTime(video.currentTime)
    }, 1000);
}

function VideoDuration() {
    return videoDuration.innerHTML = changeTime(video.duration)
}

playPause.addEventListener('click', function () {
    playPause.classList.toggle('active')
    if (video.paused === true) {
        video.play()
        VideoCurrent()
        VideoDuration()
    }else{
        video.pause()
    }
})

video.addEventListener('dblclick', ()=>{
    if (video.paused === true) {
        video.play()
        VideoCurrent()
        VideoDuration()
    }else{
        video.pause()
    }
    playPause.classList.toggle('active')
})

prev.addEventListener('click', function () {
    alert('sizda boshqa video yo`q')
})
next.addEventListener('click', function () {
    alert('sizda boshqa video yo`q')
})
prevSpeed.addEventListener('click', ()=> playDownSpeed())
nextSpeed.addEventListener('click', ()=> playUpSpeed())

function playDownSpeed() {
    if (video.playbackRate > 0) {
        video.playbackRate -= 0.25
        textSpeed.style.opacity = '1'
        textSpeed.innerHTML = video.playbackRate + 'x'
        setTimeout(() => {
            textSpeed.style.opacity = '0'
        }, 1000);
    }
}
function playUpSpeed() {
    if (video.playbackRate < 2) {
        video.playbackRate += 0.25
        textSpeed.style.opacity = '1'
        textSpeed.innerHTML = video.playbackRate + 'x'
        setTimeout(() => {
            textSpeed.style.opacity = '0'
        }, 1000);
    }
}

volumeIcon.addEventListener('click', ()=> video.muted == true ? video.muted = false : video.muted = true)

const volumeIcons = ['mute','off','down','downup','up']

video.onvolumechange = ()=>{
    for (let i = 0; i < volumeIcons.length; i++) {
        volumeIcon.classList.remove(volumeIcons[i])
    }
    let volume = video.volume * 100
    if (video.muted) {
        volumeIcon.classList.add('mute')
    }else if (volume > 75) {
        volumeIcon.classList.add('up')
    }else if (volume > 50) {
        volumeIcon.classList.add('downup')
    }else if (volume > 25) {
        volumeIcon.classList.add('down')
    }else if (volume > 0) {
        volumeIcon.classList.add('off')
    }else if (volume == 0) {
        volumeIcon.classList.add('mute')
    }
}
range.addEventListener('change', function (e) {
    video.volume = e.currentTarget.value / 100
    
})
line.addEventListener('click', function (e) {
    const videoTime = (e.offsetX / line.clientWidth) * video.duration
    video.currentTime = videoTime
})
video.addEventListener('timeupdate', ()=>{
    let progressTime = (video.currentTime / video.duration)
    progress.style.width = progressTime * 100 + '%'
})

restart.addEventListener('click', function () {
    video.currentTime = 0
})
screen.addEventListener('click', function () {
    video.requestFullscreen()
})
