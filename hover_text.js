AFRAME.registerComponent('hover-text', {
    schema: {
        value: {
            default: ''
        }
    },

    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener('mouseenter', function () {
            el.setAttribute('text', {
                content: data.content
            });
        });
    }
});
