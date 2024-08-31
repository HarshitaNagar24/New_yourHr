import React, { useEffect, useState } from "react";
import axios from "axios";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    // Fetch the user's current resume URL on component mount
    const fetchUserResume = async () => {
        try {
            const response = await axios.get('/user/current-resume', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setResumeUrl(response.data.resumeUrl);
        } catch (error) {
            console.error('Error fetching current resume:', error);
        }
    };
    
    fetchUserResume();
}, []);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post('/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      // Update the resume URL to show the uploaded resume
      setResumeUrl(response.data.resumeUrl);

      console.log("File uploaded successfully:", response.data);
      alert("Resume uploaded successfully.");
      
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
      alert("Error uploading resume. Please try again.");
    }
  }
  return (
    <div className="w-max h-max border-2 flex flex-col self-center justify-self-center m-4 p-3">
      <h1 className="text-2xl font-bold">Upload Resume</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-[300px] h-[40px] bg-blue-600 text-white font-bold rounded py-2 px-4"
          >
            Upload
          </button>
        </div>
      </form>
      {resumeUrl && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Your Resume</h2>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Resume</a>
                </div>
            )}
    </div>
  );
}

export default UploadResume;
