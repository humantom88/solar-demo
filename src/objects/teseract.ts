import * as THREE from 'three';

export class MarvelTeseract extends THREE.Mesh {
  constructor() {
    const teseractTexture = new THREE.TextureLoader().load('teseract.png');
    const teseractGeometry = new THREE.BoxGeometry(3, 3, 3);
    const teseractMaterial = new THREE.MeshStandardMaterial({
      map: teseractTexture,
      // wireframe: true,
    });

    super(teseractGeometry, teseractMaterial);
  }
}