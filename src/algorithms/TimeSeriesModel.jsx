import React, { useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Panel } from "primereact/panel";
import { Chart } from "primereact/chart";
import { TSjobTitles } from './dropdown_options/DropDownOptions'; // Import job titles and residencies

const startYearOptions = Array.from({ length: 2024 - 2020 + 1 }, (_, index) => {
    const year = 2020 + index;
    return { label: year.toString(), value: year };
});

const endYearOptions = Array.from({ length: 2035 - 2025 + 1 }, (_, index) => {
    const year = 2025 + index;
    return { label: year.toString(), value: year };
});

const lineColors = {
    "Data Scientist": "#42A5F5",
    "Software Engineer": "#66BB6A",
    "Product Manager": "#FFA726",
    "UX Designer": "#AB47BC",
};
// ARIMA Time-Series analysis component
const TimeSeriesModel = () => {
    const [formData, setFormData] = useState({
        start_year: null,
        end_year: null,
        job_title: "",
    });
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({});
    const toast = useRef(null);

    const handleDropdownChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };
 // Calling the time-series api route
    const handleSubmit = async () => {
        setLoading(true);
        const { start_year, end_year, job_title } = formData;

        try {
            if (!start_year || !end_year || !job_title) {
                throw new Error("Please fill out all fields before submitting.");
            }

            if (start_year > end_year) {
                throw new Error("Start year cannot be greater than end year.");
            }

            const response = await fetch("http://127.0.0.1:5000/timeseries_predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ start_year, end_year, job_title }),
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.error || "Error fetching prediction data");
            }

            if (!data || !data.years || !data.average_salaries) {
                throw new Error("Invalid data received from the backend.");
            }

            updateChart(data, job_title);
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: error.message,
            });
        }
        setLoading(false);
    };

    const updateChart = (data, job_title) => {
        const { years, average_salaries } = data;

        const chartData = {
            labels: years,
            datasets: [
                {
                    label: `Average Salaries for ${job_title}`,
                    data: average_salaries,
                    fill: false,
                    borderColor: lineColors[job_title],
                    tension: 0.4,
                },
            ],
        };

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

        const chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        setChartData({ data: chartData, options: chartOptions });
    };

    return (
        <div className="p-d-flex p-jc-center p-ai-center p-mt-5">
            <Toast ref={toast} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Card
                    title="Time Series Model Salary Prediction"
                    className="p-shadow-4"
                    style={{ width: "70%", maxWidth: "1500px" }}
                >
                    <div className="p-grid">
                        <div className="p-col-12 p-md-6" style={{ padding: "1em" }}>
                            <Panel header="Enter Prediction Details" className="p-p-3" style={{ height: "100%" }}>
                                <div className="p-fluid">
                                    <div className="p-field" style={{ marginBottom: "30px" }}>
                                        <span className="p-float-label">
                                            <Dropdown
                                                value={formData.start_year}
                                                options={startYearOptions}
                                                onChange={(e) => handleDropdownChange("start_year", e.value)}
                                            />
                                            <label htmlFor="start_year">Start Year</label>
                                        </span>
                                    </div>
                                    <div className="p-field" style={{ marginBottom: "30px" }}>
                                        <span className="p-float-label">
                                            <Dropdown
                                                value={formData.end_year}
                                                options={endYearOptions}
                                                onChange={(e) => handleDropdownChange("end_year", e.value)}
                                            />
                                            <label htmlFor="end_year">End Year</label>
                                        </span>
                                    </div>
                                    <div className="p-field" style={{ marginBottom: "30px" }}>
                                        <span className="p-float-label">
                                            <Dropdown
                                                value={formData.job_title}
                                                options={TSjobTitles}
                                                onChange={(e) => handleDropdownChange("job_title", e.value)}
                                            />
                                            <label htmlFor="job_title">Job Title</label>
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
                                {chartData.data ? (
                                    <div className="p-d-flex p-flex-column p-ai-center">
                                        <Chart type="line" data={chartData.data} options={chartData.options} style={{ width: "100%", height: "500px" }} />
                                    </div>
                                ) : (
                                    <p className="p-text-center">Submit the form to view prediction results.</p>
                                )}
                            </Panel>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TimeSeriesModel;
