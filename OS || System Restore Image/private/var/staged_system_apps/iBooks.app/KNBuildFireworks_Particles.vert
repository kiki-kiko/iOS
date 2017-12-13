// KNBuildFireworks vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;

uniform float   Percent;
uniform float   PreviousPercent;
//uniform float   Duration;
uniform float   Gravity;
//uniform float   Opacity;
uniform float   StartScale;
uniform float   ShouldSparkle;
uniform float   SparklePeriod;
//uniform float   SparkleStartTime;
uniform float   ParticleBurstTiming;
uniform float   PreviousParticleBurstTiming;
uniform float   SpeedMax;

attribute vec2  Position;
attribute vec2  Center;
attribute vec2  ParticleTexCoord;

attribute vec4  Color;
attribute vec3  Speed;
attribute vec2  LifeSpan;
attribute float Scale;  


varying vec4 v_Color;
varying vec2 v_TexCoord;


void main()
{
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    realPercent = clamp(realPercent, 0.0, 1.0);
    
    float prevRealPercent = (PreviousPercent-LifeSpan.x)/LifeSpan.y;
    prevRealPercent = clamp(prevRealPercent, 0.0,1.0);

    vec4 center = vec4(Center,0,1);
    vec4 scaleDirectionVec = vec4(Position-Center,0,0);

    // TRANSLATE
    vec3 translation = Speed * (SpeedMax * ParticleBurstTiming); // (1.0-pow(1.0-realPercent, ExplosionPower));
    translation.y -= Gravity * (Percent - LifeSpan.x); // Gravity is in terms of global percent, not particle system percent
    
    
    vec3 prevTranslation = Speed * (SpeedMax * PreviousParticleBurstTiming);
    prevTranslation.y -= Gravity * (PreviousPercent - LifeSpan.x); // Gravity is in terms of global percent, not particle system percent
    
    vec3 blurOffset = translation - prevTranslation; // Blur in direction of velocity

    
    // project centerVec onto translationOffset to get direction
    blurOffset *= (dot(blurOffset, scaleDirectionVec.xyz) >= 0.0 ? 1.0 : -1.0);
    
    center.xyz += translation;

    // SCALE
    float scalePercent = (1.0-(1.0-realPercent)*(1.0-realPercent));
    float scaleAdjust = mix(StartScale, Scale, scalePercent);
    // scale down to zero, unless we're sparkling
    scaleAdjust *= (ShouldSparkle>0.5 ? 0.25 : 1.0-scalePercent);
    vec4 position = center + scaleDirectionVec * scaleAdjust;
    position += vec4(blurOffset,0);
    
    // SPARKLE
    float sparkleOpacity = fract(realPercent*realPercent * SparklePeriod);
    sparkleOpacity = smoothstep(0.0, 1.0, sparkleOpacity);
    
    // COLOR
    vec4 color = mix(vec4(1), Color, scalePercent * (ShouldSparkle<0.5 ? 1.0 : 0.5)); // white to color
    color *= (ShouldSparkle<0.5 ? 1.0 : sparkleOpacity); // apply "sparkle" opacity
    color *= (realPercent>=1.0 ? 0.0 : 1.0);
    v_Color = color;
    
    gl_Position = MVPMatrix * position;
    v_TexCoord = ParticleTexCoord;
}
