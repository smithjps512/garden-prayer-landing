/**
 * A generated header illustration for each topic.
 *
 * The product plan asks for topics "with sources, photos, and videos". These
 * are decorative stand-ins, not photos — swap them for real images when you
 * have them.
 */
export default function TopicIllustration({
  hue,
  className = "",
}: {
  hue: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 800 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={`g${hue}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue},55%,22%)`} />
          <stop offset="100%" stopColor={`hsl(${hue + 30},50%,12%)`} />
        </linearGradient>
      </defs>
      <rect width="800" height="300" fill={`url(#g${hue})`} />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={120 + i * 150}
          cy={150 + (i % 2 === 0 ? -40 : 40)}
          r={40 + i * 12}
          fill="none"
          stroke={`hsl(${hue + i * 12},60%,60%)`}
          strokeOpacity={0.28}
          strokeWidth={2}
        />
      ))}
    </svg>
  );
}
