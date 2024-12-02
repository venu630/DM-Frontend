import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate(); 

  const handleExploreClick = () => {
    navigate("/dashboard");
  };
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          textAlign: "center",
          backgroundImage: 'url("../public/hero_image.jpg")', 
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "80px 20px",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "50px", margin: "0", fontWeight: "bold" }}>
          Job Market Trend Analysis
        </h1>
        <p style={{ fontSize: "20px", marginTop: "10px" }}>
          Discover the emerging trends in the job market, salary forecasting,
          and career opportunities.
        </p>
        <Button
          onClick={handleExploreClick}
          label="Start Exploring"
          icon="pi pi-search"
          style={{
            marginTop: "20px",
            backgroundColor: "#6366f1",
            borderColor: "#6366f1",
            fontSize: "16px",
            padding: "10px 20px",
          }}
        />
      </header>

      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "30px" }}>What We Do</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1 1 300px",
              margin: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p
              style={{
                fontStyle: "italic",
                marginTop: "15px",
                fontSize: "16px",
              }}
            >
              "Gain deep insights into job roles and qualifications for a
              smarter career path."
            </p>
          </div>
          <div
            style={{
              flex: "1 1 300px",
              margin: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p
              style={{
                fontStyle: "italic",
                marginTop: "15px",
                fontSize: "16px",
              }}
            >
              "Understand salary trends and make informed decisions for a better
              future."
            </p>
          </div>
          <div
            style={{
              flex: "1 1 300px",
              margin: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p
              style={{
                fontStyle: "italic",
                marginTop: "15px",
                fontSize: "16px",
              }}
            >
              "Unlock hidden opportunities with data-driven analysis of the job
              market."
            </p>
          </div>
        </div>
      </section>

      <div className="pt-8 surface-0 text-center">
        <div className="mb-3 font-bold text-3xl">
          <span className="text-900">One Product, </span>
          <span className="text-blue-600">Many Solutions</span>
        </div>
        <div className="text-700 mb-6">
          Discover the emerging trends in the job market, salary forecasting,
          and career opportunities.
        </div>
        <div className="grid">
          <div className="col-12 md:col-4 mb-4 px-5">
            <span
              className="p-3 shadow-2 mb-3 inline-block"
              style={{ borderRadius: "10px" }}
            >
              <i className="pi pi-desktop text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">
              Built for All
            </div>
            <span className="text-700 line-height-3">
              powerful Algorithms to analyse the job market trends.
            </span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span
              className="p-3 shadow-2 mb-3 inline-block"
              style={{ borderRadius: "10px" }}
            >
              <i className="pi pi-lock text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">
              End-to-End Encryption
            </div>
            <span className="text-700 line-height-3">
              Your data is fully encrypted from start to finish, ensuring
              complete privacy.
            </span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span
              className="p-3 shadow-2 mb-3 inline-block"
              style={{ borderRadius: "10px" }}
            >
              <i className="pi pi-check-circle text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Easy to Use</div>
            <span className="text-700 line-height-3">
              A user-friendly interface that makes job market analysis simple
              and accessible.
            </span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span
              className="p-3 shadow-2 mb-3 inline-block"
              style={{ borderRadius: "10px" }}
            >
              <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">
              Fast & Global Support
            </div>
            <span className="text-700 line-height-3">
              Responsive support available globally to assist you anytime.
            </span>
          </div>
          <div className="col-12 md:col-4 mb-4 px-5">
            <span
              className="p-3 shadow-2 mb-3 inline-block"
              style={{ borderRadius: "10px" }}
            >
              <i className="pi pi-github text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Open Source</div>
            <span className="text-700 line-height-3">
              Fully open-source, allowing for customization and community
              contributions.{" "}
            </span>
          </div>
          <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
            <span
              className="p-3 shadow-2 mb-3 inline-block"
              style={{ borderRadius: "10px" }}
            >
              <i className="pi pi-shield text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">
              Trusted Securitty
            </div>
            <span className="text-700 line-height-3">
              Robust security measures to protect your data and maintain
              confidentiality.
            </span>
          </div>
        </div>
      </div>
      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px 0",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <p>&copy; 2024 Job Market Trend Analysis | Developed by Team-8 </p>
        <p>
          <a
            href="https://www.linkedin.com"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            LinkedIn
          </a>{" "}
          |
          <a
            href="https://github.com"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            {" "}
            GitHub
          </a>{" "}
          |
          <a
            href="mailto:info@jobtrends.com"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            {" "}
            Contact Us
          </a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
