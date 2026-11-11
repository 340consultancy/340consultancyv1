import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { blogPage, blogSection, img, type BlogArticle } from '@/content';
import './ArticleCard.css';

/** Compact, readable article preview shared by BLOG and UP2DATE. */
export default function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link to={`/blog/${article.id}`} className="article-card">
      <div className="article-card-image">
        <img src={img(article.image)} alt="" loading="lazy" />
        <span>{article.date === 'Coming soon' ? blogSection.comingSoonLabel : article.date}</span>
      </div>
      <div className="article-card-copy">
        {article.publishedDate && <p className="article-card-date">{article.publishedDate}</p>}
        <h3>{article.title}</h3>
        <p className="article-card-excerpt">{article.excerpt}</p>
        <span className="article-card-read">{blogPage.listing.readLabel} <ArrowUpRight size={14} aria-hidden /></span>
      </div>
    </Link>
  );
}
