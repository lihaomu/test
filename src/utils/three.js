/**
 * Created by leo on 2019/10/24.
 */

window.requestAnimationFrame = (() =>
  window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function (callback) { setTimeout(callback, 1000/60) }
)();

import * as THREE from "three";
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';

const OrbitControls = require('three-orbit-controls')(THREE);

const three = {
  el: null,
  scene: null,
  camera: null,
  renderer: null,
  controls: null,

  init (el, mtl, obj) {
    const { width, height } = el.getBoundingClientRect();

    this.el = el;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setSize(width, height);

    this.el.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 0, 10);

    this.controls = new OrbitControls(this.camera);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    this.draw(mtl, obj);
    this.render();
  },
  resize () {
    const { width, height } = this.el.getBoundingClientRect();

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  },
  draw () {
    new MTLLoader().setPath('/public/model/modelFirst/').load('modelFirst.mtl', materials => {
      console.log(materials);
      materials.preload();
      // new OBJLoader().setMaterials(materials).setPath('/public/model/modelFirst/').load('modelFirst.obj', obj => {
      //   console.log(obj);
      //   obj.scale.set(0.8, 0.8, 0.8);
      //   obj.position.set(-40, -50, 10);
      //   this.scene.add(obj);
      // });
    });
  },
  render () {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

export default three;