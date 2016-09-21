/// <reference path="babylon.2.4.d.ts" />
var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);
        BABYLON.SceneLoader.Load("", "test.babylon", engine, function (newScene) {
            // Wait for textures and shaders to be ready
            newScene.executeWhenReady(function () {
                // Attach camera to canvas inputs
                newScene.activeCamera.attachControl(canvas)

                // Once the scene is loaded, just register a render loop to render it
                engine.runRenderLoop(function() {
                    newScene.render();
                });
            });
        });