#version 100

attribute vec4 aPosition;
attribute vec2 aTexCoord;
attribute float aPressure;

uniform mat4 uTransform;

varying vec2 vTexCoord;
varying highp float vRadius;

void main()
{
	gl_Position = uTransform * aPosition;
    
	vTexCoord = aTexCoord;
    vRadius = aPressure;
}