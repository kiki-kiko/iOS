// KNTransitionPageFlip fragment shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform float Opacity;

varying vec2 v_TexCoord;
varying vec3 v_DiffuseColor;
varying vec3 v_SpecularColor;


void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);
    
    // Lighting
    
    texColor.xyz = texColor.xyz * v_DiffuseColor + v_SpecularColor;
	texColor.w = Opacity;
        
    gl_FragColor = texColor;
}
