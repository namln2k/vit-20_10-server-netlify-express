console.log(window.sessionStorage.getItem('imageURL'));

// Gift animation
const gift = document.getElementById('gift')
const wrap_1 = document.getElementById('wrap-1')
const wrap_2 = document.getElementById('wrap-2')

const giftAnimation = bodymovin.loadAnimation({
    container: gift,
    path: 'https://assets2.lottiefiles.com/packages/lf20_Dn85as.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
})

gift.addEventListener('click', () => {
    giftAnimation.goToAndPlay(0, true)
})

giftAnimation.addEventListener('complete', () => {
    gift.classList.add('hide')
    wrap_1.classList.add('hide')
    wrap_2.classList.remove('hide')
})

const confetti = document.getElementById('confetti')
const confettiAnimation = bodymovin.loadAnimation({
    container: confetti,
    path: 'https://assets3.lottiefiles.com/packages/lf20_rovf9gzu.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
})

window.onload = () => {
    setTimeout(() => {
        confettiAnimation.goToAndPlay(0, true)
    }, 500)
}

confettiAnimation.addEventListener('complete', () => {
    confetti.classList.add('hide')
})

// Card
const cards = document.querySelectorAll('.card')
const cardAnimations = []
cards.forEach(card => {
    const animation = bodymovin.loadAnimation({
        container: card,
        path: 'https://assets1.lottiefiles.com/packages/lf20_6bnmd1ys.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    })
    cardAnimations.push(animation)
})

const modal = document.querySelector('.modal')
const closeBtn = document.querySelector('.modal__close')
let curr = 0

cardAnimations.forEach((card, index) => {
    cards[index].addEventListener('click', () => {
        curr = index
        card.goToAndPlay(15, true)
        cards.forEach(card => {
            card.classList.add('disable')
        })
        setTimeout(() => {
            card.pause()
            modal.classList.add('active')
        }, 2100)
    })
})

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active')
    setTimeout(() => {
        cardAnimations[curr].goToAndPlay(160, true)
        cardAnimations[curr].addEventListener('complete', () => {
            cards.forEach(card => {
                card.classList.remove('disable')
            })
        })
    }, 300)
})