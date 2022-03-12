import * as THREE from 'three'
import { Moon } from '../objects/moon';
import { Star } from '../objects/star';
import { MarvelTeseract } from '../objects/teseract';
import { Torus } from '../objects/torus';

enum MainSceneKeys {
  torus = 'torus',
  pointLight = 'pointLight',
  ambientLight = 'ambientLight',
  moon = 'moon',
  teseract = 'teseract',
}

export class MainScene extends THREE.Scene {
  private sceneObjects: Map<MainSceneKeys, THREE.Mesh> = new Map();
  private sceneLights: Map<MainSceneKeys, THREE.Light> = new Map();

  constructor() {
    super();

    this.initSceneObjects()
    this.initLights()
    // this.initHelpers()
    this.initTextures()
  }

  getMoon(): Moon {
    return this.sceneObjects.get(MainSceneKeys.moon) as Moon;
  }

  getTeseract(): MarvelTeseract {
    return this.sceneObjects.get(MainSceneKeys.teseract) as MarvelTeseract;
  }

  private initSceneObjects () {
    const torus = new Torus();
    
    Array(200).fill(0).forEach(() => {
      this.add(new Star());
    })

    const marvelTeseract = new MarvelTeseract();
    this.sceneObjects.set(MainSceneKeys.teseract, marvelTeseract);
    this.add(marvelTeseract);
    marvelTeseract.position.z = -5;
    marvelTeseract.position.x = 2;

    const moon = new Moon();
    this.sceneObjects.set(MainSceneKeys.moon, moon);
    this.add(moon);
    moon.position.setZ(30);
    moon.position.setX(-10);

    this.sceneObjects.set(MainSceneKeys.torus, torus);

    this.add(torus);
  }

  private initLights() {
    // Point Light Build
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);

    // Ambient Light Build
    const ambientLight = new THREE.AmbientLight(0xffffff);

    // Adding Lights to The Scene
    this.sceneLights.set(MainSceneKeys.pointLight, pointLight);
    this.sceneLights.set(MainSceneKeys.ambientLight, ambientLight);

    this.add(pointLight, ambientLight);
  }

  private initHelpers () {
    // Helpers

    // Light Helper
    const pointLight = this.sceneLights.get(MainSceneKeys.pointLight) as THREE.PointLight || new THREE.Light();
    const lightHelper = new THREE.PointLightHelper(pointLight);

    // Grid Helper
    const gridHelper = new THREE.GridHelper(200, 50);

    // Adding helpers
    this.add(lightHelper, gridHelper)
  }

  private initTextures() {
    const spaceTexture = new THREE.TextureLoader().load('space.jpg');
    this.background = spaceTexture;
  }

  public animateFrame() {
    const torus = this.sceneObjects.get(MainSceneKeys.torus)
    torus?.rotateX(0.01);
    torus?.rotateY(0.005);
    torus?.rotateZ(0.01);
  }
}