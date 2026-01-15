import React, { useEffect } from 'react';
import ConsoleLists from '../ConsoleLists';
import SEO from '../utils/SEO';

const ProductsPage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 pb-20">
            <SEO
                title="Catálogo de Jogos - PS5, PS4, Retrô e Mais"
                description="Navegue por nossa biblioteca completa de jogos. PlayStation, Xbox, Nintendo e milhares de clássicos retrô prontos para jogar."
                keywords="lista de jogos, catalogo games, roms ps5, jogos ps4, download jogos retrô"
                url="/jogos"
            />
            <ConsoleLists showViewAllLink={false} />
        </div>
    );
};

export default ProductsPage;
