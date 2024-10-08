// uniform vec3 uDepthColor;
// uniform vec3 uSurfaceColor;
// uniform float uColorOffset;
// uniform float uColorMultiplier;
uniform float uTime;

// varying float vElevation;
varying vec3 vPosition;
varying vec3 vNormal;

#include ../lights/ambient.glsl
// #include ../lights/directional.glsl
#include ../lights/point.glsl
#include ../lights/directional.glsl


void main()
{
    // float positionColor=smoothstep(-0.5,1.0,vPosition.y);
    vec3 normal= normalize(vNormal);
    vec3 color1= vec3(0.1,0.3,0.8);
    vec3 viewDirection= normalize(vPosition-cameraPosition);
    
    //light
    vec3 light= vec3(0.0);
    light+=ambientLight(
        normalize(vec3(8.0,12.0,146.0)),  //light color
        1.0        //light intensity
    );


    light+= pointLight(
        vec3(1.0,1.0,1.0),  //light color
        1.0,        //light intensity
        vNormal,    //model normals
        vec3(0,5.0,0),   //light positions
        viewDirection,
        50.0,
        vPosition,
        0.0
        );

    // light+= directionalLight(
    //     vec3(1.0,1.0,1.0),  //light color
    //     1.0,        //light intensity
    //     normal,    //model normals
    //     vec3(0.0,-2.0,6.0),   //light positions
    //     viewDirection,
    //     20.0
    //     );

    color1*=light;
    // positionColor=mod(positionColor,1.0);
    //final color

    gl_FragColor = vec4(color1, 1.0);
    // vec3 normal=

    // gl_FragColor = vec4(normal, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}