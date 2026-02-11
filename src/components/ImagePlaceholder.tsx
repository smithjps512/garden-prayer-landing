interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: string;
  gradient?: string;
}

export default function ImagePlaceholder({
  label,
  aspectRatio = "aspect-video",
  gradient = "from-midnight-50 to-midnight",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-white/[0.06]`}
    >
      {/* IMAGE PLACEHOLDER: {label} */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-cream/20">
        <svg
          className="w-12 h-12 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-xs font-body text-center px-4">{label}</p>
      </div>
    </div>
  );
}
