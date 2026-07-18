import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  if (!post) return {};
  
  const url = `https://nilgirisexplorers.com/blog/${post.slug}`;
  
  return {
    title: `${post.title} | Nilgiris Travel Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [post.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    }
  };
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const url = `https://nilgirisexplorers.com/blog/${post.slug}`;

  // Find next/prev posts
  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: `https://nilgirisexplorers.com${post.coverImage}`,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: post.author
            },
            publisher: {
              "@type": "Organization",
              name: "Nilgiris Explorers",
              logo: {
                "@type": "ImageObject",
                url: "https://nilgirisexplorers.com/logo.png"
              }
            }
          }),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-forest pt-32 pb-20">
        
        {/* Article Header */}
        <div className="container-default max-w-4xl mb-12 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {post.categories.map(cat => (
              <span key={cat} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                {cat}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-emerald-400" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-400" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /> {post.readingTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="container-default mb-16">
          <div className="relative h-[40vh] md:h-[60vh] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="container-default max-w-3xl">
          <article className="prose prose-invert prose-lg prose-emerald max-w-none mb-16">
            {/* Convert simple markdown to HTML (In a real app, use react-markdown, here we just dangerously set or split) */}
            <div dangerouslySetInnerHTML={{ __html: 
              post.content
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br/>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/## (.*?)\<br\/\>/g, '<h2>$1</h2>')
                .replace(/# (.*?)\<br\/\>/g, '<h1>$1</h1>')
                .replace(/\- (.*?)\<br\/\>/g, '<li>$1</li>')
            }} />
          </article>

          {/* Tags & Share */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 border-t border-b border-white/10 mb-16">
            <div className="flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4 text-white/40 mr-2" />
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-white/70 rounded-full text-xs hover:text-white transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
            
            <button className="flex items-center gap-2 text-sm text-white/70 hover:text-emerald-400 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Share2 className="w-4 h-4" /> Share Article
            </button>
          </div>

          {/* Next/Prev Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="glass-card p-6 rounded-2xl group flex flex-col items-start text-left border border-white/10 hover:border-emerald-500/50 transition-colors">
                <span className="text-xs text-white/50 uppercase tracking-widest mb-2 font-bold group-hover:text-emerald-400 transition-colors">Previous Article</span>
                <span className="text-white font-medium line-clamp-2">{prevPost.title}</span>
              </Link>
            ) : <div />}
            
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="glass-card p-6 rounded-2xl group flex flex-col items-end text-right border border-white/10 hover:border-emerald-500/50 transition-colors">
                <span className="text-xs text-white/50 uppercase tracking-widest mb-2 font-bold group-hover:text-emerald-400 transition-colors">Next Article</span>
                <span className="text-white font-medium line-clamp-2">{nextPost.title}</span>
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
