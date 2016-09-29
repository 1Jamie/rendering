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

        //creating the free camera we are going to use for the viewport
        var camera = new BABYLON.FreeCamera("main", new BABYLON.Vector3(-4, 1, 4), scene);
        console.log("camera generated");
        camera.checkCollisions = true;
        console.log("camera collisions set");
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);
        console.log("camera attached to canavas");
        camera.applyGravity = true;
        camera.speed = 1;
        //camera.fov, 15;

        //why not make a skybox all nice and stuff
        var skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skybox",scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting=true;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(255,255,255);
        skyboxMaterial.specularColor = new BABYLON.Color3(255,255,255);
        //applying specific texturing
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE


        //texture test
        var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("grass2.jpg", scene);
        //materialPlane.
        materialPlane.diffuseTexture.uScale = 15.0;//Repeat on the Vertical Axes
        materialPlane.diffuseTexture.vScale = 15.0;//Repeat on the Horizontal Axes

        //we are going to create the ground we are going to stand on
        //and enable the colliders for the ground so we dont fall throught it
        var ground = BABYLON.Mesh.CreatePlane("plane", 120, scene);
        ground.position.y = -5;
        ground.rotation.x = Math.PI / 2;
        console.log("ground created");
        ground.checkCollisions = true;
        console.log("ground soldified by colliders");
        //ground.material = material1;
        //ground.diffuseTexture = texture1;
        ground.material = materialPlane;
        console.log("grass sould now be the texutre of the ground");

        //create some lighting so we can see
        var pLight = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 5, 0), scene);
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