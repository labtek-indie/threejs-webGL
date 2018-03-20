var container;

var camera, scene, render;

var geometry, root;

var mouseX=0, mouseY=0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// event listener
document.addEventListener('mousemove', onDocumentMouseMove, false);

init();
animate();

function init(){
    
    container = document.createElement('div');
    document.body.appendChild( container );

    // PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
    // fov    = field of view 
    // aspect = aspect ratio
    // near   = near plane
    // far    = far plane 
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );

    // var geometry = new THREE.BoxGeometry( 100,100,100 );
    var geometry = new THREE.CylinderGeometry(50, 50, 20, 32);
    var material = new THREE.MeshNormalMaterial(); // A material that maps the normal vectors to RGB colors.

    root = new THREE.Mesh( geometry, material );
    root.position.x = 1000;
    scene.add( root );

    var amount = 200; 
    var object, parent = root;

    for ( var i = 0; i < amount; i++ ){
        object = new THREE.Mesh( geometry, material );
        object.position.x = 100;

        parent.add( object );
        parent = object;
    }

    parent = root;

    for( var i = 0; i < amount; i++ ){
        object = new THREE.Mesh( geometry, material );
        object.position.x = -100;

        parent.add( object );
        parent = object;
    }

    parent = root;

    for( var i = 0; i < amount; i++ ){
        object = new THREE.Mesh( geometry, material );
        object.position.y = -100;

        parent.add( object );
        parent = object;
    }

    parent = root;

    for( var i = 0; i < amount; i++ ){
        object = new THREE.Mesh( geometry, material );
        object.position.y = 100;

        parent.add( object );
        parent = object;
    }


    parent = root;

    for( var i = 0; i < amount; i++ ){
        object = new THREE.Mesh( geometry, material );
        object.position.z = -100;

        parent.add( object );
        parent = object;
    }

    parent = root;

    for( var i = 0; i < amount; i++ ){
        object = new THREE.Mesh( geometry, material );
        object.position.z = 100;

        parent.add( object );
        parent = object;
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // window.addEventListener( 'resize', onWindowResize, false );

}

// function onWindowResize(){
    
// }

function onDocumentMouseMove(event){

    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;

}

function animate(){

    requestAnimationFrame( animate );
    render();

}

function render(){

    var time = Date.now() * 0.001;

    // editable
    var rx = Math.sin( time * 0.7 ) * 0.2;
    var ry = Math.sin( time * 0.3 ) * 0.1;
    var rz = Math.sin( time * 0.2 ) * 0.1;

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( -mouseY - camera.position.y ) * .05;

    camera.lookAt( scene.position );

    root.traverse( function (object){
        object.rotation.x = rx;
        object.rotation.y = ry;
        object.rotation.z = rz;
    });

    renderer.render( scene, camera );
}