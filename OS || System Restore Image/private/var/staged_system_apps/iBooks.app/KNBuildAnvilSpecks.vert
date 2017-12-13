/* KNBuildAnvilSpecks.vert */

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;
uniform float   Percent;
uniform float   Opacity;

attribute vec2  Position;
attribute vec2  Center;
attribute vec2  ParticleTexCoord;
#ifdef GL_ES
attribute mediump vec3  Speed;
uniform mediump float SpeedMax;
attribute mediump float Scale;
attribute mediump vec2  LifeSpan;
#else
attribute vec3  Speed;
uniform float   SpeedMax;
attribute float Scale;
attribute vec2  LifeSpan;
#endif

varying vec4    v_Color;
varying vec2    v_TexCoord;

const float Pi = 3.1415926;
const float Pi_2 = 1.5707963;
const float TwoPi = 6.2831852;

const float sineConstB = 1.2732396; /* = 4./Pi; */
const float sineConstC = -0.40528476; /* = -4./(Pi*Pi); */

vec3 fastSine(vec3 angle)
{
    vec3 theAngle = mod(angle + Pi, TwoPi) - Pi;
    return sineConstB * theAngle + sineConstC * theAngle * abs(theAngle);
}

void main()
{
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    realPercent = clamp(realPercent, 0.0, 1.0);
    
    vec3 thisSpeed = vec3(Speed.xy * SpeedMax, Speed.z);
    
    /* SCALE */
    vec4 originalPosition = vec4(Position,0,1);
    vec4 center = vec4(Center, 0,1);
    vec3 thisScale = Scale * vec3(1, thisSpeed.z, 1) * mix(0.1, 1.0, realPercent);
    vec3 scaleDirectionVec = vec3(originalPosition.xy-center.xy,0) * thisScale;
    
    vec4 position = center + vec4(scaleDirectionVec,0);
    
    float speedAdjust = realPercent;
    vec3 thisPos = vec3(thisSpeed.x * realPercent,
                        thisSpeed.y * fastSine(Pi*0.85*vec3(realPercent,0,0)).x, /* arc with gravity */
                        0);
    position += vec4(thisPos, 0);
        
    float thisOpacity = Opacity;
    thisOpacity *= (1.0 - realPercent); /* fade out gradually */
    thisOpacity *= min(1.0, realPercent*20.0);  /* fade in quickly */
        
    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = vec4(thisOpacity);
    v_TexCoord = ParticleTexCoord;
}
