import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./css/blogpost.css";
import NavBar from '../Navbar/NavBar';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Lenis from '@studio-freight/lenis';
import Loading from '../Loading/Loading';

type SectionType = {
  subheading?: string;
  text: string;
};

type BlogPostType = {
  id: number;
  title: string;
  heroImage: string;
  content: SectionType[];
  additionalImages: string[];
  date: string;
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null);


    useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for the scroll
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    fetch('/json/blogs.json')
      .then(response => response.json())
      .then((data: BlogPostType[]) => {
        const post = data.find(p => p.id === parseInt(id || '', 10));
        setBlogPost(post || null);
      });
  }, [id]);

  if (!blogPost) {
    //@ts-expect-error
    return <Loading/>
  }



  const renderContentWithImages = (content: SectionType[], additionalImages: string[]) => {
  return content.map((section, index) => (
    <React.Fragment key={index}>
      {section.subheading && <h2 className="article__subheading">{section.subheading}</h2>}
      <ReactMarkdown
        children={section.text}
        components={{
          //@ts-ignore
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="pre" {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
      {index < additionalImages.length && (
        <img
          src={additionalImages[index]}
          alt=""
          className="blog-additional-image"
        />
      )}
    </React.Fragment>
  ));
};
  return (
    <>
      <NavBar />
      <Menu />
      <div className="blog-post-container">
        <section className="news-1">
          <picture className="news-1__bg">
            <img
              src={blogPost.heroImage}
              alt={blogPost.title}
              className="blog-hero-image"
            />
          </picture>
          <div className="news-1__wrapper">
            <div className="news-1__date">{blogPost.date}</div>
            <div className="news-1__title">{blogPost.title}</div>
          </div>
        </section>
        <article className="blog-post article">
          <h1 className="blog-post-title article__title">{blogPost.title}</h1>
          <div className="blog-post-content article__text">
            {renderContentWithImages(blogPost.content, blogPost.additionalImages)}
          </div>
        </article>
      </div>
      <div className="readMore">
         <Link to={`/blogs`} className="blog-card-link">Read more</Link>
      </div>
      <Footer />
    </>
  );
}
