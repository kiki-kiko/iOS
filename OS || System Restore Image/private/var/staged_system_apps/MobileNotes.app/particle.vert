#version 100

attribute vec4 aPosition;
attribute vec2 aTexCoord;
attribute float aPressure;

uniform mat4 uTransform;

varying float vAlpha;
varying vec2 vPointCoord;

void main(void)
{
	gl_Position = uTransform * aPosition;
    
	vPointCoord = aTexCoord;
    vAlpha = aPressure;
}
