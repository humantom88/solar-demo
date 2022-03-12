import * as THREE from 'three';

export class Torus extends THREE.Mesh {
  constructor() {
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0xFF6347,
      // wireframe: true,
    });

    super(torusGeometry, torusMaterial);
  }
}