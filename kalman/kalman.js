var KalmanFilter = require('kalmanjs').default;

module.exports = function(RED) {
    function KalmanFilterType(config) {
        RED.nodes.createNode(this, config);
        var kalmanFilter = new KalmanFilter({R: config.R || 0.01, Q: config.Q || 3});
        var node = this;
        this.on('input', function(msg) {
            if(msg.payload instanceof Array) {
                msg.payload = msg.payload.map(function(v) {
                    return kalmanFilter.filter(v);
                });
            }else{
                msg.payload = kalmanFilter.filter(msg.payload);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("kalman-filter", KalmanFilterType);
}
