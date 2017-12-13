// KNBuildCrumble_Crumble.vert

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
attribute mediump vec2 LifeSpan;
uniform mediump float Gravity;
uniform lowp float IsShadow;
uniform lowp float ShadowOpacityRampUp;
uniform lowp float ShadowOpacity;
#else
attribute vec3  Rotation;
uniform float RotationMax;
attribute vec3  Speed;
uniform float SpeedMax;
attribute vec2 LifeSpan;
uniform float Gravity;
uniform float IsShadow;
uniform float ShadowOpacityRampUp;
uniform float ShadowOpacity;
#endif

uniform float CrackStartTime; // 0.1
uniform float CrackAmount; // 0.0075

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
    float realPercent = min(1.0, (Percent-LifeSpan.x)/LifeSpan.y);
    realPercent = realPercent < CrackStartTime ? 0.0 : max(CrackAmount, realPercent);
    realPercent = (Percent==0.0) ? 0.0 : realPercent;
    float invRealPercent = 1.0-realPercent;
    
    /* SCALE */
    vec4 originalPosition = vec4(Position, 0, 1);
    vec3 scaleDirectionVec = vec3(Position-Center,0);
    
    /* ROTATE */
    vec3 thisRotation = Rotation * RotationMax;
    mat3 rotMatrix = fastRotationMatrix(thisRotation * realPercent);
    vec3 rotatedVec = scaleDirectionVec * rotMatrix;
    rotatedVec *= (realPercent < 1.0 ? 1.0 : 0.0); /* stop drawing if percent > 1.0 */
    vec4 position = vec4(Center,0,1) + vec4(rotatedVec,0);
    
    
    /* POSITION */
    vec3 thisSpeed = Speed * SpeedMax;
    float speedAdjust = realPercent; //1.0 - invRealPercent*invRealPercent;
    float gravityAmount = Gravity * realPercent*realPercent;
    position += vec4(thisSpeed, 0) * speedAdjust + vec4(0,-gravityAmount,0,0);
    
    float shadowOffsetY = (rotatedVec.y < 0.0 ? rotatedVec.y * (1.0 + 5.0*realPercent) : 0.0) + 0.25 * realPercent * position.z;
    position += vec4(0, ((IsShadow > 0.5) ? shadowOffsetY : 0.0), 0,0);
    
    float shadowOffset = position.z;
    
    /* COLOR */
    float shadowColorAdjust = rotatedVec.y / length(rotatedVec.xy);
    shadowColorAdjust = (shadowColorAdjust + 0.75)*ShadowOpacity * (1.0 - realPercent);
    shadowColorAdjust *= (realPercent <= ShadowOpacityRampUp) ? realPercent/ShadowOpacityRampUp : 1.0;
    
    float colorAdjust = mix(0.5, 1.0, abs((rotMatrix * vec3(0,0,1)).z));
    vec4 color = IsShadow > 0.5 ? vec4(vec3(0), shadowColorAdjust) : vec4(vec3(colorAdjust), 1);
    
    /* Shadow Scale */
    
    
    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = color * Opacity;
    v_TexCoord = TexCoord;
}
