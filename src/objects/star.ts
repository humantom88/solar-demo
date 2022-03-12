import * as THREE from 'three';

export class Star extends THREE.Mesh {
  constructor() {
    const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    super(starGeometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));

    this.position.set(x, y, z);
  }
}