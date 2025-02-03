import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Section from "../components/Section";
import { Link, useNavigate } from 'react-router-dom';

const CompanySetupPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [scrapingProgress, setScrapingProgress] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [showScrapingUI, setShowScrapingUI] = useState(false);

  const navigate = useNavigate();
  // Fetch meta description when website URL changes
  useEffect(() => {
    const fetchMetaDescription = async () => {
      if (!websiteUrl) {
        setCompanyDescription("");
        return;
      }

      setIsFetchingMeta(true);

      try {
        const response = await fetch(websiteUrl);
        const htmlText = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const metaTag = doc.querySelector('meta[name="description"]');

        setCompanyDescription(metaTag ? metaTag.content : "No meta description found.");
      } catch (error) {
        setCompanyDescription("Failed to fetch meta description. Check URL & CORS policy.");
      } finally {
        setIsFetchingMeta(false);
      }
    };

    fetchMetaDescription();
  }, [websiteUrl]);

  // Generate dynamic URLs based on input
  const getGeneratedUrls = () => {
    const baseUrl = websiteUrl.trim() ? websiteUrl.trim().replace(/\/$/, "") : "https://example.com";
    return [
      { url: `${baseUrl}/page1`, status: "detected", dataChunks: [] },
      { url: `${baseUrl}/page2`, status: "detected", dataChunks: [] },
      { url: `${baseUrl}/page3`, status: "detected", dataChunks: [] },
    ];
  };

  const handleScrapeWebsite = () => {
    setShowScrapingUI(true);
    const pages = getGeneratedUrls();

    // Set initial progress
    setScrapingProgress(pages);
    scrapeNextPage(pages, 0);
  };

  // Sequentially update page statuses
  const scrapeNextPage = (pages, index) => {
    if (index >= pages.length) return;

    setTimeout(() => {
      setScrapingProgress((prev) =>
        prev.map((page, i) =>
          i === index
            ? { ...page, status: "pending" }
            : page
        )
      );

      setTimeout(() => {
        setScrapingProgress((prev) =>
          prev.map((page, i) =>
            i === index
              ? { ...page, status: "scraped", dataChunks: [`Data chunk from ${page.url}`] }
              : page
          )
        );

        scrapeNextPage(pages, index + 1);
      }, 2000);
    }, 1500);
  };

  return (
    <Section className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">Company Setup</h1>

        {/* Company Details */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Company Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
            />
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Website URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-lg"
              />
              {isFetchingMeta && <p className="text-gray-500">Fetching meta description...</p>}
            </div>
            <textarea
              placeholder="Company Description"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
              rows="4"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mb-6">
          <Button onClick={handleScrapeWebsite}>
            Start Scraping
          </Button>
          {showScrapingUI && (
            <Link to="/integration"><Button>
              Next Step
            </Button></Link>
          )}
        </div>

        {/* Scraping Progress - Hidden Until User Clicks Start */}
        {showScrapingUI && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Scraping Progress</h2>
            <div className="space-y-4">
              {scrapingProgress.map((page, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer ${
                    page.status === "scraped" ? "bg-green-900" :
                    page.status === "pending" ? "bg-yellow-900" : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedPage(page.url)}
                >
                  <p className="text-white">{page.url}</p>
                  <p className="text-gray-300">{page.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Chunks */}
        {selectedPage && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Chunks from {selectedPage}</h2>
            <div className="space-y-4">
              {scrapingProgress
                .filter((page) => page.url === selectedPage)
                .map((page, index) => (
                  <div key={index}>
                    {page.dataChunks.length > 0 ? (
                      page.dataChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className="p-4 bg-gray-800 rounded-lg">
                          <p className="text-white">{chunk}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No data chunks scraped yet.</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default CompanySetupPage;
