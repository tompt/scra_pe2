var tl = new TimelineMax({repeat:6});

tl.to(".bg_ad", 10, {
    scale:1.2, ease:Power1.easeIn
    })
.to(".claim_sd .primeira", 1, {
    opacity:1, ease:Power1.easeIn
    }, '-=10')
.to(".claim_sd .segunda", 1, {
    opacity:1
    }, '-=8')
.to(".claim_sd .terceira", 0.8, {
    opacity:1
    }, '-=6')
.to(".claim_sd .quarta", 0.8, {
    opacity:1
    }, '-=4')
.to(".desv_a", 0.8, {
    left:30, ease: Back.easeInOut.config(1), opacity:1
    }, '-=2.05')
.to(".desv_b", 0.8, {
    left:30, ease: Back.easeInOut.config(1), opacity:1
    }, '-=1.45')
.to(".desv_c", 0.8, {
    left:30,  ease: Back.easeInOut.config(1), opacity:1
    }, '-=1.15')
.to(".desv_a", 0.4, {
    delay: 2, left:300, ease: Power4.easeIn, opacity:0
    }, '-=1')
.to(".desv_b", 0.4, {
    left:300,  ease: Power4.easeIn, opacity:0
    }, '-=0.4')
.to(".desv_c", 0.4, {
    left:300,  ease: Power4.easeIn, opacity:0
    }, '-=0.4')
.to(".claim_sd", 0.7, {
    left:340, ease: Back.easeInOut.config(1), opacity:1
    }, '-=0.7')
.to("#parte_superior", 0.7, {
    left:47, ease: Back.easeInOut.config(1), opacity:1
    })
.to(".vant_a", 1.2, {
    left:30, ease:Power4.easeIn, opacity:1
    }, '-=1.1')
.to(".vant_b", 1.2, {
    left:30, ease:Power4.easeIn, opacity:1
    }, '-=0.8')
.to(".vant_c", 1.2, {
    left:30,  ease:Power4.easeIn, opacity:1
    }, '-=0.8')
.to(".vant_c", 1.2, {
    delay: 3,
    opacity: 1
    }, '-=0.8');