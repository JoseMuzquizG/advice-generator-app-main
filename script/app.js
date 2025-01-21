const button = document.querySelector('.generator');
const advice = document.querySelector('.advice-api');

let isAdviceVisible = false;

const rollTL = gsap.timeline({ paused: true });
const enterTl = gsap.timeline({
    paused: true,
    onComplete: () => {
        isAdviceVisible = true;
    },
});
const exitTl = gsap.timeline({
    paused: true,
    onComplete: () => {
        isAdviceVisible = false;
    },
});

const getAdvice = async () => {
    try {
        let res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        giveAdvice(data.slip);
    } catch (error) {
        console.error('Error fetching advice:', error);
    }
};

const giveAdvice = (data) => {
    advice.querySelector('h1').textContent = `ADVICE #${data.id}`;
    advice.querySelector('p').textContent = `"${data.advice}"`;
};

enterTl
    .from('.advice-api h1', { x: '-150vw', ease: 'back.inOut', duration: 0.5 })
    .from('.advice-api p', { x: '150vw', ease: 'back.inOut', duration: 0.5 }, '<');

exitTl
    .to('.advice-api h1', { x: '150vw', ease: 'back.inOut', duration: 0.5 })
    .to('.advice-api p', { x: '-150vw', ease: 'back.inOut', duration: 0.5 }, '<');

rollTL.to('.main .generator img', { rotate: '720deg', ease: 'back.inOut', duration: 1.25 });

button.addEventListener('click', () => {
    rollTL.restart()
    if (isAdviceVisible) {
        exitTl.restart().then(() => {
            getAdvice().then(() => enterTl.restart());
        });
    } else {
        getAdvice().then(() => enterTl.restart());
    }
});