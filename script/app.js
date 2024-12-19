const button = document.querySelector('.generator')
const advice = document.querySelector('.advice-api')
const rollTL = gsap.timeline({
    paused: true
})
const changeAdvice = gsap.timeline({
    paused: true
})

const getAdvice = async (advice) => {
    let res = await fetch ('https://api.adviceslip.com/advice')
    const data = await res.json()
    giveAdvice(data.slip)
}


let giveAdvice = function(data) {
    advice.querySelector("h1").textContent = `ADVICE ${data.id}`
    advice.querySelector("p").textContent = `"${data.advice}"`
} 

changeAdvice
  .to('.advice-api h1', {x: "-150vw", ease: "back.inOut", duration: .3})
  .to('.advice-api p', {x: "150vw", ease: "back.inOut", duration: .3}, "<")
  .to('.advice-api h1', {x: 0, y:"150vh", duration: .05})
  .to('.advice-api p', {x: 0, y:"150vh", duration: .05}, "<")
  .to('.advice-api h1', {x: "150vw", y:0, duration: .05})
  .to('.advice-api p', {x: "-150vw", y:0, duration: .05}, "<")
  .to('.advice-api h1', {x: 0, ease: "back.inOut", duration: .6})
  .to('.advice-api p', {x: 0, ease: "back.inOut", duration: .6})

rollTL
    .to('.main .generator img', {rotate: "720deg", ease: "back.inOut", duration: 1})

button.addEventListener('click', () =>{
  rollTL.restart()
  changeAdvice.restart()
  getAdvice()
})