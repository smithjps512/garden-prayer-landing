"use client";

interface YouTubeEmbedProps {
  videoId?: string;
  title?: string;
  placeholder?: string;
}

export default function YouTubeEmbed({
  videoId,
  title = "Video",
  placeholder = "Replace with video URL",
}: YouTubeEmbedProps) {
  if (!videoId) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-midnight-50 to-midnight border border-white/[0.06]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-cream/30">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {/* VIDEO PLACEHOLDER: {placeholder} */}
          <p className="text-sm font-body">{placeholder}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
