import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

const newsFilters = [
  { label: "Blackpink", query: "Blackpink" },
  { label: "BTS-KPOP", query: "BTS-KPOP" },
  { label: "Java", query: "Java" },
  { label: "TWICE-KPOP", query: "TWICE-KPOP" },
  { label: "Red Velvet", query: "Red-Velvet" },
  { label: "NewJeans", query: "NewJeans" },
  { label: "Vietnam", query: "Vietnam" },
  { label: "India", query: "India" },
  { label: "WorldOfWarcraft", query: "WorldOfWarcraft" },
  { label: "FinalFantasy", query: "FinalFantasy" },
  { label: "Coding", query: "Coding" },
];

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("Blackpink");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=10&apiKey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setArticles(data.articles);
      } catch (error) {
        setError("Error fetching news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;
    setQuery(searchQuery);
  };

  return (
    <Container>
      <div>
        <h1>News</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="search..."
          />
          <button type="submit" className="btn btn-success">
            Search
          </button>
        </form>
        <div className="d-flex flex-wrap justify-content-between">
          {newsFilters.map((filter) => (
            <button
              className="btn btn-info m-"
              key={filter.query}
              onClick={() => setQuery(filter.query)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {articles.map((article, index) => (
          <Row key={index} className="p-2 mb-2 mt-2 border bg-light rounded-3">
            <Col md={4}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="img-fluid"
                />
              )}
            </Col>
            <Col md={8}>
              <h2>{article.title}</h2>
              <small className="mb-4">Publish: {article.publishedAt}</small>
              <p>{article.description}</p>
              <a
                href={article.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default NewsPage;
