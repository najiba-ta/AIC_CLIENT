import {
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  HandHeart,
} from "lucide-react";

export default function ProgramsSection() {
  const programs = [
    {
      title: "Daily Prayers",
      description:
        "Join our congregation for the five daily prayers held in a peaceful, welcoming environment with facilities for brothers and sisters.",
      icon: Clock,
    },
    {
      title: "Jumu'ah Prayer",
      description:
        "Weekly Friday congregational prayer featuring inspiring khutbahs in English and Arabic, bringing our community together in worship.",
      icon: Users,
    },
    {
      title: "Qur'an & Hifz Classes",
      description:
        "Structured tajweed, recitation, and memorization programs tailored for children, youth, and adults under qualified guidance.",
      icon: BookOpen,
    },
    {
      title: "Islamic Studies",
      description:
        "Comprehensive educational courses covering foundational Islamic knowledge, seerah, fiqh, and contemporary Muslim living.",
      icon: GraduationCap,
    },
    {
      title: "Family & Community Programs",
      description:
        "Engaging family nights, youth activities, sister circles, and social gatherings aimed at strengthening community bonds.",
      icon: HeartHandshake,
    },
    {
      title: "Charitable & Community Support",
      description:
        "Local outreach, food drives, zakat distribution, and compassionate assistance programs to support families in need.",
      icon: HandHeart,
    },
  ];

  return (
    <section className="relative w-full bg-[#FAF8F2] text-[#252525] py-14 sm:py-20 lg:py-28 px-3.5 sm:px-6 lg:px-8 border-t border-[#E5DFD3] overflow-hidden">
      {/* Background Ambient Accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] sm:w-[900px] h-[350px] sm:h-[450px] rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(241, 237, 227, 0.8) 0%, rgba(184, 149, 80, 0.1) 45%, transparent 70%)",
          }}
        />

        {/* Delicate Top Gold Line Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/85 text-xs sm:text-sm font-semibold text-[#B89550] shadow-xs mb-3 sm:mb-4 relative overflow-hidden">
            <div className="glass-specular-top" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89550]" />
            <span>Community & Worship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252525] leading-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              Programs & Services
            </span>
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-[#595959] leading-relaxed sm:leading-loose">
            Discover the spiritual, educational, and communal initiatives offered at Al Hidayah Islamic Center to serve individuals and families of all ages.
          </p>
        </div>

        {/* Programs Grid in Frosted Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.title}
                className="group relative flex flex-col justify-between h-full p-6 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md border border-white/85 hover:border-[#B89550]/60 shadow-md shadow-stone-200/40 hover:shadow-xl hover:shadow-[#B89550]/10 hover:bg-white/95 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
              >
                {/* Specular Light Reflection at the top edge */}
                <div className="glass-specular-top" />
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B89550]/30 to-transparent group-hover:via-[#B89550] transition-all duration-300 rounded-t-2xl sm:rounded-t-3xl" />

                {/* Top Content Area */}
                <div className="flex-1 flex flex-col">
                  {/* Icon Badge */}
                  <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/75 backdrop-blur-md border border-white/85 flex items-center justify-center text-[#B89550] shadow-xs group-hover:bg-[#B89550] group-hover:text-white group-hover:scale-105 transition-all duration-300 mb-4 sm:mb-5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#252525] group-hover:text-[#B89550] transition-colors duration-200">
                    {program.title}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-[#595959] leading-relaxed font-normal flex-1">
                    {program.description}
                  </p>
                </div>

                {/* Bottom Footer Action with Transition */}
                <div className="mt-5 sm:mt-7 pt-3.5 sm:pt-4 border-t border-white/60 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#B89550] group-hover:text-[#A58342] transition-colors">
                  <span>Learn more</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

