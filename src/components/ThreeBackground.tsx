'use client';

import { useEffect } from 'react';

// Animated 3D aura orb + starfield. Ported from the original vanilla build to a
// React client component. `three` is dynamically imported so it code-splits and
// never runs during SSR. Falls back to a CSS gradient when WebGL is unavailable
// or the user prefers reduced motion (body.no3d toggles the fallback via CSS).

const VERT = [
  'uniform float uTime;uniform float uBreath;',
  'varying vec3 vN;varying vec3 vP;',
  'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
  'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
  'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
  'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
  'float snoise(vec3 v){',
  'const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);',
  'vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);',
  'vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);',
  'vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;',
  'i=mod289(i);',
  'vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));',
  'float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;',
  'vec4 j=p-49.0*floor(p*ns.z*ns.z);',
  'vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);',
  'vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);',
  'vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);',
  'vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));',
  'vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
  'vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);',
  'vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
  'p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;',
  'vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;',
  'return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}',
  'void main(){',
  'float n=snoise(normal*1.6+uTime*0.25)*0.22;',
  'vec3 np=position+normal*n;np*=uBreath;',
  'vN=normalize(normalMatrix*normal);',
  'vec4 mv=modelViewMatrix*vec4(np,1.0);vP=mv.xyz;',
  'gl_Position=projectionMatrix*mv;}',
].join('\n');

const FRAG = [
  'uniform vec3 cA;uniform vec3 cB;uniform float uOpacity;uniform float uTime;',
  'varying vec3 vN;varying vec3 vP;',
  'void main(){',
  'vec3 V=normalize(-vP);',
  'float fres=pow(1.0-max(dot(normalize(vN),V),0.0),2.2);',
  'float sweep=0.5+0.5*sin(uTime*0.4+vP.y*1.5);',
  'vec3 col=mix(cA,cB,sweep);',
  'vec3 core=mix(col*0.20,col,fres);',
  'float a=(0.16+fres*0.9)*uOpacity;',
  'gl_FragColor=vec4(core+fres*0.45,a);}',
].join('\n');

export default function ThreeBackground() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.getElementById('bg3d') as HTMLCanvasElement | null;
    if (reduced || !canvas) {
      document.body.classList.add('no3d');
      return;
    }

    let raf = 0;
    let disposed = false;
    const cleanups: (() => void)[] = [];

    (async () => {
      const THREE = await import('three');
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        });
      } catch {
        document.body.classList.add('no3d');
        return;
      }

      const isMobile =
        Math.min(window.innerWidth, window.innerHeight) < 700 ||
        ('ontouchstart' in window && window.innerWidth < 900);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 7;

      // stars
      const starN = isMobile ? 320 : 850;
      const pos = new Float32Array(starN * 3);
      for (let i = 0; i < starN; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = -4 - Math.random() * 14;
      }
      const starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0x9db7d8,
        size: 0.035,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // breathing aura orb
      const uni = {
        uTime: { value: 0 },
        uBreath: { value: 1 },
        uOpacity: { value: 1 },
        cA: { value: new THREE.Color(0x6ee7d8) },
        cB: { value: new THREE.Color(0xa78bfa) },
      };
      const orbMat = new THREE.ShaderMaterial({
        uniforms: uni,
        transparent: true,
        vertexShader: VERT,
        fragmentShader: FRAG,
      });
      const orbGeo = new THREE.IcosahedronGeometry(1.55, isMobile ? 4 : 5);
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const haloGeo = new THREE.IcosahedronGeometry(1.9, 3);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x6ee7d8,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      const group = new THREE.Group();
      group.add(orb);
      group.add(halo);
      scene.add(group);

      let mx = 0;
      let my = 0;
      let tx = 0;
      let ty = 0;
      const onPointerMove = (e: PointerEvent) => {
        tx = e.clientX / window.innerWidth - 0.5;
        ty = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener('pointermove', onPointerMove));

      const layout = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (w > 880) {
          group.position.set(2.15, 0, 0);
          group.scale.setScalar(1);
        } else {
          group.position.set(0, 1.15, 0);
          group.scale.setScalar(0.72);
        }
      };
      layout();
      window.addEventListener('resize', layout);
      cleanups.push(() => window.removeEventListener('resize', layout));
      const onOrient = () => setTimeout(layout, 300);
      window.addEventListener('orientationchange', onOrient);
      cleanups.push(() => window.removeEventListener('orientationchange', onOrient));

      const hero = document.querySelector('.hero') as HTMLElement | null;
      const clock = new THREE.Clock();
      let hidden = false;
      const onVis = () => {
        hidden = document.hidden;
      };
      document.addEventListener('visibilitychange', onVis);
      cleanups.push(() => document.removeEventListener('visibilitychange', onVis));

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (hidden) return;
        const t = clock.getElapsedTime();
        uni.uTime.value = t;
        uni.uBreath.value = 1 + Math.sin(t * 0.55) * 0.06;
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;
        group.rotation.y = t * 0.12 + mx * 0.5;
        group.rotation.x = my * 0.3;
        stars.rotation.y = t * 0.008;
        stars.position.x = -mx * 0.6;
        stars.position.y = my * 0.4;
        const heroH = hero ? hero.offsetHeight : window.innerHeight;
        const fade = 1 - Math.min(1, window.scrollY / Math.max(1, heroH * 0.85));
        const mob = window.innerWidth <= 880;
        uni.uOpacity.value = (mob ? 0.5 : 1) * fade;
        haloMat.opacity = 0.05 * fade;
        halo.rotation.y = -t * 0.05;
        renderer.render(scene, camera);
      };
      tick();

      cleanups.push(() => {
        cancelAnimationFrame(raf);
        orbGeo.dispose();
        haloGeo.dispose();
        starGeo.dispose();
        orbMat.dispose();
        haloMat.dispose();
        starMat.dispose();
        renderer.dispose();
      });
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <canvas id="bg3d" aria-hidden="true" />
      <div className="bg-fallback" aria-hidden="true" />
    </>
  );
}
