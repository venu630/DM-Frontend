import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const attributes = [
  { label: "Salary (USD)", value: "salary_in_usd" },
];

const OutlierDetection = () => {
  const [formData, setFormData] = useState({
    attribute: "",
  });
  const [loading, setLoading] = useState(false);
  const [outliersData, setOutliersData] = useState(null);
  const [plotImage, setPlotImage] = useState(null);
  const toast = useRef(null);

  // Handle dropdown changes
  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Fetch outlier data from the API
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/outliers?attribute=${formData.attribute}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      setOutliersData(data); // Set the response data
      setPlotImage(data.image); // Set the base64 image

    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    }
    setLoading(false);
  };

  // Combine job titles and salaries into an array of objects for DataTable
  const getOutlierData = () => {
    if (outliersData) {
      return outliersData.outlier_job_titles.map((jobTitle, index) => ({
        job_title: jobTitle,
        salary_in_usd: outliersData.outlier_salaries[index],
      }));
    }
    return [];
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-5">
      <Toast ref={toast} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card
          title="Outlier Detection"
          className="p-shadow-4"
          style={{ width: "50%", maxWidth: "1200px" }}
        >
          <div className="p-grid">
            <div className="p-col-12 p-md-6" style={{ padding: "1em" }}>
              <Panel header="Select Attribute for Outlier Detection" className="p-p-3" style={{ height: "100%" }}>
                <div className="p-fluid">
                  <div className="p-field" style={{ marginTop: '10px', marginBottom: "30px" }}>
                    <span className="p-float-label">
                      <Dropdown
                        value={formData.attribute}
                        options={attributes}
                        onChange={(e) => handleDropdownChange("attribute", e.value)}
                        filterPlaceholder="Search attribute"
                      />
                      <label htmlFor="attribute">Attribute</label>
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
              <Panel header="Outlier Detection Results" className="p-p-3" style={{ height: "100%" }}>
                {outliersData ? (
                  <div>
                    <p><strong>Outliers Count:</strong> {outliersData.outliers.length}</p>

                    {/* Displaying Outliers in Table */}
                    <DataTable value={getOutlierData()} paginator rows={5} className="p-datatable-sm">
                      <Column field="job_title" header="Job Title" />
                      <Column field="salary_in_usd" header="Salary (USD)" />
                    </DataTable>

                    {/* Display Outlier Plot */}
                    <div className="p-d-flex p-jc-center">
                      <img
                        src={`data:image/png;base64,${plotImage}`}
                        alt="Outlier Box Plot"
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="p-text-center">Submit the form to view outlier results.</p>
                )}
              </Panel>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OutlierDetection;
