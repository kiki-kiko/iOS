#ifdef GL_ES
precision lowp float;
#endif

uniform sampler2D Texture;

uniform float IsShadow;

varying vec4 v_Color;
varying vec2 v_TexCoord;


void main()
{
    vec4 texColor = texture2D(Texture, v_TexCoord);
    
    vec4 color = (IsShadow > 0.5 ? vec4(texColor.a) : texColor) * v_Color;
    
    //color += vec4(0, 0, 0.1, 0.1);
    
    //color = vec4(1,1,1,0.25);
    
    gl_FragColor = color;
}
