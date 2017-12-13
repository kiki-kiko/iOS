/* KNBuildShimmerParticle.vert */

#ifdef GL_ES
precision highp float;
#endif

uniform mat4    MVPMatrix;
uniform float   Percent;
uniform float   Opacity;

uniform float   ParticleScalePercent;
uniform mat3    RotationMatrix;

attribute vec2  Position;
attribute vec2  Center;
attribute vec2  ParticleTexCoord;
attribute vec4  Color;
attribute vec2  LifeSpan;

attribute vec3  Speed;
uniform float   SpeedMax;
attribute float Scale;

varying vec4    v_Color;
varying vec2    v_TexCoord;

float scaleUpDown(float x) {
    float result = 1.0 - abs(2.0*(x-0.5));
    result *= result;
    return result;
}

void main()
{
    /* LIFESPAN */
    float realPercent = (Percent-LifeSpan.x)/LifeSpan.y;
    float doDiscard = (realPercent > 1.0 || realPercent < 0.0) ? 0.0 : 1.0;
    realPercent = clamp(realPercent, 0.0,1.0);
    float realPercent2 = realPercent*realPercent;
    float invPercent2 = 1.0-realPercent;
    invPercent2 *= invPercent2;
    
    vec3 scaleDirectionVec = vec3((Position.x-Center.x),(Position.y-Center.y),0);
    
    /* ROTATE */
    vec3 rotatedVec = RotationMatrix * scaleDirectionVec.xyz;
    
    /* SCALE */
    float scalePercent = (LifeSpan.x <= 0.001 ? ParticleScalePercent : scaleUpDown(realPercent));
    float scale = scalePercent * Scale * doDiscard;
    vec4 position = vec4(Center,0,1) + vec4(rotatedVec,0) * scale;
    
    vec3 thisSpeed = Speed * SpeedMax;
    position.xyz += thisSpeed * realPercent*(3.0 + mix(realPercent*realPercent2, 1.0-invPercent2, realPercent2));
    
    // Only adjust opacity on particles that last the duration of the animation
    float thisOpacity = (LifeSpan.x <= 0.001 ? Opacity : 1.0);
    vec4 color = vec4(Color.rgb, 1) * thisOpacity;
    
	v_Color = color;
    v_TexCoord = ParticleTexCoord;
	gl_Position = MVPMatrix * position;
}
