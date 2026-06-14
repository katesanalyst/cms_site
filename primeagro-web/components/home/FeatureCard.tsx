interface FeatureCardProps {
  icon: string;
  title: string;
  text: string;
  image?: { asset: { url: string }; alt?: string };
  index?: number;
}

export default function FeatureCard({ icon, title, text, image, index }: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image or icon */}
      {image?.asset?.url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={image.asset.url}
            alt={image.alt || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
        </div>
      )}

      <div className="p-8 text-center relative">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-[3rem]" />

        {/* Icon circle (shown even with image) */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 -mt-12 relative z-10 border-4 border-white group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">{icon}</span>
        </div>

        <h3 className="font-serif text-lg font-bold text-primary-dark mb-3 leading-snug">{title}</h3>
        <p className="text-text-light text-sm leading-relaxed">{text}</p>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-[3px] bg-accent rounded-full transition-all duration-300" />
      </div>
    </div>
  );
}
