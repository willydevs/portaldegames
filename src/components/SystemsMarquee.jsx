import React from 'react';

const SystemTag = ({ label, color = 'blue' }) => (
    <div className={`px-6 py-3 rounded-lg bg-surface-light border border-gray-100 shadow-sm whitespace-nowrap min-w-[120px] text-center font-bold text-gray-700 hover:scale-105 hover:shadow-md hover:border-${color}-500 transition-all duration-300 cursor-default group`}>
        <span className={`group-hover:text-${color}-600 transition-colors`}>{label}</span>
    </div>
);

const MarqueeRow = ({ items, reverse = false, color }) => (
    <div className="flex overflow-hidden py-4 w-full relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className={`flex gap-6 w-max hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {[...items, ...items, ...items, ...items].map((item, idx) => (
                <SystemTag key={`${item}-${idx}`} label={item} color={color} />
            ))}
        </div>
    </div>
);

const SystemsMarquee = () => {
    const gpboxSystems = ['RetroArch', 'NES', 'SNES', 'Mega Drive', 'PlayStation 1', 'N64', 'Dreamcast', 'MAME', 'NeoGeo', 'PSP', 'GameBoy', 'Atari 2600'];
    const psSystems = ['God of War', 'The Last of Us', 'Spider-Man 2', 'Horizon Forbidden West', 'Gran Turismo 7', 'Ghost of Tsushima', 'Uncharted', 'Ratchet & Clank', 'Demon\'s Souls', 'Bloodborne'];
    const xboxSystems = ['Halo Infinite', 'Forza Horizon 5', 'Gears 5', 'Starfield', 'Sea of Thieves', 'Fable', 'Ori', 'Flight Simulator', 'State of Decay', 'Hellblade'];

    return (
        <section className="py-20 bg-gray-50 overflow-hidden" id="systems">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Universo de Possibilidades</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore nossa vasta biblioteca de sistemas emulados e jogos de última geração.
                </p>
            </div>

            <div className="space-y-4">
                {/* Row 1: GPBOX */}
                <div className="transform -rotate-1">
                    <MarqueeRow items={gpboxSystems} color="blue" />
                </div>

                {/* Row 2: PlayStation */}
                <div className="transform rotate-1">
                    <MarqueeRow items={psSystems} reverse color="indigo" />
                </div>

                {/* Row 3: Xbox */}
                <div className="transform -rotate-1">
                    <MarqueeRow items={xboxSystems} color="green" />
                </div>
            </div>
        </section>
    );
};

export default SystemsMarquee;
