import * as THREE from 'three';

export class Moon extends THREE.Mesh {
  constructor() {
    const moonTexture = new THREE.TextureLoader().load('moon.jpeg');
    const normalTexture = new THREE.TextureLoader().load('normal.jpeg');
    const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
    const moonMaterials = new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
      // wireframe: true,
    });

    super(moonGeometry, moonMaterials);
  }
}