// KNTransitionConfetti.vert

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

uniform float   Percent;
#ifdef GL_ES
uniform mediump float   Opacity;
#else
uniform float   Opacity;
#endif

attribute vec2  Position;
attribute vec2  Center;
attribute vec2  TexCoord;
#ifdef GL_ES
attribute mediump vec3  Rotation;
uniform mediump float RotationMax;
attribute mediump vec3  Speed;
uniform mediump float SpeedMax;
#else
attribute vec3  Rotation;
uniform float RotationMax;
attribute vec3  Speed;
uniform float SpeedMax;
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
    /* SCALE */
    vec4 originalPosition = vec4(Position, 0, 1);
    vec3 scaleDirectionVec = vec3(Position-Center,0);
    
    /* ROTATE */
    vec3 thisRotation = Rotation * RotationMax;
    mat3 rotMatrix = fastRotationMatrix(thisRotation * Percent);
    vec3 rotatedVec = scaleDirectionVec * rotMatrix;
    vec4 position = vec4(Center,0,1) + vec4(rotatedVec,0);
    
    float colorAdjust = abs((rotMatrix * vec3(0,0,1)).z);
    
    vec3 thisSpeed = Speed * SpeedMax;
    float speedAdjust = Percent;
    position += vec4(thisSpeed, 0) * speedAdjust;
    
    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = vec4(vec3(colorAdjust), 1) * Opacity;
    v_TexCoord = TexCoord;
}    
