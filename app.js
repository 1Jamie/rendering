/// <reference path="babylon.2.5.d.ts" />
document.addEventListener("DOMContentLoaded", function() {
    //this sets up the basic things we need for rendering
    var camera = null;
    var canvas = document.getElementById("canvas");
    var engine = new BABYLON.Engine(canvas, true);

    //this is going to be where most of everything happens
    var createScene = function() {
        //this is going to create a basic babylon scene object
        var scene = new BABYLON.Scene(engine);
        scene.collisionsEnabled = true;
        console.log("scene created");

        /*creating the camera used for the scene, on desktop it is a free camera
        on mobile it is a joystick camera*/
        if (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
        ) {
            console.log("user is on mobile")
            camera = new BABYLON.VirtualJoysticksCamera("VJ_camera", new BABYLON.Vector3(0, 1, -15), scene);
            console.log("camera generated");
            camera.checkCollisions = true;
            console.log("camera collisions set");
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            console.log("camera attached to canavas");
            camera.applyGravity = true;
            camera.cameraAcceleration = 0.02;
            camera.maxCameraSpeed = 4;
        } else {
            camera = new BABYLON.FreeCamera("main", new BABYLON.Vector3(-4, 0, 4), scene);
            console.log("camera generated");
            camera.checkCollisions = true;
            console.log("camera collisions set");
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            console.log("camera attached to canavas");
            camera.applyGravity = true;
            camera.cameraAcceleration = 0.05;
            camera.maxCameraSpeed = 2;
            camera.gravity = .5;
        };

        //why not make a skybox all nice and stuff
        var skybox = BABYLON.Mesh.CreateBox("skybox", 100.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("textures/ame_nebula/skybox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(255, 255, 255);
        skyboxMaterial.specularColor = new BABYLON.Color3(255, 255, 255);
        //applying specific texturing
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/ame_nebula/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE


        //texture for ground
        var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("textures/moon/moon.png", scene);
        //materialPlane.
        materialPlane.diffuseTexture.uScale = 1.0; //Repeat on the Vertical Axes
        materialPlane.diffuseTexture.vScale = 1.0; //Repeat on the Horizontal Axes
        materialPlane.bumpTexture = new BABYLON.Texture("textures/moon/moonbmp.png", scene);
        materialPlane.bumpTexture.uScale = 1.0;
        materialPlane.bumpTexture.vScale = 1.0;
        materialPlane.specularColor = new BABYLON.Color3(0, 0, 0);
        //var bumpGrass = new BABYLON.Texture

        //we are going to create the ground we are going to stand on
        //and enable the colliders for the ground so we dont fall throught it
        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "textures/moon/moonElv.jpg", 300 , 300, 150, -10, 50, scene, false);
        ground.position.y = -25;
        ground.position.x = 0;
        ground.position.z = 0;
        console.log("ground created");
        ground.checkCollisions = true;
        console.log("ground soldified by colliders");
        //ground.material = material1;
        //ground.diffuseTexture = texture1;
        ground.material = materialPlane;
        console.log("grass sould now be the texutre of the ground");

        //create some lighting so we can see
        var pLight = new BABYLON.PointLight("light1", new BABYLON.Vector3(600, 30, -230), scene);
        console.log("light should be created");
        //create a ambient light above to have some better visibility
        var aLight = new BABYLON.PointLight("aLight", new BABYLON.Vector3(0,30,0), scene, true);
        aLight.intensity = 0.4;

        return scene;

    }; // this is where the scene contents ends

    //set the scene we just created to the main scene
    var scene = createScene();
    //initiate the render loop
    engine.runRenderLoop(function() {
        scene.render();
                if (camera.position.y <= -20){
            camera.position.y = 3;
            camera.position.x = 0;
            camera.position.z = 0;
        }else {};
        console.log(camera.position.y)
    });

    //adding a listener for canvas/window resize adjust
    window.addEventListener("resize", function() {
        engine.resize();
    });
})