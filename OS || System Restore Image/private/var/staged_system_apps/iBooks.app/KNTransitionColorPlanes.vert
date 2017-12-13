// KNTransitionColorPlanes vertex shader
#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;
uniform vec2 FlipTexCoords;

attribute vec2 Position;
attribute vec2 TexCoord;

varying vec2 v_TexCoord;

void main()
{
    v_TexCoord = vec2(FlipTexCoords.x == 0.0 ? TexCoord.x : 1.0-TexCoord.x,
                              FlipTexCoords.y == 0.0 ? TexCoord.y : 1.0-TexCoord.y);
    
    gl_Position = MVPMatrix * vec4(Position, 0,1);
}

