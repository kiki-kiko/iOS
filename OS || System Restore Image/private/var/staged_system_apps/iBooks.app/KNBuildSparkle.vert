// KLNSparkle vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;
uniform float   Percent;

attribute vec2  Position;
attribute vec2  Center;
uniform float   Opacity;
attribute vec2  ParticleTexCoord;
uniform vec4    Color;

#ifdef GL_ES
attribute mediump vec3    Speed;
uniform mediump float    SpeedMax;
attribute mediump float   Scale;
attribute mediump vec2    LifeSpan;
#else
attribute vec3    Speed;
uniform float    SpeedMax;
attribute float   Scale;
attribute vec2    LifeSpan;
#endif

varying vec4    v_Color;
varying vec2    v_TexCoord;

float ReverseSquareOfFloat(float f) {
    return 1.0 - (1.0-f)*(1.0-f);
}

void main()
{
    float doDiscard = 0.0;
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    if (realPercent < 0.0 || realPercent > 1.0) {
        doDiscard = 1.0;
        realPercent = 1.0;
    }
    
    vec4 position;
    vec4 scaleDirectionVec = vec4((Position.x-Center.x),(Position.y-Center.y),0,0);
    
    // SCALE
    float scaleAdjust = realPercent;
    if (scaleAdjust < 0.1) {
        scaleAdjust /= 0.1;
        scaleAdjust = sqrt(scaleAdjust);
    } else {
        scaleAdjust = 1.0-(scaleAdjust-0.1)/0.9;
        scaleAdjust = scaleAdjust*scaleAdjust*scaleAdjust;
    }
    scaleAdjust *= (doDiscard==0.0 ? 1.0 : 0.0);
    position = vec4(Center,0,1) + scaleDirectionVec * scaleAdjust * Scale;
    
    // POSITION
    vec3 thisSpeed = Speed * SpeedMax;
    position += vec4(thisSpeed, 0) * realPercent;

    float invPercent = 1.0 - realPercent;
    vec3 rgbColor = mix(Color.rgb, vec3(1,1,1), invPercent*invPercent*invPercent);

    /* output */
    gl_Position = MVPMatrix * position;
    v_Color = vec4(rgbColor, (1.0-realPercent*realPercent)*Opacity);
    v_TexCoord = ParticleTexCoord;
    
}
