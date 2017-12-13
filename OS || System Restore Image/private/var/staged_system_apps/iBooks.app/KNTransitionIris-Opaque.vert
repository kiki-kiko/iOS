// KNTransitionIris-Opaque vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;
uniform vec2 Center;
uniform vec2 FadeMinMax;

attribute vec2 Position;
attribute vec2 TexCoord;
attribute float RadiusType;

varying vec2 v_TexCoord;

void main()
{
    vec2 texVector = TexCoord - vec2(0.5);
    vec2 positionVector = Position - Center;
    
    // Don't move this vertex if the radius type is 1 (center point if open from center, otherwise outer strip)
    float percent = (RadiusType == 0.0) ? FadeMinMax.x/length(positionVector) : 1.0;
    percent = max(0.0, percent);
    
    float scale = percent;
    v_TexCoord = vec2(0.5) + texVector*scale;
    vec2 newPosition = Center + positionVector*scale;
    
    gl_Position = MVPMatrix * vec4(newPosition, 0,1);
}
