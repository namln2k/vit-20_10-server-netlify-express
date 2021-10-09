// Gift animation
const gift = document.getElementById('gift')
const wrap_1 = document.getElementById('wrap-1')
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

cardAnimations.forEach((card, index) => {
    cards[index].addEventListener('click', () => {
        card.goToAndPlay(0, true)
    })
})