AFRAME.registerComponent('step', {
    schema: {
        width: {
            type: 'number',
            default: 1
        },
        height: {
            type: 'number',
            default: 1
        },

        depth: {
            type: 'number',
            default: 1
        },
        color: {
            type: 'color',
            default: 'rgb(255,0,0)'
        },
        opacity: {
            type: 'number',
            default: 0.5
        },
        text: {
            type: 'string',
            default: 'test'
        },
    },

    init: function () {
        var data = this.data;
        var el = document.createElement('a-entity');
        var el2 =document.createElement('a-entity');
        var geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
        var position = data.position;
        var material = new THREE.MeshStandardMaterial({
            color: data.color,
            
        });
        
        var material2 = new THREE.MeshStandardMaterial({
            
        });
        
        var mesh1 = new THREE.Mesh(geometry, material);
        el.setObject3D('mesh', mesh1);
        var mesh2 = new THREE.Mesh(geometry, material2);
        el2.setObject3D('mesh',mesh2)
        el2.setAttribute("material", "src: border.png; transparent:true");
        
      this.el.append(el);
      this.el.append(el2);
        
        
    },

    /**
     * Update the mesh in response to property updates.
     */
    update: function (oldData) {
        var data = this.data;
        var el = this.el;

        // If `oldData` is empty, then this means we're in the initialization process.
        // No need to update.
        if (Object.keys(oldData).length === 0) {
            return;
        }

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
