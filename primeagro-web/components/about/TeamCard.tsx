interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  photo?: { asset: { url: string }; alt?: string };
}

export default function TeamCard({ name, role, bio, photo }: TeamCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm text-center overflow-hidden border border-border-light hover:shadow-lg transition-shadow">
      {/* Header with gradient or real photo */}
      {photo?.asset?.url ? (
        <div className="h-48 overflow-hidden">
          <img src={photo.asset.url} alt={photo.alt || name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-24 bg-gradient-to-br from-primary/10 to-accent/10" />
      )}

      <div className="relative">
        {photo?.asset?.url ? (
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto -mt-10 border-4 border-white shadow-md">
            <img src={photo.asset.url} alt={photo.alt || name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-white mx-auto -mt-10 flex items-center justify-center text-primary font-serif font-bold text-2xl shadow-md">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <div className="p-6 pt-4">
        <h3 className="font-serif font-bold text-primary-dark text-lg">{name}</h3>
        <p className="text-accent text-xs font-semibold mt-1 mb-3 uppercase tracking-wider">{role}</p>
        <p className="text-text-light text-sm leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
