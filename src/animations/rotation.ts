import * as THREE from 'three'

export const rotate = (mesh: THREE.Mesh) => {
  mesh.rotateX(0.01);
}