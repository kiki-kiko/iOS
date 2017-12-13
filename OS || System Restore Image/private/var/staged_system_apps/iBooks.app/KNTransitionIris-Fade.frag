// KNTransitionIris fragment shader

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D Texture;
#ifdef GL_ES
uniform highp vec2 FadeMinMax;
uniform highp vec2 Center;
#else
uniform vec2 FadeMinMax;
uniform vec2 Center;
#endif
uniform bool FromCenter;

varying vec2 v_TexCoord;
varying vec2 v_Position;

void main()
{
    vec4 color = texture2D(Texture, v_TexCoord);
    //color.g = 1.0;
    
    float dist = distance(v_Position, Center);
    float alpha = smoothstep(FadeMinMax.x, FadeMinMax.y, dist);
    alpha = (FromCenter ? 1.0-alpha : alpha);
        
	gl_FragColor = color * alpha;
}
