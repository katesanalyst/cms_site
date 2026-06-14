interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionTitle({ tag, title, subtitle, light = false }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className={`text-xs tracking-[3px] uppercase font-semibold ${light ? "text-accent" : "text-accent"}`}>
          {tag}
        </span>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold mt-2 leading-tight ${
          light ? "text-white" : "text-primary-dark"
        }`}
      >
        {title}
      </h2>
      <div className="w-16 h-[3px] bg-accent mx-auto mt-4 mb-4 rounded-full" />
      {subtitle && (
        <p className={`max-w-2xl mx-auto leading-relaxed ${light ? "text-white/80" : "text-text-light"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
