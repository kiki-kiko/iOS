// KNBuildVanish_Object.frag

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
    
    // Mix in white to 'blow out' the flash and remove the color of the object
    vec4 white = vec4(1);
	white = vec4(dot(white, color));
	color = vec4(mix(color, white, Percent))*Opacity;
    color += color * vec4(2.0 * Percent);
    
    gl_FragColor = color;
}

