import React, { useState } from 'react';

const fieldLabels = {
  Owner: "Owner",
  OwnerDesignation: "Owner Designation",
  OwnerStreet: "Owner Street Address",
  OwnerCityStateZip: "Owner City, State and Zip",
  OwnerPhone: "Owner Phone",
  OwnerEmail: "Owner Email",
  SignerName: "Signer Name",
  SignerTitle: "Signer Title",
  ListingStartDate: "Listing Commencement Date",
  ListingEndDate: "Listing Expiration Date",
  County: "County",
  State: "State",
  APNs: "APNs",
  Acreage: "Acreage",
  PriceTerms: "Price and Special Terms",
  CommissionTerms: "Commission Terms"
};

const fieldExamples = {
  Owner: `{INSERT OWNER NAME in upper case
followed by a comma and designation in lower
case}
Examples: JOHN DOE AND JANE DOE,`,
  OwnerDesignation: `{insert Owner Designation}
Examples: husband and wife; ABC CORPORATION, INC.,
an Arizona corporation; ABC, LLC, an Arizona
limited liability company, ABC TRUST dated
January 1, 2000`,
  OwnerStreet: "{insert Owner street address}",
  OwnerCityStateZip: "{insert Owner City, State and Zip}",
  OwnerPhone: "{insert Owner phone number}",
  OwnerEmail: "{insert Owner email}",
  SignerName: "{insert name of authorized signer}",
  SignerTitle: "{insert title of authorized signer}",
  ListingStartDate: `{insert listing commencement date}
Example: January 1, 2020`,
  ListingEndDate: "{insert listing expiration date}",
  County: `{insert County in which the Property is located}
Note: Do not include the word “County”.`,
  State: "{insert State in which the Property is located}",
  APNs: "{insert APN’s}",
  Acreage: `{insert acreage}
Note: Do not include the word “acres”`,
  PriceTerms: `{Insert list price omitting $ sign and any special
terms}
Example: 3.50 per square foot; 1,000 per acre;
350,000.00`,
  CommissionTerms: `{insert commission and any special provisions}
Example: Six percent (6%) of total sales price,
or
(i) five percent (5%) of the total sales price if
there is no co-broker involved in the sale
transaction, or (ii) Six percent (6%) of the total
sales price if there is a co-broker involved in the
sale transaction. As used herein the term “co-
broker” shall mean any licensed salesperson or
broker not otherwise employed by or affiliated
with A. T. Pancrazi Real Estate Services, Inc.`
};

export default function ListingAgreementForm() {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    Object.keys(fieldLabels).forEach(key => (initial[key] = ''));
    return initial;
  });

  const [loading, setLoading] = useState(false); // NEW

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show loading

    try {
      const response = await fetch('https://real-contract-backend.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate document");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'ListingAgreement.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false); // hide loading
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Listing Agreement Generator</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(fieldLabels).map(([key, label]) => (
          <div key={key} style={{ display: 'flex', marginBottom: 15, alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 220px' }}>
              <label htmlFor={key} style={{ fontWeight: 'bold', display: 'block', marginBottom: 6 }}>
                {label}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={{ width: '100%', padding: 8 }}
                required
              />
            </div>
            <div
              style={{
                marginLeft: 15,
                fontSize: '0.9rem',
                color: '#444',
                whiteSpace: 'pre-wrap',
                maxWidth: 450,
                lineHeight: 1.4,
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f0f4f8',
                padding: 12,
                borderRadius: 6,
                border: '1px solid #ddd',
              }}
            >
              {fieldExamples[key]}
            </div>
          </div>
        ))}
        <button 
          type="submit" 
          style={{ marginTop: 20, padding: "10px 20px" }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Document"}
        </button>
      </form>

      {/* Full screen overlay with spinner */}
      {loading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            textAlign: "center"
          }}>
            <div style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
              margin: "0 auto 15px"
            }}></div>
            <p>Generating your document...</p>
          </div>
        </div>
      )}
    </div>
  );
}
