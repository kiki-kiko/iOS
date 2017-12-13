// KNBuildBlur.frag

#ifdef GL_ES
precision lowp float;
#endif

uniform sampler2D Texture;
uniform sampler2D Texture2;

uniform float Percent;
uniform float Opacity;

varying vec2 v_TexCoord;
varying vec2 v_TexCoord2;


void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);
    texColor *= (v_TexCoord.x < 0.0 || v_TexCoord.y < 0.0 || v_TexCoord.x > 1.0 || v_TexCoord.y > 1.0) ? 0.0 : 1.0;
    vec4 texColor2 = texture2D(Texture2, v_TexCoord2);
    texColor2 *= (v_TexCoord2.x < 0.0 || v_TexCoord2.y < 0.0 || v_TexCoord2.x > 1.0 || v_TexCoord2.y > 1.0) ? 0.0 : 1.0;
    
    vec4 color = mix(texColor, texColor2, Percent);
    color *= Opacity;
    
    //color += vec4(0, 0, 0.1, 0.1);
    
    //color = vec4(1,1,1,0.25);
    
    //color += 0.1*vec4(v_TexCoord2, 0,0);
    
    gl_FragColor = color;
}
