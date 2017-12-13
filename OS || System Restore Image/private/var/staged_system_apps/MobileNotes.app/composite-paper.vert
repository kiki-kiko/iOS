#version 100

attribute vec4 Position;
attribute vec2 TexCoord;

uniform mat4 uTransform;

varying vec2 vTexCoord;

#ifdef PAPER
uniform mat3 uPaperTransform;
varying vec2 vPaperTexCoord;
#endif

#ifdef CLIPPING
uniform highp mat3 uTexToPixel;
varying highp vec2 vPixelCoord;
#endif

void main()
{
    gl_Position = uTransform * Position;
    vTexCoord = TexCoord;
    
#ifdef PAPER
    vPaperTexCoord = (uPaperTransform * vec3(TexCoord, 1.0)).xy;
#endif
    
#ifdef CLIPPING
    vPixelCoord = (uTexToPixel * vec3(vTexCoord, 1.0)).xy;
#endif
}
