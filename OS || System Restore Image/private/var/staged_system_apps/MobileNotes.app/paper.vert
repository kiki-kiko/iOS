#version 100

attribute vec4 Position;
attribute vec2 TexCoord;

uniform mat4 uTransform;

uniform mat3 uPaperTransform;
varying vec2 vPaperTexCoord;


void main()
{
    gl_Position = Position;
    
    vec4 transformedTex = uTransform * vec4(TexCoord, 0.0, 1.0);
    vPaperTexCoord = (uPaperTransform * vec3(transformedTex.xy, 1.0)).xy;
}
