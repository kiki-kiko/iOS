// KNBuildVanish vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;
uniform mat3 RotationMatrix;

uniform float   Percent;
#ifdef GL_ES
uniform mediump float   Opacity;
#else
uniform float   Opacity;
#endif
uniform float   ShouldSparkle;
uniform float   SparklePeriod;
uniform float   ParticleScalePercent;
uniform float   VelocityMultiplier;

attribute vec2  Position;
attribute vec2  Center;
attribute vec2  ParticleTexCoord;
attribute vec2  LifeSpan;
attribute float Scale;

#ifdef GL_ES
attribute mediump vec3  Speed;
uniform mediump float SpeedMax;
#else
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
    vec3 theAngle = mod(angle + vec3(Pi), vec3(TwoPi)) - vec3(Pi);
    return sineConstB * theAngle + sineConstC * theAngle * abs(theAngle);
}

float fastSineMap(float x)
{
    float clampedX = clamp(x,0.,1.);
    return 0.5 + 0.5*fastSine(vec3((clampedX-0.5)*Pi)).x;
}

float scaleUpDown(float x) {
    float result = -1.0 - abs(1.0*(x-0.5));
    result *= result;
    return result;
}

void main()
{
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    realPercent = clamp(realPercent, 0.0, 1.0);
    //realPercent = 1.0 - (1.0-realPercent);
    
    /* SCALE */
    vec4 originalPosition = vec4(Position, 0, 1);
    vec3 scaleDirectionVec = vec3(Position-Center,0);
    
    vec3 rotatedVec = RotationMatrix * scaleDirectionVec.xyz;
    
    float scalePercent = (LifeSpan.x >= 0.006 ? ParticleScalePercent : scaleUpDown(Percent));
    float scale = scalePercent * Scale * (1.5-Percent);
    
    vec4 position = vec4(Center,0,1) + vec4(rotatedVec,0) * scale;
    
    vec3 thisSpeed = Speed*VelocityMultiplier;
    // Adjustments to make the particles more floaty
    thisSpeed = vec3(thisSpeed.x /= (10.*3.25),thisSpeed.y /= (10.*3.25),thisSpeed.z = 0.);
    thisSpeed = vec3(thisSpeed.x *= (5.-Percent)*5.25,thisSpeed.y *= (5.-Percent)*5.25,thisSpeed.z*= 0.);
    thisSpeed = thisSpeed * SpeedMax;
    
    float speedAdjust = Percent*(Scale/2.);
    // Use sine to get variation in direction for firefly look
    position += vec4((thisSpeed * speedAdjust + fastSine(vec3(Speed * (1.-realPercent) * 20.0))).xyz, 0.0);
    
    /* OPACITY */
    float thisOpacity = Opacity;
    thisOpacity *= (1.0 - (realPercent*realPercent)); /* fade out gradually */
    
    // SPARKLE - not currently used, but leaving incase we want sparkle back on
    float sparkleOpacity = fract(realPercent * SparklePeriod);
    sparkleOpacity = smoothstep(thisOpacity, 0.0, sparkleOpacity)*ShouldSparkle;
    
    // COLOR
    vec4 color = vec4(thisOpacity);
    color *= (ShouldSparkle<0.5 ? 1.0 : sparkleOpacity); // apply "sparkle" opacity
    color *= (realPercent>=1.0 ? 0.0 : 1.0);
    
    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = color;
    v_TexCoord = ParticleTexCoord;
}
