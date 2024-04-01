import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    mobileAndTabletCheck,
    BloomPlugin,
    Vector3, GammaCorrectionPlugin, MeshBasicMaterial2, Color, AssetImporter
} from "webgi";
import "./styles.css";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

lenis.stop()

function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        // isAntialiased: true,
    })

    const isMobile = mobileAndTabletCheck()
    // console.log(isMobile)

    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target
    const exitButton = document.querySelector('.button--exit') as HTMLElement
    const customizerInterface = document.querySelector('.customizer--container') as HTMLElement

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(true))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    await viewer.addPlugin(BloomPlugin)

    // Loader
    const importer = manager.importer as AssetImporter

    importer.addEventListener("onProgress", (ev) => {
        const progressRatio = (ev.loaded / ev.total)
        // console.log(progressRatio)
        document.querySelector('.progress')?.setAttribute('style', `transform: scaleX(${progressRatio})`)
    })

    importer.addEventListener("onLoad", (ev) => {
        gsap.to('.loader', {x: '100%', duration: 0.8, ease: 'power4.inOut', delay: 1, onComplete: () =>{
            document.body.style.overflowY = 'auto'
            lenis.start()

        }})
    })

    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/apexbike.glb")


    viewer.getPlugin(TonemapPlugin)!.config!.clipBackground = true // in case its set to false in the glb

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

    if (isMobile){
        position.set(2.2054467321, 0.9259946377, -0.3809313057)
        target.set(0.0271075424, 0.8236231038, -0.5415397475)
        camera.setCameraOptions({ fov: 40 })
    }

    onUpdate()
    
    window.scrollTo(0,0)

    function setupScrollanimation(){

        const tl = gsap.timeline()

        // FIRST SECTION

        tl
        .to(position, {x: isMobile ? 2.9956946194 : 3.1525438083, y: isMobile ?  -0.263632569 :  -0.7694875909, z: isMobile ? -0.8775630671 :  -1.2590351867,
            scrollTrigger: {
                trigger: ".second",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }, onUpdate})

        .to(".section--one--container", { xPercent:'-150' , opacity:0,
            scrollTrigger: {
                trigger: ".second",
                start:"top bottom",
                end: "top 80%", scrub: 1,
                immediateRender: false
        }})
        .to(target, {x: isMobile ? 0.1249242486 : -0.3058174186, y: isMobile ? -0.3985584093 : -0.2156749085 , z: isMobile ? -1.089188175 : -1.5028344285,
            scrollTrigger: {
                trigger: ".second",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }})

        // Second SECTION

        .to(position, {x: isMobile ? -1.0546372258: -1.0040240076, y: isMobile ? -0.083115645: 0.0561544269, z: isMobile ? 0.3626380096: 0.1530120774,
            scrollTrigger: {
                trigger: ".third",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }, onUpdate})

        .to(".section--two--container", { xPercent:'-150' , opacity:0,
            scrollTrigger: {
                trigger: ".third",
                start:"top bottom",
                end: "top 80%", scrub: 1,
                immediateRender: false
        }})

        .to(target, {x: isMobile ? -0.4584077804: -0.3650633865, y: isMobile ? -0.1436276521: -0.0261799307 , z: isMobile ? 0.2469291321: 0.0811921734,
            scrollTrigger: {
                trigger: ".third",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }})

        // Forth Section
        .to(position, {x: isMobile ? 0.9158426599 : 0.7550890818, y: isMobile ?  -0.1991139259 :  -0.1394927587, z: isMobile ? 2.0157847650 :  1.5581354529,
            scrollTrigger: {
                trigger: ".forth",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }, onUpdate})

        .to(".section--third--container", { xPercent:'-150' , opacity:0,
            scrollTrigger: {
                trigger: ".forth",
                start:"top bottom",
                end: "top 80%", scrub: 1,
                immediateRender: false
        }})
        .to(target, {x: isMobile ? -0.406018166 : 0.3697407903, y: isMobile ? -0.7313336816 : -0.3568931787 , z: isMobile ? 0.2886071688 : 1.1013269681,
            scrollTrigger: {
                trigger: ".forth",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }})

        // Fifth Section
        .to(position, {x: isMobile ? 12.1864948179 : 7.4390240728, y: isMobile ?  0.1361124651 :  -0.0443694697, z: isMobile ? 0.0701008805 :  -0.1994282899,
            scrollTrigger: {
                trigger: ".fifth",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }, onUpdate})

        .to(".section--forth--container", { xPercent:'-150' , opacity:0,
            scrollTrigger: {
                trigger: ".fifth",
                start:"top bottom",
                end: "top 80%", scrub: 1,
                immediateRender: false
        }})     
        .to(target, {x: isMobile ? -0.4159793185 : -0.3529112036, y: isMobile ? -0.1729473312 : -0.1425344263 , z: isMobile ? 0.1367833772 : -0.1060732952,
            scrollTrigger: {
                trigger: ".fifth",
                start:"top bottom",
                end: "top top", scrub: true,
                immediateRender: false
        }})

    }

    setupScrollanimation()

    // WEBGI UPDATE
    let needsUpdate = true;

    function onUpdate() {
        needsUpdate = true;
        // viewer.renderer.resetShadows()
        viewer.setDirty()
    }

    viewer.addEventListener('preFrame', () =>{
        if(needsUpdate){
            camera.positionTargetUpdated(true)
            needsUpdate = false
        }
    })

}

setupViewer()
