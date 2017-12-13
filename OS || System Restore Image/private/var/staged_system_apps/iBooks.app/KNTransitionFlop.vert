// KNTransitionPageFlip vertex shader

#ifdef GL_ES
precision highp float;
#endif

uniform mat4 MVPMatrix;
uniform mat3 TextureMatrix;
uniform float FlipNormals;

attribute vec3 Position;
attribute vec3 Normal;
attribute vec2 TexCoord;

varying vec2 v_TexCoord;
varying vec3 v_DiffuseColor;

const vec3 c_AmbientColor = vec3(0.1);
const vec3 c_DiffuseColor = vec3(1);
const float c_LightExponent = 32.0;

const vec3 c_LightDirection = vec3(0.000, +0.000, 0.900);

void main()
{
    vec3 thisNormal = Normal * FlipNormals;

    // Lighting
	vec3 lightDirection = vec3(c_LightDirection.x,c_LightDirection.y,c_LightDirection.z);
    
    float ndotl = max(0.0, dot(thisNormal, lightDirection));
    
	v_DiffuseColor = (c_AmbientColor + ndotl * c_DiffuseColor);

	gl_Position = MVPMatrix * vec4(Position, 1);
    v_TexCoord = (TextureMatrix * vec3(TexCoord,1)).xy;
}