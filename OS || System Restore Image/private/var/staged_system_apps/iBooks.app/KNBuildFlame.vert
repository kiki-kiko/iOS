// KNTransitionFlame.vert

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;
uniform float Percent;
uniform float Duration;

attribute vec3 Rotation;
attribute vec3 Speed;
uniform float   Opacity;
attribute vec2 LifeSpan;
attribute vec2 ParticleTexCoord;
attribute vec2  Position;
attribute vec2  Center;

#ifdef GL_ES
uniform mediump float RotationMax;
uniform mediump float SpeedMax;
#else
uniform float RotationMax;
uniform float SpeedMax;
#endif

varying vec4 v_Color;
varying vec2 v_TexCoord;

const float Pi = 3.1415926;
const float Pi_2 = 1.5707963;
const float TwoPi = 6.2831852;

const float sineConstB = 1.2732396; /* = 4./Pi; */
const float sineConstC = -0.40528476; /* = -4./(Pi*Pi); */

float fastSine(float angle)
{
    float theAngle = mod(angle + Pi, TwoPi) - Pi;
    return sineConstB * theAngle + sineConstC * theAngle * abs(theAngle);
}

const vec4 kStartColor = vec4( 1.0,  1.0, 1.0,  0.0 ); /* white */
const vec4 kMidColor   = vec4( 0.97, 1.0, 0.32, 0.0 ); /* yellow */
const vec4 kEndColor   = vec4( 0.9,  0.0, 0.0,  0.0 ); /* red */
const float kColorMidPoint   = 0.1;

vec4 flameColor(float aPercent)
{
    float thePercent = aPercent;
    /* CONSTANTS */
    float beginCutoff = 0.4/Duration;    /* start slow (not bright white) */
    float smokeCutoff = 1.0 - (0.95/Duration);      /* end with black, basically */
    float alphaCutoff = 1.0 - 0.5/Duration;    /* fade out towards the end */
    
    float alpha = (thePercent < alphaCutoff) ? 1.0 : (1.0-(thePercent-alphaCutoff)/(1.0-alphaCutoff));
    vec4 theColor = vec4(0,0,0, alpha * 0.75);    
    
    if (Percent < beginCutoff) {
        float colorCutoff = beginCutoff*3.0;
        thePercent += mix(colorCutoff, 0.0, Percent/beginCutoff);
    }
    
    if (thePercent < kColorMidPoint) {
        float newPercent = thePercent/kColorMidPoint;
        theColor += mix(kStartColor, kMidColor, newPercent);
    } else {
        float newPercent = (thePercent-kColorMidPoint)/(1.0-kColorMidPoint);
        theColor += mix(kMidColor, kEndColor, newPercent);
    }
    
    if (Percent > smokeCutoff) {
        /* smoke */
        float smokeAmount = (Percent - smokeCutoff)/(1.0 - smokeCutoff);
        smokeAmount = sqrt(smokeAmount);
        smokeAmount *= (0.25+thePercent*thePercent);
        theColor = vec4(theColor.rgb * max(0.0, 1.0-smokeAmount), theColor.a);
    }
        
    return theColor;
}

void main()
{
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    bool shouldDiscard = realPercent < 0.0 || realPercent > 1.0;
    realPercent = clamp(realPercent, 0.0, 1.0);
    
    vec4 scaleDirectionVec = vec4(Position-Center,0,0);
    
    /* ROTATE */
    float halfPercent = realPercent/2.0;
    vec3 thisRotation = Rotation * RotationMax;
    float theRotation = thisRotation.x + thisRotation.z * (halfPercent * (halfPercent + 1.0));
    float sinRot = fastSine(theRotation);
    float cosRot = fastSine(Pi_2 - theRotation);
    mat3 rotMatrix = mat3(cosRot,-sinRot,0,  sinRot,cosRot,0,  0,0,1);
    vec3 rotatedVec = rotMatrix * scaleDirectionVec.xyz;
    
    /* SCALE */
    float scaleAdjust = (0.1 + 1.0-(1.0-realPercent)*(1.0-realPercent));
    vec4 position =  vec4(Center,0,1) + vec4(rotatedVec * scaleAdjust * (shouldDiscard ? 0.001 : 1.0), 0);
    
    /* POSITION */
    vec3 thisSpeed = Speed * SpeedMax;
    vec4 upVector = vec4(0.0, realPercent*realPercent * -thisSpeed.y, 0.0, 0.0);
    position += upVector;
    
    v_Color = flameColor(realPercent)*Opacity;
    gl_Position = MVPMatrix * position;
    v_TexCoord = ParticleTexCoord;
}