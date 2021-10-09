// Heart animation
const heart = document.getElementById('heart')
const heartAnimation = bodymovin.loadAnimation({
    container: heart,
    path: 'https://assets1.lottiefiles.com/datafiles/nZgj7wTd56UtH6m/data.json',
    renderer: 'svg',
    loop: true,
    autoplay: false,
})

const heartFlyings = document.querySelectorAll('.heart-flying')
const heartFlyingAnimations = []
heartFlyings.forEach(el => {
    const animation = bodymovin.loadAnimation({
        container: el,
        path: 'https://assets3.lottiefiles.com/packages/lf20_dvmiho7v.json',
        renderer: 'svg',
        loop: true,
        autoplay: false,
    })
    heartFlyingAnimations.push(animation)
})

// Yes/No
const btnYes = document.getElementById('btn-yes')
const btnNo = document.getElementById('btn-no')
const title = document.getElementById('title')

btnNo.addEventListener('click', () => {
    const bodyWidth = document.body.clientWidth
    const bodyHeight = document.body.clientHeight
    const btnWidth = btnNo.offsetWidth
    const btnHeight = btnNo.offsetHeight
    const titleHeight = title.offsetHeight + title.offsetTop
    const oldLeft = btnNo.offsetLeft
    const oldTop = btnNo.offsetTop
    let newLeft = Math.abs(Math.floor(Math.random() * bodyWidth - btnWidth))
    let newTop = Math.abs(Math.floor(Math.random() * bodyHeight - btnHeight))

    while(newLeft < btnWidth || newLeft + btnWidth >= bodyWidth || newLeft >= oldLeft - btnWidth && newLeft <= oldLeft + btnWidth) {
        newLeft = Math.abs(Math.floor(Math.random() * bodyWidth - btnWidth))
    }
    while(newTop < titleHeight || newTop + btnHeight >= bodyHeight || newTop >= oldTop - btnHeight && newTop <= oldTop + btnHeight) {
        newTop = Math.abs(Math.floor(Math.random() * bodyHeight - btnHeight))
    }

    btnNo.style.left = newLeft + 'px'
    btnNo.style.top = newTop + 'px'

    btnYes.style.left = oldLeft + 'px'
    btnYes.style.top = oldTop + 'px'
})

// Modal 1
const modal_1 = document.getElementById('modal-1')
const modalClose_1 = document.getElementById('modal-1-close')

modalClose_1.addEventListener('click', () => {
    modal_1.classList.remove('active')
})

btnYes.addEventListener('click', () => {
    modal_1.classList.add('active')
    heartAnimation.goToAndPlay(0, true)
})

const form_1 = document.getElementById('form-1')
form_1.onsubmit = e => {
    e.preventDefault()
}

// Set reason
const reason = 'Vì anh em quá đẹp trai, soái ca với ga lăng nữa, hihi'
const btnOk = document.getElementById('card-ok')
const total = document.getElementById('total')
const curr = document.getElementById('curr')
let count = 0
total.innerText = reason.length
curr.innerText = reason.length
const inputReason = document.getElementById('card-input')
inputReason.oninput = () => {
    if(count < reason.length) {
        inputReason.value = reason.substring(0, ++count)
        curr.innerText = reason.length - count
    } else {
        inputReason.value = reason
    }
    if(count === reason.length) {
        btnOk.classList.remove('btn--disable')
    }
}

// Modal 2
const modal_2 = document.getElementById('modal-2')

btnOk.addEventListener('click', () => {
    modal_1.classList.remove('active')
    heartFlyingAnimations.forEach(el => {
        el.goToAndPlay(0, true)
    })
    setTimeout(() => {
        modal_2.classList.add('active')
    }, 200)
})

// Login
const login = document.getElementById('card-login')
const modalFormLogin = document.getElementById('modal-form-login')
const formLogin = document.getElementById('form-login')
formLogin.onsubmit = e => {
    e.preventDefault();
}
login.addEventListener('click', () => {
    modal_2.classList.remove('active')
    setTimeout(() => {
        modalFormLogin.classList.add('active')
    }, 200)
})