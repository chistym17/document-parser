import axios from 'axios';

export const handleFileProcessing = async (
  actionId: string, 
  uploadedFile: File | null,
  setExtractedContent: (content: string | null) => void
) => {
  if (actionId === 'extract-text') {
    try {
      const formData = new FormData();
      if (!uploadedFile) return;
      
      formData.append('file', uploadedFile);
      
      const response = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.status === 'success') {
        setExtractedContent(response.data.text);
      }
    } catch (error: any) {
      console.error('Error during extraction:', error);
      alert(error.response?.data?.detail || 'Error processing file');
    }
  } else if (actionId === 'summarize') {
    try {
      const formData = new FormData();
      if (!uploadedFile) return;
      formData.append('file', uploadedFile);
      
      const extractionResponse = await axios.post('http://localhost:8000/api/extraction/upload-and-extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (extractionResponse.data && extractionResponse.data.status === 'success') {
        const summaryResponse = await axios.post('http://localhost:8000/api/summarize/summarize-text', {
          text: extractionResponse.data.text
        });

        if (summaryResponse.data && summaryResponse.data.status === 'success') {
          setExtractedContent(summaryResponse.data.summary);
        }
      }
    } catch (error: any) {
      console.error('Error during summarization:', error);
      alert(error.response?.data?.detail || 'Error processing file');
    }
  }
}; 