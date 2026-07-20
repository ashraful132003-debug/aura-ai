import { ImageResponse } from 'next/og';

export const alt = 'Aura AI — Mental Wellness for Everyone';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(150deg, #070B14 0%, #0B1120 100%)',
          color: '#EAF0FB',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: '50%',
            background: 'linear-gradient(115deg, #6EE7D8, #A78BFA)',
            boxShadow: '0 0 80px rgba(110,231,216,0.5)',
            marginBottom: 40,
          }}
        />
        <div style={{ fontSize: 88, fontWeight: 600, letterSpacing: '-0.02em' }}>Aura AI</div>
        <div style={{ fontSize: 34, color: '#93A0B8', marginTop: 16, maxWidth: 820, textAlign: 'center' }}>
          A safe, private space for your thoughts — anytime.
        </div>
      </div>
    ),
    { ...size },
  );
}
