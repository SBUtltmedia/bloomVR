AFRAME.registerComponent('hover-text', {
    schema: {
        value: {
            default: ''
        }
        size: {
            default: 20 px;
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
