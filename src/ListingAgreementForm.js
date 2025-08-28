import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Paper,
  Collapse,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

// Guidance + Example split
const fieldGuidance = {
  Owner: "Insert OWNER NAME in uppercase followed by a comma",
  OwnerDesignation: "Insert owner designation (e.g., husband and wife, corporation, trust)",
  OwnerStreet: "Insert Owner street address",
  OwnerCityStateZip: "Insert Owner City, State and Zip",
  OwnerPhone: "Insert Owner phone number",
  OwnerEmail: "Insert Owner email",
  SignerName: "Insert name of authorized signer",
  SignerTitle: "Insert title of authorized signer",
  ListingStartDate: "Insert listing commencement date",
  ListingEndDate: "Insert listing expiration date",
  County: "Insert county (do not include the word 'County')",
  State: "Insert state",
  APNs: "Insert APN numbers",
  Acreage: "Insert acreage (do not include 'acres')",
  PriceTerms: "Insert list price omitting $ sign and any special terms",
  CommissionTerms: "Insert commission and any special provisions"
};

const fieldExamples = {
  Owner: "Examples: JOHN DOE AND JANE DOE,",
  OwnerDesignation: "Examples: husband and wife; ABC CORPORATION, INC., an Arizona corporation; ABC, LLC, an Arizona limited liability company; ABC TRUST dated January 1, 2000",
  OwnerStreet: "Example: 123 Main Street",
  OwnerCityStateZip: "Example: Yuma, AZ 85364",
  OwnerPhone: "Example: (555) 123-4567",
  OwnerEmail: "Example: example@email.com",
  SignerName: "Example: John Doe",
  SignerTitle: "Example: President",
  ListingStartDate: "Example: January 1, 2025",
  ListingEndDate: "Example: June 30, 2025",
  County: "Example: Yuma",
  State: "Example: Arizona",
  APNs: "Example: 123-456-789",
  Acreage: "Example: 40",
  PriceTerms: "Examples: 3.50 per square foot; 1,000 per acre; 350,000.00",
  CommissionTerms: "Examples: Six percent (6%) of total sales price; five percent (5%) of the total sales price if there is no co-broker involved in the sale transaction; Six percent (6%) of the total sales price if there is a co-broker involved in the sale transaction. As used herein the term “co-broker” shall mean any licensed salesperson or broker not otherwise employed by or affiliated with A. T. Pancrazi Real Estate Services, Inc."
};

export default function ListingAgreementForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const initial = {};
    Object.keys(fieldLabels).forEach(key => (initial[key] = ''));
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [openExamples, setOpenExamples] = useState({});

  // warm up backend
  useEffect(() => {
    fetch("https://real-contract-backend.onrender.com/health")
      .then(() => console.log("Backend warmed up"))
      .catch(() => console.log("Backend warming up..."));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleExample = (key) => {
    setOpenExamples(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      sx={{ backgroundColor: '#f9fafc', p: 3 }}
    >
    <div style={{ padding: 20 }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')} 
        style={{
          marginBottom: 20,
          padding: "8px 16px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          background: "#f8f9fa",
          cursor: "pointer"
        }}
      >
        ⬅ Back
      </button>
    </div>
      <Card sx={{ maxWidth: 900, width: '100%', boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Listing Agreement Generator
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {Object.entries(fieldLabels).map(([key, label]) => (
                <Grid item xs={12} key={key}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "#fafafa"
                    }}
                  >
                    <TextField
                      label={label}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {fieldGuidance[key]}
                    </Typography>
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      sx={{ mt: 1, display: "inline-block" }}
                      onClick={() => toggleExample(key)}
                    >
                      {openExamples[key] ? "Hide Example" : "View Example"}
                    </Link>
                    <Collapse in={openExamples[key]}>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: "text.secondary",
                          fontStyle: "italic",
                          whiteSpace: "pre-wrap"
                        }}
                      >
                        {fieldExamples[key]}
                      </Typography>
                    </Collapse>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ position: 'relative', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
              >
                {loading ? 'Generating...' : 'Generate Document'}
              </Button>
              {loading && (
                <CircularProgress
                  size={28}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-14px',
                    marginLeft: '-14px',
                  }}
                />
              )}
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
