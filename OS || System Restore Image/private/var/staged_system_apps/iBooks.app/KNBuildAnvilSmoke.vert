/* KNBuildAnvil vertex shader */

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
attribute mediump vec3  Rotation;
uniform mediump float RotationMax;
attribute mediump vec3  Speed;
uniform mediump float SpeedMax;
attribute mediump float Scale;
attribute mediump vec2  LifeSpan;
#else
attribute vec3  Rotation;
uniform float RotationMax;
attribute vec3  Speed;
uniform float SpeedMax;
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

mat3 fastRotationMatrix(vec3 theRotation)
{
    vec3 sinXYZ = fastSine(theRotation);
    vec3 cosXYZ = fastSine(Pi_2 - theRotation);
    mat3 rotMatrix = mat3( cosXYZ.y*cosXYZ.z,  sinXYZ.x*sinXYZ.y*cosXYZ.z+cosXYZ.x*sinXYZ.z, -cosXYZ.x*sinXYZ.y*cosXYZ.z+sinXYZ.x*sinXYZ.z,
                          -cosXYZ.y*sinXYZ.z, -sinXYZ.x*sinXYZ.y*sinXYZ.z+cosXYZ.x*cosXYZ.z,  cosXYZ.x*sinXYZ.y*sinXYZ.z+sinXYZ.x*cosXYZ.z,
                          sinXYZ.y, -sinXYZ.x*cosXYZ.y, cosXYZ.x*cosXYZ.y);
    return rotMatrix;
}

void main()
{
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    realPercent = clamp(realPercent, 0.0, 1.0);
    realPercent = sqrt(realPercent);    
    
    /* OPACITY */
    float thisOpacity = Opacity;
    thisOpacity *= (1.0 - realPercent); /* fade out gradually */
    thisOpacity *= min(1.0, realPercent*20.0);  /* fade in quickly */

    /* SCALE */
    vec4 originalPosition = vec4(Position,0,1);
    vec4 center = vec4(Center, 0,1);
    float thisScale = Scale * mix(0.1, 1.0, realPercent) * (thisOpacity==0.0 ? 0.0 : 1.0);
    vec3 scaleDirectionVec = vec3(originalPosition.xy-center.xy,0) * thisScale;
    
    /* ROTATE */
    vec3 thisRotation = Rotation * RotationMax;
    mat3 rotMatrix = fastRotationMatrix(thisRotation * realPercent);
    vec3 rotatedVec = rotMatrix * scaleDirectionVec;
    vec4 position = center + vec4(rotatedVec,0);
        
    float speedAdjust = realPercent;
    vec3 thisSpeed = Speed * SpeedMax;
    thisSpeed.x *= sqrt(realPercent);
    thisSpeed.y *= realPercent*realPercent;
    position += vec4(thisSpeed, 0);
    
    
    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = vec4(thisOpacity);
    v_TexCoord = ParticleTexCoord;
}
