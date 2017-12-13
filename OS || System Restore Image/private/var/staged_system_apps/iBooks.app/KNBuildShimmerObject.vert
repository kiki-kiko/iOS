/* KNBuildShimmerObject.vert */

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;
uniform float   Percent;
uniform float   Opacity;

uniform mat3  RotationMatrix;

attribute vec2  Position;
attribute vec2  Center;
attribute vec2  TexCoord;
attribute vec4  Color;

attribute vec3    Speed;
uniform float    SpeedMax;

varying vec4    v_Color;
varying vec2    v_TexCoord;

void main()
{
    float thisPercent = Percent;
    float invPercent = 1.0-thisPercent;
    float thisPercent2 = thisPercent*thisPercent;

    /* CENTER */
    vec3 scaleDirectionVec = vec3((Position.x-Center.x),(Position.y-Center.y),0);
    
    /* ROTATE */
    vec3 rotatedVec = RotationMatrix * scaleDirectionVec.xyz;
    
    /* SCALE */
    float scale = invPercent;
    vec4 position = vec4(Center.xy,0,1) + vec4(rotatedVec,0) * scale;
    
    vec3 thisSpeed = Speed * SpeedMax;
    position.xyz += thisSpeed * thisPercent*(3.0 + mix(thisPercent2*thisPercent, 1.0-invPercent*invPercent, thisPercent2));
    
    vec4 outColor = Color;
    outColor = vec4(Opacity);
    
    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = outColor;
    v_TexCoord = TexCoord;
}

