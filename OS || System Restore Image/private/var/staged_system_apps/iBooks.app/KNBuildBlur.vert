// KNBuildBlur.vert

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

uniform vec4 TextureBounds;
uniform vec4 Texture2Bounds;

attribute vec2  Position;
attribute vec2  TexCoord;

varying vec2    v_TexCoord;
varying vec2    v_TexCoord2;

vec2 normalizedPointWithinRect(vec2 pt, vec4 rect)
{
    return (pt - rect.xy)/rect.zw;
}

void main()
{
    gl_Position = MVPMatrix * vec4(Position, 0,1);
    v_TexCoord = normalizedPointWithinRect(TexCoord, TextureBounds);
    v_TexCoord2 = normalizedPointWithinRect(TexCoord, Texture2Bounds);
}
