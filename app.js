/// <reference path="babylon.2.4.d.ts" />
document.addEventListener("DOMContentLoaded", function() {
    //this sets up the basic things we need for rendering
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);

    //this is going to be where most of everything happens
    var createScene = function() {
        //this is going to create a basic babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.collisionsEnabled = true;
        console.log("scene created");

        //any textures we assign will go here
        var texture1 = new BABYLON.Texture("grass.jpg", scene);
        console.log("textures loaded in");

        //creating the free camera we are going to use for the viewport
        var camera = new BABYLON.FreeCamera("main", new BABYLON.Vector3(-4, 1, 4), scene);
        console.log("camera generated");
        camera.checkCollisions = true;
        console.log("camera collisions set");
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);
        console.log("camera attached to canavas");

        //we are going to create the ground we are going to stand on
        //and enable the colliders for the ground so we dont fall throught it
        var ground = new BABYLON.Mesh.CreateGround("grndMain", 10, 10, 2, scene, true);
        console.log("ground created");
        ground.checkCollisions = true;
        console.log("ground soldified by colliders");
        ground.material = texture1;
        console.log("grass sould now be the texutre of the ground");

        //create some lighting so we can see
        var pLight = new BABYLON.PointLight("light1", new BABYLON.Vector3(0,0,10), scene);
        console.log("light should be created");

        return scene;

    }; // this is where the scene contents ends

    //set the scene we just created to the main scene
    var scene = createScene();
    //initiate the render loop
    engine.runRenderLoop(function() {
        scene.render();
    });

    //adding a listener for canvas/window resize adjust
    window.addEventListener("resize", function() {
        engine.resize();
    });
})