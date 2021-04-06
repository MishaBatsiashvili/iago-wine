import gsap from 'gsap';

export const scrollToTop = () => {
    window.scroll(0,0);
}

export const bounceAnimation = (dom, duration = 0.2, scale = 1.2) => {
    gsap.to(dom, {
        duration: duration,
        scaleX: scale,
        scaleY: scale,
        ease: 'back',
        onComplete: () => {
            gsap.to(dom, {
                duration: duration,
                scaleX:1,
                scaleY:1,
                ease: 'back',
            })
        }
    })
}