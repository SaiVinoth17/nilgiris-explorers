import { blogPosts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight, BookMarked } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Nilgiris Travel Blog | Insider Guides & Tips",
  description: "Discover hidden gems, travel tips, and seasonal guides for exploring the Nilgiris, Ooty, and Coonoor.",
};

export default function BlogListingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-forest pt-32 pb-20">
        <div className="container-default">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center">
                <BookMarked className="w-4 h-4 text-white" />
              </div>
              <span className="section-label">Travel Journal</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4">
              The Nilgiris <span className="gradient-text">Chronicles</span>
            </h1>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Insider guides, seasonal advice, and stories from the Blue Mountains.
            </p>
          </div>

          {/* Featured Post (Latest) */}
          {blogPosts.length > 0 && (
            <div className="mb-16">
              <Link href={`/blog/${blogPosts[0].slug}`} className="block group">
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl glass-card">
                  <Image 
                    src={blogPosts[0].coverImage} 
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050A08] via-[#050A08]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blogPosts[0].categories.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-white/70 text-lg mb-6 max-w-3xl line-clamp-2">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(blogPosts[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {blogPosts[0].readingTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of remaining posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group glass-card rounded-2xl overflow-hidden flex flex-col card-hover">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={post.coverImage} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {post.categories.slice(0, 1).map(cat => (
                      <span key={cat} className="px-2.5 py-1 bg-[#050A08]/80 text-white rounded-lg text-xs font-medium backdrop-blur-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-emerald-400 text-sm font-semibold gap-2 mt-auto">
                    Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
