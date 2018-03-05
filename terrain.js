AFRAME.registerComponent('terrain', {
  schema: {
    width: {type: 'number', default: 5},
    height: {type: 'number', default: 5},
   
       slope: {type: 'number', default: 3},
    position: {type: 'vec3', default: {x: 0, y: 0, z: 0}  }
  },

  init: function () {
      
      
      var parentEl = document.createElement('a-entity');

      
      
      
      
      entityEl.setAttribute("step","");

      
      
      
      
      
      sceneEl.appendChild(entityEl);  
      
      
      
    var data = this.data;
    
    var el = this.el;
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
    this.position = data.position; 
    this.material = new THREE.MeshStandardMaterial({color: data.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    el.setObject3D('mesh', this.mesh);
    el.setAttribute('position', {
      x: data.position.x,
      y: data.position.y ,
      z: data.position.z 
    });
  },

  /**
   * Update the mesh in response to property updates.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }

    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width ||
        data.height !== oldData.height ||
        data.depth !== oldData.depth) {
      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                                                                    data.depth);
    }

    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = data.color;
    }
  }
});