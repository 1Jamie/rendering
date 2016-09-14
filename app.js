///include="/babylon.2.4.js" 

 window.addEventListener('DOMContentLoaded', function() {
// get the canvas for rendering
var canvas = document.getElementById("rendercanvas");
// start the babylon 3D engine
var engine = new BABYLON.Engine(canvas, true);
// creating the scene
var createScene = function(){
    //create a basic BJS scene object
    var scene = new BABYLON.Scene(engine);
    //creating the camera real fast
    var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0,5,-10), scene);
    //target the camera to the scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    //attach the camera to the canvas
    camera.attachControl(canvas, false);
    //we need to create some light so that everything is visible
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,-1), scene);
    //lets create the ground for the camera/view point to sit on
    var ground = BABYLON.Mesh.CreateGround('ground1', 12,12,1, scene);
    //create a basic shape for now will run with more later
    var block = BABYLON.Mesh.CreateBox('box1', 4, scene);
    block.position.z = 1;
    block.position.x = 2;
    block.position.y = -1;
    //return the scene created
    return scene;
}
// need to call up the create scene to use
var scene = createScene();
engine.runRenderLoop(function() {
scene.render();
});
window.addEventListener('resize', function() {
    engine.resize();
});























    });