import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { MainScene } from './scenes/mainScene';

const CAMERA_Z_POSITION = 30;

class App {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private orbitControls: OrbitControls;

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  constructor(canvas: HTMLCanvasElement) {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
    });

    // Scene
    this.scene = new MainScene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75, // field of view in degrees,
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // view frustrum. Distance of how close we are able to see objects
      1000, // view frustrum. Distance of how far we are able to see objects
    );



    // Controls
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    // Bindings
    this.getScene = this.getScene.bind(this);
    this.animateScene = this.animateScene.bind(this);
    this.init = this.init.bind(this);
    this.run = this.run.bind(this);

    this.init()
  }

  private init() {
    // Renderer
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight); 
    
    // Camera
    this.camera.position.setZ(CAMERA_Z_POSITION)
    this.camera.position.setX(-3)
  }

  private animateScene() {
    requestAnimationFrame(this.animateScene);

    if (this.scene instanceof MainScene) {
      this.scene.animateFrame();
    }

    this.orbitControls.update();

    this.renderer.render(this.scene, this.camera);
  }

  run() { 
    this.animateScene();
  }  
}

const canvas: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>('#app') || document.createElement('canvas');
const app = new App(canvas);

function moveCamera() {
  const top = document.body.getBoundingClientRect().top;

  const scene = app.getScene();
  if (scene instanceof MainScene) {
    const moon = scene.getMoon();
    moon.rotateX(0.05);
    moon.rotateY(0.075);
    moon.rotateZ(0.05);

    const teseract = scene.getTeseract();
    teseract.rotateX(0.01);
    teseract.rotateY(0.01);

    const camera = app.getCamera();
    camera.position.z = top * -0.01;
    camera.position.x = top * -0.0002;
    camera.rotateY(top * -0.0002);
  }
}

document.body.onscroll = moveCamera;

app.run();