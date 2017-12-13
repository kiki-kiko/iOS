// KNBuildShimmerObject.frag

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
uniform float Percent;

varying vec4 v_Color;
varying vec2 v_TexCoord;

void main()
{
    vec4 color = texture2D(Texture, v_TexCoord);
    
    color *= v_Color;
    
    // DEBUG
    //color = mix(color, vec4(1,0,0,1), 0.2);
    
    gl_FragColor = color;
}
