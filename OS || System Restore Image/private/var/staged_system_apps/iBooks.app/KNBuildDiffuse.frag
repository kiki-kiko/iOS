// KNBuildDiffuse fragment shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform float Opacity;

varying vec4 v_Color;
varying vec2 v_TexCoord;

void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);
    
    texColor *= v_Color;
    
    gl_FragColor = texColor;
}
