// KNTransitionTwist vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;
uniform mat3 TextureMatrix;
uniform float SpecularColor;
#ifdef GL_ES
uniform mediump float FlipNormals;
#else
uniform float FlipNormals;
#endif

attribute vec3 Position;
attribute vec3 Normal;
attribute vec2 TexCoord;

varying vec2 v_TexCoord;
varying vec3 v_DiffuseColor;
varying vec3 v_SpecularColor;

const vec3 c_AmbientColor = vec3(0.2);
const vec3 c_DiffuseColor = vec3(1);
const float c_LightExponent = 32.0;

const vec3 c_LightDirection = vec3(0.1580, +0.5925, 0.7900);
const vec3 c_LightHalfPlane = vec3(0.0835, +0.3131, 0.9460);

void main()
{	            
    vec3 thisNormal = Normal * FlipNormals;

    // Lighting
    
    float ndotl = max(0.0, dot(thisNormal, c_LightDirection));
    float ndoth = max(0.0, dot(thisNormal, c_LightHalfPlane));
    
    v_DiffuseColor = (c_AmbientColor + ndotl * c_DiffuseColor);
    v_SpecularColor = (ndoth <= 0.0) ? vec3(0) : (pow(ndoth, c_LightExponent) * vec3(SpecularColor));

    gl_Position = MVPMatrix * vec4(Position, 1);
    v_TexCoord = (TextureMatrix * vec3(TexCoord,1)).xy;
}

