import { Header } from '@/components/Header';
import { GameCard } from '@/components/GameCard';
import { Layout } from '@/components/Layout';
import { GAMES } from '@/utils/constants';
import { ComingSoonCard } from '@/components/ComingSoonCard';

export const Home = () => {
  return (
    <Layout>
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
        
        <ComingSoonCard index={GAMES.length} />
      </div>
    </Layout>
  );
};