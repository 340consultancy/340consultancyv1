import TopNav from '@/components/TopNav';
import Footer from '@/components/Footer';
import YesCTA from '@/components/YesCTA';
import GreenHeader from '@/components/GreenHeader';
import ArticleCard from '@/components/ArticleCard';
import { blogArticles, blogPage } from '@/content';

export default function Blog() {
  return (
    <div style={{ minHeight: '100vh', background: 'hsl(36 21% 95%)' }}>
      <TopNav />
      <GreenHeader lead={blogPage.listing.headline.lead} accent={blogPage.listing.headline.accent} intro={blogPage.listing.tagline} />
      <section className="container-wide" aria-label="Articles" style={{ paddingBlock: 'clamp(4rem, 9vw, 7rem)' }}>
        <div className="article-grid">
          {blogArticles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>
      <YesCTA />
      <Footer />
    </div>
  );
}
