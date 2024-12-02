import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { jobTitles, residencies } from './dropdown_options/DropDownOptions'; 

const experienceLevel = [
  { label: "Entry Level", value: "EN" },
  { label: "Mid Level", value: "MI" },
  { label: "Senior Level", value: "SE" },
];

const experienceLevelMapping = {
  'EN': 'Entry-level / Junior',
  'MI': 'Mid-level / Intermediate',
  'SE': 'Senior-level / Expert',
  'EX': 'Executive-level / Director'
};

// K-Means Custering component
const KMeansClustering = () => {
  const [formData, setFormData] = useState({
    salary_in_usd: "",
    job_title: "",
    company_location: "",
    experience_level: ""
  });
  const [loading, setLoading] = useState(false);
  const [clusterSummary, setClusterSummary] = useState(null);
  const [plotImage, setPlotImage] = useState(null);
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Calling the clustering api route
  const handleSubmit = async () => {
    setLoading(true);
    console.log(formData);
    try {
      const response = await fetch("http://127.0.0.1:5000/clustering_predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      console.log(data);

      setClusterSummary(data.cluster_summary);
      setPlotImage(data.plot_image);

    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-5">
      <Toast ref={toast} />
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card
        title="K-Means Clustering"
        className="p-shadow-4"
        style={{ width: "50%", maxWidth: "1200px" }}
      >
        <div className="p-grid">
          <div className="p-col-12 p-md-6" style={{ padding: "1em" }}>
            <Panel header="Enter Job Details" className="p-p-3" style={{ height: "100%" }}>
              <div className="p-fluid">
                <div className="p-field" style={{ marginTop: '10px', marginBottom: "30px" }}>
                  <span className="p-float-label">
                    <Dropdown
                      value={formData.job_title}
                      options={jobTitles.map((title) => ({ label: title, value: title }))}
                      onChange={(e) => handleDropdownChange("job_title", e.value)}
                      filter
                      filterPlaceholder="Search job titles"
                    />
                    <label htmlFor="job_title">Job Title</label>
                  </span>
                </div>
                <div className="p-field" style={{ marginBottom: "30px" }}>
                  <span className="p-float-label">
                    <Dropdown
                      value={formData.experience_level}
                      options={experienceLevel}
                      onChange={(e) => handleDropdownChange("experience_level", e.value)}
                    />
                    <label htmlFor="experience_level">Experience Level</label>
                  </span>
                </div>
                <div className="p-field" style={{ marginBottom: "30px" }}>
                  <span className="p-float-label">
                    <InputText
                      id="salary_in_usd"
                      name="salary_in_usd"
                      value={formData.salary_in_usd}
                      onChange={handleChange}
                      type="number"
                    />
                    <label htmlFor="salary_in_usd">Salary (USD)</label>
                  </span>
                </div>
                <div className="p-field" style={{ marginBottom: "30px" }}>
                  <span className="p-float-label">
                    <Dropdown
                      value={formData.company_location}
                      options={residencies.map((country) => ({ label: country, value: country }))}
                      onChange={(e) => handleDropdownChange("company_location", e.value)}
                      filter
                      filterPlaceholder="Search country"
                    />
                    <label htmlFor="company_location">Company Location (Country)</label>
                  </span>
                </div>
              </div>
              <div className="p-d-flex p-jc-end p-mt-4">
                <Button
                  label="Submit"
                  icon="pi pi-check"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="p-button-primary"
                />
                {loading && <ProgressSpinner style={{ marginLeft: "1em" }} />}
              </div>
            </Panel>
          </div>

          <div className="p-col-12 p-md-6" style={{ padding: "1em" }}>
            <Panel header="Prediction Result" className="p-p-3" style={{ height: "100%" }}>
              {clusterSummary ? (
                <div>
                  <p><strong>Cluster:</strong> {clusterSummary.cluster}</p>
                  <p><strong>Average Experience Level:</strong> {experienceLevelMapping[clusterSummary.avg_experience]}</p>
                  <p><strong>Average Job Title:</strong> {clusterSummary.avg_job_title}</p>
                  <p><strong>Average Salary:</strong> ${clusterSummary.avg_salary.toFixed(2)}</p>
                  <p><strong>Average Location:</strong> {clusterSummary.avg_location}</p>
                </div>
              ) : (
                <p className="p-text-center">Submit the form to view prediction results.</p>
              )}
              {plotImage && (
                <div className="p-d-flex p-jc-center">
                  <img
                    src={`data:image/png;base64,${plotImage}`}
                    alt="Clustering Plot"
                    style={{ maxWidth: '100%', maxHeight: '400px' }}
                  />
                </div>
              )}
            </Panel>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};

export default KMeansClustering;
