import React from 'react';

const GameListColumn = ({ title, games }) => (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        </div>
        <ul className="divide-y divide-gray-50">
            {games.map((game, idx) => (
                <li key={idx} className="px-6 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default">
                    <a href="#" className="block w-full">{game}</a>
                </li>
            ))}
        </ul>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <a href="#" className="text-primary text-sm font-semibold hover:underline">Ver lista completa &rarr;</a>
        </div>
    </div>
);

const ConsoleLists = () => {
    // Data extracted from the screenshots provided by the user
    const ps4Games = [
        "Dark Souls Remaster",
        "Dark Souls 2",
        "Dark Souls 3",
        "Elden Ring",
        "Need for Speed MW",
        "Red Dead Redemption 2",
        "Sekiro Shadows Die Twice",
        "Spiderman Remaster",
        "The Last of Us Part I",
        "Uncharted L.T. Collection",
        "God of War"
    ];

    const ps5Games = [
        "Assassin's Creed Mirage",
        "Dynasty Warriors Origins",
        "God of War Ragnarok - Parte 1 / Parte 2",
        "Silent Hill 2",
        "The Witcher 3 Complete Edition"
    ];

    const xboxGames = [
        "Call of Duty Black Ops 3",
        "Correção Black Ops 3",
        "Crysis 3 Remastered",
        "Cyberpunk 2077 - Parte 1 / Parte 2",
        "Dragon Ball Sparking Zero",
        "Forza Horizon 5 - Parte 1 / Parte 2",
        "Correção Forza Horizon 5",
        "GTA V"
    ];

    return (
        <section className="py-20 bg-white border-t border-gray-100" id="gamelists">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Jogos em Destaque</h2>
                    <p className="text-gray-600">
                        Confira alguns dos principais títulos disponíveis em nossos packs para consoles e PC.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GameListColumn title="PS4 - Destaques" games={ps4Games} />
                    <GameListColumn title="PS5 - Lançamentos" games={ps5Games} />
                    <GameListColumn title="Xbox One / PC" games={xboxGames} />
                </div>
            </div>
        </section>
    );
};

export default ConsoleLists;
